import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function AddToCartButton({ product, className }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert("Added to Cart!");
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2.5
        bg-indigo-600 hover:bg-indigo-700
        text-white text-sm font-semibold
        rounded-xl
        shadow-sm hover:shadow-md
        transition active:scale-[0.98]
        ${className}
      `}
    >
      <FaShoppingCart size={14} />
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
