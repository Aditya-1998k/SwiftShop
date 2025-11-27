import { useNavigate } from "react-router-dom";
import AddToCartButton from "../products/AddToCartButton";

function Dashboard({ user }) {
  const navigate = useNavigate();


  const deals = [
    {
      name: "Smartphones",
      price: "From ₹6,999",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&w=600",
    },
    {
      name: "Headphones",
      price: "From ₹499",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&w=600",
    },
    {
      name: "Sports Shoes",
      price: "From ₹799",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Watches",
      price: "From ₹299",
      img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&w=600",
    },
    {
      name: "Fashion Deals",
      price: "Min 50% Off",
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&w=600",
    },
  ];

  const categories = [
    { name: "Mobiles", img: "https://img.icons8.com/color/96/smartphone.png" },
    { name: "Fashion", img: "https://img.icons8.com/color/96/t-shirt.png" },
    { name: "Electronics", img: "https://img.icons8.com/color/96/laptop.png" },
    { name: "Grocery", img: "https://img.icons8.com/color/96/grocery-bag.png" },
    { name: "Home", img: "https://img.icons8.com/color/96/home.png" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const recommended = [
    {
      name: "Basmati Rice",
      price: "₹399",
      img: "https://plus.unsplash.com/premium_photo-1723726831918-9a8542e705cb?q=80&w=1578&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Organic Lentils",
      price: "₹199",
      img: "https://plus.unsplash.com/premium_photo-1699453179951-4f51c39644ac?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Cooking Oil",
      price: "₹199",
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
            <div
              key={i}
              className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-28 w-full object-contain mb-2 rounded"
              />
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-indigo-600 font-bold text-sm">{item.price}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className="text-xl font-semibold mt-10">Shop by Category</h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mt-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
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
              <img
                src={item.img}
                className="h-32 object-contain w-full rounded"
                alt={item.name}
              />

              <h3 className="text-sm font-semibold mt-2">{item.name}</h3>
              <p className="text-green-600 font-bold">{item.price}</p>

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
