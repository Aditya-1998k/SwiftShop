import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import AddToCartButton from "./AddToCartButton";

function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        `product/category/${slug}/products/`
      );
      setProducts(response.data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-16">

      {/* ================= CATEGORY HEADER ================= */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold capitalize text-gray-900">
            {slug.replace("-", " ")}
          </h1>
          <p className="text-gray-500 mt-1">
            {products.length} products available
          </p>
        </div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-10">

        {products.length === 0 ? (
          <p className="text-gray-500 italic">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/product/${p.id}`)}
              >

                {/* IMAGE */}
                <div className="bg-gray-100 p-5 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-40 object-contain group-hover:scale-105 transition"
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

                  {/* Stop navigation when clicking cart */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <AddToCartButton
                      product={p}
                      className="w-full mt-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
