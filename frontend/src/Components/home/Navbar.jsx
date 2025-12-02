import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axios";
import ProfileModal from "../users/ProfileModal";
import { FaShoppingCart } from "react-icons/fa";

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
    } catch (e) {
      console.error("Logout error", e);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setShowProfile(false);
    navigate("/");
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };


  return (
    <>
      <nav className="bg-black/90 border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* ==== LEFT SECTION ==== */}
            <div className="flex items-center gap-4">

              {/* Mobile Menu Button */}
              <button
                className="sm:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://www.svgrepo.com/show/501826/shop.svg"
                  className="h-8 w-auto"
                  alt="SwiftShop"
                />
                <span className="text-white font-bold text-lg">SwiftShop</span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden sm:flex items-center gap-4 ml-4">
                <Link
                  to="/products"
                  className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition"
                >
                  Products
                </Link>
              </div>
            </div>

            {/* ==== SEARCH BAR (Desktop) ==== */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-1 max-w-md w-full mx-6">
              
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}

                className="bg-transparent text-white placeholder-gray-300 focus:outline-none flex-1"
              />

              <button
                onClick={handleSearch}
                className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition"
              >
                Search
              </button>

            </div>

            {/* ==== RIGHT SECTION ==== */}
            <div className="hidden sm:flex items-center gap-5">

              {/* Cart Button */}
              <Link
                to="/cart"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition"
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
                  className="rounded-full p-1 hover:bg-white/20 transition"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=User"
                    alt="profile"
                    className="h-8 w-8 rounded-full border border-white/30"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition"
                >
                  Login
                </Link>
              )}

            </div>
          </div>

          {/* ==== MOBILE MENU ==== */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-2 bg-black/80 p-4 rounded-lg space-y-3">

              {/* Mobile Search */}
              <div className="flex bg-white/10 rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent text-white flex-1 placeholder-gray-300 focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md"
                >
                  Go
                </button>
              </div>

              {/* Mobile Nav Items */}
              <Link to="/products" className="block text-gray-200 hover:text-white py-1">
                Products
              </Link>

              <Link to="/cart" className="block text-gray-200 hover:text-white py-1">
                Cart
              </Link>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
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
