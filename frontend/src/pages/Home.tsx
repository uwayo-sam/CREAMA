import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0C0A09]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop"
            alt="Dark moody coffee"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center text-white drop-shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              Artisanal Coffee,<br /> Crafted with Passion.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Experience the rich, complex flavors of ethically sourced beans, roasted to perfection and brewed with care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/menu">
                <Button size="lg" className="w-full sm:w-auto bg-creama-accent text-white hover:bg-[#c29161] border-none">
                  Order Now
                </Button>
              </Link>
              <Link to="/location">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black">
                  Find Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-creama-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-creama-latte/30 flex items-center justify-center mb-6 text-creama-accent">
                <Coffee size={32} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-creama-dark">Ethically Sourced</h3>
              <p className="text-creama-dark/70">We partner directly with farmers to ensure fair wages and sustainable growing practices.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-creama-latte/30 flex items-center justify-center mb-6 text-creama-accent">
                <Star size={32} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-creama-dark">Expertly Roasted</h3>
              <p className="text-creama-dark/70">Our master roasters bring out the unique flavor profile of every single bean.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-creama-latte/30 flex items-center justify-center mb-6 text-creama-accent">
                <Coffee size={32} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-creama-dark">Perfectly Brewed</h3>
              <p className="text-creama-dark/70">Our baristas are trained to extract the perfect shot, every single time.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-creama-mocha text-creama-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Signature Drinks</h2>
              <p className="text-creama-dark/70 max-w-xl">Discover our most loved creations, crafted with our signature espresso blend.</p>
            </div>
            <Link to="/menu" className="hidden md:flex items-center gap-2 text-creama-accent hover:text-white transition-colors">
              View Full Menu <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Caramel Macchiato', price: '5,500 FRW', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop' },
              { name: 'Vanilla Bean Latte', price: '5,000 FRW', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop' },
              { name: 'Cold Brew Cream', price: '4,750 FRW', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop' },
              { name: 'Mocha Truffle', price: '6,000 FRW', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button variant="secondary" className="w-full">Add to Order</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                  <span className="text-creama-accent font-medium">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/menu" className="inline-flex items-center gap-2 text-creama-accent hover:text-white transition-colors">
              View Full Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
