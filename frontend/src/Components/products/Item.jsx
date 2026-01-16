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

  // Review form state
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // 🔐 Replace with your auth logic
  const isAuthenticated = !!localStorage.getItem("token");

  const fetchProduct = async () => {
    try {
      const res = await apiClient.get(`product/product/${id}/`);
      setProduct(res.data.product);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => navigate("/payment");

  const submitReview = async () => {
    if (!rating || !reviewText.trim()) return;

    try {
      await apiClient.post(`product/product/${id}/review/`, {
        rating,
        review_text: reviewText,
      });
      setRating(0);
      setReviewText("");
      fetchProduct();
    } catch (err) {
      console.error("Review submit failed", err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Product not found
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

        {/* ================= IMAGE ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl max-h-[450px] object-contain"
          />
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-8 relative">

          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < product.avg_rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({reviews.length} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-indigo-600 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* ================= ACTIONS ================= */}
          <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
            <AddToCartButton
              product={product}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            />
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Customer Reviews
        </h2>

        {/* ================= ADD REVIEW ================= */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => {
                const value = i + 1;
                return (
                  <FaStar
                    key={value}
                    className={`cursor-pointer text-2xl ${
                      value <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>

            <textarea
              rows="4"
              className="w-full border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button
              onClick={submitReview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="mb-10 text-gray-600 italic">
            Please login to write a review.
          </div>
        )}

        {/* ================= REVIEW LIST ================= */}
        <div className="space-y-5">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-5 border"
              >
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-2">
                  {review.review_text}
                </p>

                <p className="text-sm text-gray-500">
                  — {review.user_name.toUpperCase()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No reviews yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
