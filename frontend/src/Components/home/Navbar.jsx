import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axios";
import ProfileModal from "../users/ProfileModal";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("users/profile/");
      setUser(res.data);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      await axios.post("users/api/token/refresh/", { refresh });
    } catch {}
    localStorage.clear();
    setShowProfile(false);
    navigate("/");
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText)}`);

    setSearchText("");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* ================= LEFT ================= */}
            <div className="flex items-center gap-4">

              {/* Mobile Menu */}
              <button
                className="sm:hidden text-white hover:text-indigo-400 transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/501826/shop.svg"
                  className="h-8"
                  alt="SwiftShop"
                />
                <span className="text-white font-extrabold text-lg tracking-wide">
                  SwiftShop
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden sm:flex gap-3 ml-6">
                <Link
                  to="/products"
                  className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  Products
                </Link>
              </div>
            </div>

            {/* ================= SEARCH (DESKTOP) ================= */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-xl px-4 py-2 w-full max-w-lg mx-6">
              <FaSearch className="text-gray-300 mr-3" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-transparent text-white placeholder-gray-300 focus:outline-none flex-1"
              />
            </div>

            {/* ================= RIGHT ================= */}
            <div className="hidden sm:flex items-center gap-5">

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <FaShoppingCart size={18} />
                Cart
              </Link>

              {/* Profile / Login */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    fetchUser();
                    setShowProfile(true);
                  }}
                  className="hover:ring-2 hover:ring-indigo-500 rounded-full transition"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=User"
                    alt="profile"
                    className="h-9 w-9 rounded-full border border-white/30"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* ================= MOBILE MENU ================= */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-3 bg-black/90 rounded-xl p-4 space-y-4 shadow-xl">

              {/* Mobile Search */}
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                <FaSearch className="text-gray-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent text-white flex-1 placeholder-gray-300 focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg"
                >
                  Go
                </button>
              </div>

              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-200 hover:text-white"
              >
                Products
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-200 hover:text-white"
              >
                Cart
              </Link>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* PROFILE MODAL */}
      <ProfileModal
        open={showProfile}
        user={user}
        onClose={() => setShowProfile(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Navbar;
