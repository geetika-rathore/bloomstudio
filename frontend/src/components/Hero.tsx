// src/components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-l w-dvw h-auto from-[#f3f8df] via-[#f5c3e4] to-[#e4fdfa]">
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 items-center text-center">
        
        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          <span className="text-[#5d6f3e]">Welcome to </span>
          <span className="text-[#c83f8d]">Bloom Studio</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Bringing nature’s beauty into your life with eco-friendly, 
          sustainable products. Explore handcrafted collections 
          designed to inspire harmony and elegance. 🌸
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 bg-white text-[#c83f8d] font-semibold rounded-full shadow hover:bg-[#fbe5f0] transition"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#c83f8d] transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
