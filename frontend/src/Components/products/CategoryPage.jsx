import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../utils/axios";
import AddToCartButton from "./AddToCartButton";

function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchData = async ()=>{
        try{
            const response = await apiClient.get(`product/category/${slug}/products/`)
            setProducts(response.data.products)
        } catch (err){
            setError(err)
            console.log("Error", err)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [slug])

  if (loading) return <p className="text-gray-500 text-center mt-8">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">
        {slug} Products
      </h1>
      {/* Product Grid Here */}
      <p className="mt-4 text-gray-600">Show products for: {slug}</p>

                {/* Products inside a category */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 shadow hover:shadow-md cursor-pointer bg-white"
                onClick={() => navigate(`/product/${p.slug}`)}
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
  );
}

export default CategoryPage;
