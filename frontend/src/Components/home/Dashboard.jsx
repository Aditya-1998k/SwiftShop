import { useNavigate } from "react-router-dom";
import AddToCartButton from "../products/AddToCartButton";
import {deals, categories, recommended} from "../../Data/dummy"

function Dashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen pb-10">

      {/* Hero Banner */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-48 md:h-72 object-cover object-top rounded-lg"
          alt="banner"
        />
      </div>

      <div className="px-4 md:px-10">

        {/* Greeting */}
        <h2 className="text-xl font-semibold mt-6">
          {user ? `Hi, ${user.first_name}! Recommended for you` : "Top Deals for You"}
        </h2>

        {/* Deals Section */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {deals.map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer">
              <img src={item.img} alt={item.name} className="h-28 w-full object-contain mb-2 rounded"/>
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-indigo-600 font-bold text-sm">{item.price}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className="text-xl font-semibold mt-10">Shop by Category</h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mt-4">
          {categories.map((cat, i) => (
            <div key={i}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            >
              <img src={cat.img} className="h-16 w-16" alt={cat.name} />
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Recommended */}
        <h2 className="text-xl font-semibold mt-10">
          {user ? "Recommended for You" : "Popular Items"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
          {recommended.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
              <img src={item.img} className="h-32 object-contain w-full rounded" alt={item.name}/>
              <h3 className="text-sm font-semibold mt-2">{item.name}</h3>
              <p className="text-green-600 font-bold">₹{item.price}</p>

              {/* FIX: pass item instead of p */}
              <AddToCartButton product={item} />
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}

export default Dashboard;
