import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axios";
import AddToCartButton from "./AddToCartButton";
import { FaStar } from "react-icons/fa";

function ProductItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await apiClient.get(`product/product/${id}/`);
      setProduct(res.data.product);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => navigate("/payment");

  if (loading)
    return <div className="p-10 text-center text-xl font-semibold">Loading...</div>;

  if (!product)
    return <div className="p-10 text-center text-xl text-red-500">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 bg-gray-50 min-h-screen rounded-xl">

      {/* ================= Product Image ================= */}
      <div className="flex justify-center items-start">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-2xl object-cover w-full max-w-md border border-gray-200"
        />
      </div>

      {/* ================= Product Info ================= */}
      <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{product.name}</h1>

        <p className="text-3xl font-bold text-indigo-600 mb-4">
          ₹{product.price}
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {product.description}
        </p>

        {/* ================= Buttons ================= */}
        <div className="flex gap-4 mt-6">

          <AddToCartButton
            product={product}
            className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-md transition transform hover:scale-[1.02]"
          />

          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition transform hover:scale-[1.02]"
          >
            Buy Now
          </button>

        </div>

        {/* ================= Reviews ================= */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Customer Reviews</h2>

          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        } text-lg`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 font-medium">{review.review_text}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    By <strong className="text-gray-800">{review.user_name}</strong>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
