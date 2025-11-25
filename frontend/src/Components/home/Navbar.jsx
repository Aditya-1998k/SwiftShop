import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios" 
import ProfileModal from "../users/ProfileModal";

function Navbar() {
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const isLoggedIn = !!localStorage.getItem("token");
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
    try {
        const res = await axios.get("users/profile/");
        debugger;
        setUser(res.data);
    } catch (err) {
        console.log("Profile fetch error:", err);
    }
    };

    const handleLogOut = async () => {
        try {
            const refresh = localStorage.getItem("refresh");
            await axios.post("users/api/token/refresh/", { refresh });

        } catch (e) {
            console.error("Logout error", e);
        }

        // Remove frontend tokens:
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        setShowProfile(false);
        navigate("/");
    };

    const handleSearch = () => {
        if (!searchText.trim()) return;
        window.location.href = `/search?query=${encodeURIComponent(searchText)}`;
    };


  return (
    <>
      <nav className="relative bg-black/90 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">

            {/* Left Navigation */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                {/* LOGO (Clickable → Home) */}
                <Link to="/" className="flex shrink-0 items-center">
                    <img
                    src="https://www.svgrepo.com/show/501826/shop.svg"
                    alt="SwiftShop"
                    className="h-8 w-auto"
                    />
                    <span className="ml-2 text-white font-semibold text-lg">SwiftShop</span>
                </Link>

                {/* NAV LINKS */}
                <div className="sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition">
                            Products
                        </Link>

                        <Link to="/cart" className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition">
                            Cart
                        </Link>
                    </div>
                </div>
            </div>

                

            {/* Right Side */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-10 sm:pr-0">

              {/* Search Button */}
              <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-3 py-1 mr-4">
                <input type="text" placeholder="Search products..."
                    value={searchText} onChange={(e) => setSearchText(e.target.value)}
                    className="bg-transparent text-white placeholder-gray-300 focus:outline-none w-48 sm:w-64"
                />

                <button onClick={handleSearch} className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition">
                    Search
                </button>
            </div>

              {/* 🔐 IF LOGGED IN → SHOW PROFILE AVATAR */}
                {isLoggedIn ? (
                    <button onClick={() => {fetchUser(); setShowProfile(true)}} className="rounded-full p-2 ml-3 hover:bg-white/20">
                        <img src="https://ui-avatars.com/api/?name=User" alt="profile" className="h-8 w-8 rounded-full border border-white/30"/>
                    </button>
                ) : (
                    /* 🔓 IF NOT LOGGED IN → SHOW LOGIN ICON */
                    <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
                        🔐 Login
                    </Link>
                )}
            </div>
          </div>
        </div>
      </nav>

      <ProfileModal open={showProfile} user={user}
        onClose={() => setShowProfile(false)} onLogout={handleLogOut}
      />
    </>
  );
}

export default Navbar;
