import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import apiClient from "../../utils/axios";

function ProductSection() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchProduct = async () => {
    try{
      const response = await apiClient.get("product/categories-products/");
      setCategory(response.data)
    } catch (err){
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProduct()
  }, [])

  if (loading) return <p className="text-gray-500 text-center mt-8">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">Error: {error}</p>;

  return (
    <div className="mt-8">

      {category.categories.map((cat) => (
        <div 
          key={cat.id} 
          className="bg-white p-4 rounded-xl shadow mb-8"
        >

          {/* Category Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{cat.name}</h2>

            <button
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="text-indigo-600 hover:underline text-sm"
            >
              View All
            </button>
          </div>

          {/* Products inside a category */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cat.products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 shadow hover:shadow-md cursor-pointer bg-white"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-32 w-full object-contain mb-2 rounded"
                />

                <h3 className="text-sm font-semibold">{p.name}</h3>

                <p className="text-green-600 font-bold">
                  ₹{p.price || 999}
                </p>

                <AddToCartButton product={p} />
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );

}

export default ProductSection;
