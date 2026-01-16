import apiClient from "../../utils/axios"
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const navigate = useNavigate()
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)

    try{
      const response = await apiClient({
          method: "POST",
          url: "users/api/token/",
          data: {username, password}
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">

        {/* LOGO */}
        <div className="text-center">
          <img
            src="https://www.svgrepo.com/show/501826/shop.svg"
            alt="SwiftShop"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back to SwiftShop
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5 mt-8">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forget_password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* LOADING */}
          {loading && (
            <p className="text-sm text-gray-500 text-center">
              Logging in...
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-2.5 rounded-xl font-semibold
                       transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>
        </form>

        {/* SIGNUP */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Signup Here
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Login;