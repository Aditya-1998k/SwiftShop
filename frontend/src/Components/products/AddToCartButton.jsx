// src/components/cart/AddToCartButton.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent parent card click
    addToCart(product);
    alert("Added to Cart!");
  };

  return (
    <button
      className="mt-2 w-full bg-indigo-600 text-white py-1 rounded-md text-sm hover:bg-indigo-700 transition"
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
