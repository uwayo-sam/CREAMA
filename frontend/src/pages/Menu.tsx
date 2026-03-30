import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCart, Product } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import api from '../api/api';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;
  }

  return (
    <div className="min-h-screen bg-creama-bg pt-12 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-creama-dark mb-6">Our Menu</h1>
          <p className="text-creama-dark/70 max-w-2xl mx-auto text-lg">
            Order ahead and skip the line. Freshly prepared when you arrive.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === category
                  ? 'bg-creama-dark text-creama-bg'
                  : 'bg-transparent border border-creama-latte text-creama-dark hover:border-creama-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-creama-mocha rounded-3xl overflow-hidden shadow-sm border border-creama-latte/30 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl font-semibold text-creama-dark">{item.name}</h3>
                  <span className="font-medium text-creama-accent text-lg">{item.price.toLocaleString()} FRW</span>
                </div>
                <p className="text-creama-dark/60 mb-6 flex-1">{item.description}</p>
                <Button 
                  onClick={() => addItem(item)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add to Order
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
