import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Package, Users, Briefcase } from 'lucide-react';

export function Services() {
  return (
    <div className="min-h-screen bg-creama-bg pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-creama-dark text-creama-bg overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop" 
            alt="Coffee shop services" 
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
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
            <p className="text-xl text-creama-latte/90 leading-relaxed">
              Beyond the cup. Discover how Creama can elevate your coffee experience at home, at work, or at your next event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: <Package size={40} />,
                title: "Wholesale Coffee",
                description: "Elevate your cafe, restaurant, or office with our premium, freshly roasted beans. We offer competitive pricing, custom blends, and reliable delivery across Kigali.",
                image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop"
              },
              {
                icon: <Users size={40} />,
                title: "Event Catering",
                description: "Bring the Creama experience to your next corporate event, wedding, or private party. Our mobile espresso bar and professional baristas will delight your guests.",
                image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=800&auto=format&fit=crop"
              },
              {
                icon: <Coffee size={40} />,
                title: "Barista Training",
                description: "Learn the art of coffee making from our expert baristas. We offer courses ranging from basic espresso extraction to advanced latte art and sensory evaluation.",
                image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop"
              },
              {
                icon: <Briefcase size={40} />,
                title: "Office Coffee Solutions",
                description: "Keep your team energized with our tailored office coffee programs. We provide top-tier equipment, regular maintenance, and a steady supply of fresh beans.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-creama-bg rounded-3xl overflow-hidden shadow-sm border border-creama-latte/30 group hover:shadow-md transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="text-creama-accent mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-creama-dark">{service.title}</h3>
                  <p className="text-creama-dark/70 leading-relaxed mb-6">{service.description}</p>
                  <button className="text-creama-accent font-medium uppercase tracking-wider text-sm hover:text-creama-dark transition-colors">
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
