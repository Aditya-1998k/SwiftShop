import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import apiClient from "../../utils/axios";

function ProductSection() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get("product/categories-products/");
      setCategory(response.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10 text-lg">
        Loading products...
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        {error}
      </p>
    );

  return (
    <div className="space-y-12 mt-10">

      {category.categories.map((cat) => (
        <section
          key={cat.id}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-6"
        >

          {/* ================= CATEGORY HEADER ================= */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {cat.name}
            </h2>

            <button
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="text-indigo-600 font-medium hover:underline"
            >
              View all →
            </button>
          </div>

          {/* ================= PRODUCTS ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {cat.products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/product/${p.id}`)}
              >

                {/* IMAGE */}
                <div className="bg-gray-100 p-4 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-36 object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="text-xl font-bold text-indigo-600">
                    ₹{p.price || 999}
                  </p>

                  {/* Prevent click bubbling */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AddToCartButton
                      product={p}
                      className="w-full mt-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      ))}
    </div>
  );
}

export default ProductSection;
