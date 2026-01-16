function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            About <span className="text-indigo-600">SwiftShop</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            SwiftShop is a modern e-commerce platform built to deliver a
            fast, seamless, and secure shopping experience.
            We connect customers with quality products, quick delivery,
            and trusted payments.
          </p>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">

          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">🏬</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Wide Product Range
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Discover thousands of carefully curated products
              across multiple categories.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Fast Delivery
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Enjoy quick, reliable delivery with real-time
              order tracking.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Secure Payments
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Safe and seamless checkout powered by Razorpay
              and modern security standards.
            </p>
          </div>

        </div>

        {/* ================= MISSION ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We are committed to making online shopping easier,
            faster, and more reliable. SwiftShop is built with
            performance, trust, and customer satisfaction at
            its core.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
