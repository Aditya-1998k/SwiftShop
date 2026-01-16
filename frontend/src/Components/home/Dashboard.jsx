import { useNavigate } from "react-router-dom";
import AddToCartButton from "../products/AddToCartButton";
import { deals, categories } from "../../Data/dummy";

function Dashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen pb-16">

      {/* ================= HERO ================= */}
      <div className="relative w-full">
        <img
          src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=3132&auto=format&fit=crop"
          className="w-full h-56 md:h-80 object-cover"
          alt="banner"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold max-w-xl leading-tight">
            Everything you need, delivered fast
          </h1>

          <p className="mt-3 max-w-lg text-gray-200">
            Discover top deals, trending products, and handpicked collections.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 w-fit bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= GREETING ================= */}
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">
          {user
            ? `Recommended for you, ${user.first_name}`
            : "Top Deals for You"}
        </h2>

        {/* ================= DEALS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {deals.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer overflow-hidden"
              onClick={() => navigate(`/category/${item.slug}`)}
            >
              <div className="bg-gray-100 p-4 flex justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-32 object-contain group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-indigo-600 font-bold mt-1">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CATEGORIES ================= */}
        <h2 className="text-2xl font-bold mt-16 mb-6 text-gray-900">
          Shop by Category
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="h-20 w-20 bg-white rounded-full shadow-md flex items-center justify-center group-hover:shadow-xl transition">
                <img
                  src={cat.img}
                  className="h-12 w-12 object-contain"
                  alt={cat.name}
                />
              </div>

              <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
