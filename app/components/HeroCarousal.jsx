"use client";

import Image from "next/image";
import { useState,useEffect } from "react";

const slides = [
  {
    image: "/img/carousel-1.png",
    alt: "Laptop",
    offer: "Save Up To $400",
    title: "On Selected Laptops & Smartphones",
  },
  {
    image: "/img/carousel-2.png",
    alt: "Phone",
    offer: "Save Up To $200",
    title: "Latest Smartphones & Tablets",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="w-full">
      <div className="mx-auto flex  flex-col gap-6 px-4 lg:flex-row">

        {/* Left Carousel */}
        <div className="relative min-h-[500px] flex-1 overflow-hidden rounded-xl bg-gray-100">

          {/* Slide */}
          <div className="grid h-full items-center gap-8 p-8 md:grid-cols-2 md:p-12">

            {/* Image */}
            <div className="flex items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={500}
                height={500}
                className="h-[300px] w-full object-contain md:h-[400px]"
              />
            </div>

            {/* Content */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {slide.offer}
              </p>

              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {slide.title}
              </h1>

              <p className="mt-5 text-gray-600">
                Terms and conditions apply.
              </p>

              <button className="mt-6 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
                Shop Now
              </button>
            </div>
          </div>

          {/* Previous */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:bg-gray-100"
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:bg-gray-100"
          >
            →
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  currentSlide === index
                    ? "w-6 bg-blue-600"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Banner */}
        <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl lg:w-[300px]">

          <Image
            src="/img/header-img.jpg"
            alt="Apple iPad Mini"
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Banner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-sm font-medium uppercase text-white">
              Special Offer
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Apple iPad Mini
            </h3>

            <p className="mt-2 text-xl font-bold text-yellow-400">
              $1,050
            </p>

            <button className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Add To Cart
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}