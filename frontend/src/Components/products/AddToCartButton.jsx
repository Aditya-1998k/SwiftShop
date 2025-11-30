// src/components/cart/AddToCartButton.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function AddToCartButton({ product, className }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent parent card click
    addToCart(product);
    alert("Added to Cart!");
  };

  return (
    <button
      className={`px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ${className}`}
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
