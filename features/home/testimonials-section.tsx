"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState } from "react"
import { GetQuoteSection } from "./get-quote-section";
const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Vijayawada",
    rating: 5,
    review: "Excellent service! Got the best rates for my USD. The staff was very helpful and professional. Highly recommended for forex needs.",
    image: "👨",
  },
  {
    name: "Priya Sharma",
    location: "Hyderabad",
    rating: 5,
    review: "Smooth process for my daughter's study abroad forex. They guided us through everything and provided competitive rates. Thank you YashRaj!",
    image: "👩",
  },
  {
    name: "Srinivas Rao",
    location: "Guntur",
    rating: 5,
    review: "Been using their services for business forex for years. Always reliable and trustworthy. Best forex service in Vijayawada.",
    image: "👨",
  },
  {
    name: "Anjali Reddy",
    location: "Vijayawada",
    rating: 5,
    review: "Quick and hassle-free currency exchange. The team is knowledgeable and provided great advice for my travel forex needs.",
    image: "👩",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-slate-900 overflow-hidden w-full max-w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Customer <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            What our customers say about us
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-0 sm:-top-8 sm:-left-6 text-8xl text-primary-200 dark:text-primary-900 opacity-50 pointer-events-none overflow-hidden">
              <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-slate-600 relative">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                "{testimonials[currentIndex].review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-navy-600 rounded-full flex items-center justify-center text-3xl">
                  {testimonials[currentIndex].image}
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 dark:hover:bg-primary-600 rounded-full transition-colors group"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 dark:hover:bg-primary-600 rounded-full transition-colors group"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">4.9 Rating</div>
            <div className="text-slate-600 dark:text-slate-400">on Google</div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
