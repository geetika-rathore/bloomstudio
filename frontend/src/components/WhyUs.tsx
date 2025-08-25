import Link from "next/link";
import { Leaf, Heart, Star, Truck } from "lucide-react";

export default function WhyUs() {
  return (
    <section className="bg-gradient-to-r from-[#e4fdfa] via-[#f5f8fa] to-[#fff7fa] py-16">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <h2 className="text-4xl font-extrabold text-[#5d6f3e] mb-6">
          Why Choose <span className="text-[#c83f8d]">Bloom Studio</span>?
        </h2>
        <p className="text-lg text-[#5d6f3e] mb-12 max-w-3xl mx-auto">
          We blend elegance with sustainability, offering eco-friendly products crafted with love for your home and the planet. Discover why our customers love Bloom Studio.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
          <div className="flex items-start space-x-4">
            <Leaf className="text-[#8fbc8f] w-10 h-10 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-[#4a5e32] mb-2">Eco-Friendly</h3>
              <p className="text-[#5d6f3e]">
                We use sustainable materials that protect the environment without compromising style.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Heart className="text-[#c83f8d] w-10 h-10 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-[#7a2f56] mb-2">Crafted with Love</h3>
              <p className="text-[#5d6f3e]">
                Every product is carefully designed to bring beauty and comfort to your living space.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Star className="text-[#d8a9c3] w-10 h-10 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-[#85577c] mb-2">Quality Assured</h3>
              <p className="text-[#5d6f3e]">
                We stand behind our products with excellent quality control and customer support.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Truck className="text-[#8fa98f] w-10 h-10 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-[#4a6c47] mb-2">Fast Delivery</h3>
              <p className="text-[#5d6f3e]">
                Reliable and quick shipping so you get your blooms fresh and on time.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/about"
          className="inline-block bg-[#c83f8d] hover:bg-[#a82f70] text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Know More
        </Link>
      </div>
    </section>
  );
}
