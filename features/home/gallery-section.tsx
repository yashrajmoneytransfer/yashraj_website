"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { X, ZoomIn } from "lucide-react"

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800", alt: "Office Interior", category: "Office" },
  { id: 2, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", alt: "Business Meeting", category: "Events" },
  { id: 3, src: "https://images.unsplash.com/photo-1565514020306-8e6ca6195c19?w=800", alt: "Currency Exchange", category: "Services" },
  { id: 4, src: "https://images.unsplash.com/photo-1526304640152-d4619684e484?w=800", alt: "Team Photo", category: "Team" },
  { id: 5, src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800", alt: "Customer Service", category: "Services" },
  { id: 6, src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", alt: "Corporate Event", category: "Events" },
  { id: 7, src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", alt: "Modern Office", category: "Office" },
  { id: 8, src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800", alt: "Business Growth", category: "Events" },
]

const categories = ["All", "Office", "Events", "Services", "Team"]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Our <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A glimpse into our services and office
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="font-semibold">{image.alt}</div>
                <div className="text-sm text-slate-300">{image.category}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-gold-400 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
