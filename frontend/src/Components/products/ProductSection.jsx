// src/components/ProductSection.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import AddToCartButton from "./AddToCartButton";

function ProductSection() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Dummy category
  const title = "Mobiles & Electronics";
  const category = "mobiles";

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Smartphone A",
      price: "₹6,999",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&w=600&q=80",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "₹499",
      img: "https://plus.unsplash.com/premium_photo-1682096467444-8861e1dc3bc2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      price: "₹69,999",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&w=600&q=80",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: "₹1,299",
      img: "https://plus.unsplash.com/premium_photo-1681147547346-2d73c90988d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: "₹899",
      img: "https://plus.unsplash.com/premium_photo-1682090727960-a2979bde66af?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={() => navigate(`/category/${category}`)}
          className="text-indigo-600 hover:underline text-sm"
        > View All</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.slice(0, 5).map((p) => (
          <div key={p.id}
            className="border rounded-lg p-3 shadow hover:shadow-md cursor-pointer bg-white"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.img} alt={p.name} className="h-32 w-full object-contain mb-2 rounded"/>
            <h3 className="text-sm font-semibold">{p.name}</h3>
            <p className="text-green-600 font-bold">{p.price}</p>
            <AddToCartButton product={p} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductSection;
