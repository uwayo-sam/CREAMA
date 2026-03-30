import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Heart, Users, Leaf } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-creama-bg pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-creama-dark text-creama-bg overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop" 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Story</h1>
            <p className="text-xl text-creama-latte/90 leading-relaxed">
              Born from a passion for exceptional coffee and a desire to create a welcoming space for the Kigali community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop" 
                alt="Barista pouring coffee" 
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6 text-creama-dark">The Creama Journey</h2>
              <p className="text-creama-dark/80 text-lg mb-6 leading-relaxed">
                Creama started with a simple idea: coffee is more than just a drink; it's an experience, a ritual, and a way to connect. Founded in the heart of Kigali, we set out to source the finest beans from local Rwandan farmers and around the world.
              </p>
              <p className="text-creama-dark/80 text-lg leading-relaxed">
                Every cup we serve is a testament to our dedication to quality, sustainability, and the art of coffee making. Our baristas are trained to extract the perfect flavor profile from every roast, ensuring that your daily cup is nothing short of extraordinary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-creama-latte/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6 text-creama-dark">Our Values</h2>
            <p className="text-creama-dark/70 text-lg">The principles that guide everything we do, from bean to cup.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Leaf size={32} />,
                title: "Sustainability",
                description: "We partner with eco-conscious farms and use biodegradable packaging to minimize our footprint."
              },
              {
                icon: <Users size={32} />,
                title: "Community",
                description: "Creama is a gathering place. We support local artists, host events, and foster connections."
              },
              {
                icon: <Heart size={32} />,
                title: "Passion",
                description: "We pour our heart into every detail, from the roast profile to the latte art."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-creama-bg p-8 rounded-3xl shadow-sm border border-creama-latte/30 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-creama-accent/10 text-creama-accent mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-creama-dark">{value.title}</h3>
                <p className="text-creama-dark/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
