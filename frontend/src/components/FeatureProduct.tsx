'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-12 bg-gradient-to-r from-[#fadee8] to-[#f2f9f1]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-[#c83f8d]">Explore</span> Our Favourites
        </h2>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                href={`/products/${product._id}`}
                className="block overflow-hidden rounded-xl shadow-lg transition-transform duration-300 bg-white"
              >
                <div className="relative w-full h-96 bg-gray-100 rounded-t-xl overflow-hidden">
                  <Image
                    src={product.images?.[0] ? `http://localhost:5000${product.images[0]}` : '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-center font-semibold mb-2 text-[#5d6f3e]">{product.name}</h3>
                  {/* <p className="mt-2 text-lg font-medium text-[#c83f8d]">{product.price.toFixed(2)}</p> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Explore All Button */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="bg-[#c83f8d] text-white px-6 py-3 rounded-full font-medium hover:bg-[#a82f70] transition"
          >
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
}
