import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axios";
import AddToCartButton from "./AddToCartButton";
import { FaStar } from "react-icons/fa";

function ProductItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await apiClient.get(`product/product/${id}/`);
      console.log(res.data.product)
      setProduct(res.data.product);
    } catch (err) {
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    navigate("/payment");
  };

  if (loading)
    return <div className="p-10 text-center text-xl font-semibold">Loading...</div>;

  if (!product)
    return <div className="p-10 text-center text-xl text-red-500">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* ================= Product Image ================= */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl shadow-lg object-cover w-full max-w-md"
        />
      </div>

      {/* ================= Product Info ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

        <p className="text-2xl font-bold text-indigo-600 mb-4">
          ₹{product.price}
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {product.description}
        </p>

        {/* ================= Buttons ================= */}
        <div className="flex gap-4 mt-6">
          <AddToCartButton product={product}/>

          <button
            onClick={handleBuyNow}
            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>

        {/* ================= Reviews ================= */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i}
                        className={
                          i < review.rating ? "text-yellow-500" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-gray-700">{review.comment}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    — {review.user_name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
