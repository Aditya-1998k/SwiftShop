import apiClient from "../../utils/axios"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUserName] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)

    try{
      const response = await apiClient({
          method: "POST",
          url: "users/create_user/",
          data: {email, password, first_name, last_name, username}
      });
      console.log("Registered Successfully.", response.data);
      return navigate("/")
    } catch (err) {
      setError(err.response.data.username || err.response.data.email  || "User Registration Failed.");
    } finally {
      setLoading(false)
    }
  }


return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="text-center">
          <img
            src="https://www.svgrepo.com/show/501826/shop.svg"
            alt="SwiftShop"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Join SwiftShop for seamless shopping
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5 mt-8">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              autoComplete="username"
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* NAME ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-300
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
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
              Registering user...
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
            {loading ? "Please wait..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
