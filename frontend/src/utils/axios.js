import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================================================
   REQUEST INTERCEPTOR → Attach Access Token
====================================================== */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================================
   RESPONSE INTERCEPTOR → Handle Token Expiry
====================================================== */

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If not 401 → Forward error
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      // No refresh token → Logout user
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // ==============================
    // If refresh is already happening
    // Queue other failed requests
    // ==============================
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    // ==============================
    // Hit refresh endpoint
    // ==============================
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/api/token/refresh/",
        { refresh }
      );

      const newToken = response.data.access;

      // Save new token
      localStorage.setItem("token", newToken);

      apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;

      processQueue(null, newToken);

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      processQueue(err, null);

      // Refresh token expired → Logout user
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");

      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
