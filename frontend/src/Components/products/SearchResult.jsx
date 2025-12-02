import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import apiClient from "../../utils/axios";

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
    return <p className="text-center text-gray-600 mt-10">Searching...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search results for: <span className="text-indigo-600">"{query}"</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((prod) => (
            <Link
              key={prod.id}
              to={`/product/${prod.id}`}
              className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{prod.name}</h2>
              <p className="text-indigo-600 font-bold">₹{prod.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
