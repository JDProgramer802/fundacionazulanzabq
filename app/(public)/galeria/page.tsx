'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Filter, Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string;
  active: boolean;
}

const CATEGORIES = ['Todas', 'Jornadas', 'Eventos', 'Comunidad', 'Sede'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      const activeItems = data.filter((item: GalleryItem) => item.active);
      setItems(activeItems);
      setFilteredItems(activeItems);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory, items]);

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] shape-blob-pink opacity-20 animate-float" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] shape-blob-blue opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-premium text-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            <Camera size={14} /> Momentos Azulanza
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-secondary font-primary mb-6"
          >
            Nuestra <span className="gradient-text">Galería</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-light leading-relaxed font-body"
          >
            Capturando la esencia de nuestra labor y el impacto en cada corazón que tocamos.
          </motion.p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-500 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'glass text-secondary hover:bg-gray-50'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="animate-pulse text-primary/20" size={64} />
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="group relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title || 'Gallery item'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-xl">
                        {item.title || 'Fundación Azulanza'}
                      </h3>
                      <div className="mt-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white self-end">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
              <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 font-medium font-body">
                No hay fotos en esta categoría aún.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredItems[selectedImage].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredItems[selectedImage].image_url}
                    alt={filteredItems[selectedImage].title || ''}
                    fill
                    className="object-contain"
                  />

                  {/* Info Overlay */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                    <div className="glass-premium p-8 rounded-[2.5rem] text-center border-white/20">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
                        {filteredItems[selectedImage].category}
                      </span>
                      <h2 className="text-secondary font-bold text-2xl mb-2">
                        {filteredItems[selectedImage].title || 'Fundación Azulanza'}
                      </h2>
                      <p className="text-gray-500 text-sm italic font-body">
                        &quot;
                        {filteredItems[selectedImage].description ||
                          'Capturando momentos de cambio y esperanza.'}
                        &quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all sm:block hidden"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all sm:block hidden"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="absolute bottom-4 flex gap-8 sm:hidden">
              <button onClick={handlePrev} className="p-4 bg-white/10 rounded-full text-white">
                <ChevronLeft size={32} />
              </button>
              <button onClick={handleNext} className="p-4 bg-white/10 rounded-full text-white">
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
