export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">About – A Bloom Studio</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
        Welcome to <span className="font-semibold">A Bloom Studio</span>, your one-stop destination for fresh, 
        handpicked flowers. We believe in bringing nature closer to you by curating 
        beautiful floral arrangements for every occasion.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-3">🌸 Our Mission</h2>
          <p className="text-gray-600">
            To spread joy, love, and positivity through flowers. 
            Whether it’s a birthday, wedding, or just a normal day, 
            our flowers are here to brighten your moments.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-3">🌿 Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Fresh and handpicked flowers daily</li>
            <li>Eco-friendly and sustainable packaging</li>
            <li>Custom bouquets tailored to your needs</li>
            <li>Fast delivery across the city</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-3">💚 Thank You for Choosing Us!</h2>
        <p className="text-gray-600">
          We are more than just a flower shop, we are a family that celebrates 
          nature’s beauty with you.  
        </p>
      </div>
    </div>
  );
}
