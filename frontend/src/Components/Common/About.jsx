function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">About SwiftShop</h1>

      <p className="text-gray-700 text-lg leading-relaxed text-center">
        SwiftShop is a modern and fast e-commerce platform built to offer a seamless online shopping experience.  
        We connect customers with high-quality products, fast delivery, and secure payments.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-semibold text-lg">🏬 Wide Product Range</h3>
          <p className="text-gray-600 mt-2">
            Explore thousands of products curated just for you.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-semibold text-lg">⚡ Fast Delivery</h3>
          <p className="text-gray-600 mt-2">
            Get your orders delivered quickly and safely.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-semibold text-lg">🔒 Secure Payments</h3>
          <p className="text-gray-600 mt-2">
            Powered by Razorpay for a smooth, safe checkout.
          </p>
        </div>

      </div>

      <p className="mt-10 text-center text-gray-600">
        We are committed to making your shopping easier, faster, and more reliable.
      </p>
    </div>
  );
}

export default About;
