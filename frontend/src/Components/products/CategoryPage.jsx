import { useParams } from "react-router-dom";

function CategoryPage() {
  const { catName } = useParams();

  // You can fetch products based on catName
  // Example: /api/products?category=mobiles

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">
        {catName} Products
      </h1>
      {/* Product Grid Here */}
      <p className="mt-4 text-gray-600">Show products for: {catName}</p>
    </div>
  );
}

export default CategoryPage;
