import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import apiClient from "../../utils/axios";
import { FaSearch } from "react-icons/fa";

function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await apiClient.get(`product/search/?q=${query}`);
      setResults(res.data.products);
    } catch (err) {
      console.error("Search API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchResults();
  }, [query]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Searching products...
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 pt-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Search Results
          </h1>

          <p className="mt-2 text-gray-600">
            Showing results for{" "}
            <span className="font-semibold text-indigo-600">
              “{query}”
            </span>
            {results.length > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                ({results.length} items)
              </span>
            )}
          </p>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center">
            <FaSearch size={56} className="mx-auto text-gray-300 mb-6" />

            <h2 className="text-xl font-semibold mb-2">
              No results found
            </h2>

            <p className="text-gray-500 mb-6">
              Try searching with different keywords or explore our categories.
            </p>

            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* ================= PRODUCT CARDS ================= */}
            {results.map((prod) => (
              <Link
                key={prod.id}
                to={`/product/${prod.id}`}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="bg-gray-100 p-5 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-40 object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {prod.name}
                  </h2>

                  <p className="text-lg font-bold text-indigo-600 mt-2">
                    ₹{prod.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
