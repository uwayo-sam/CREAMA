import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function Location() {
  return (
    <div className="min-h-screen bg-creama-bg pt-12 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-creama-dark mb-6">Find Us</h1>
          <p className="text-creama-dark/70 max-w-2xl mx-auto text-lg">
            Come visit our flagship store. We'd love to pour you a cup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-creama-mocha text-creama-dark p-10 md:p-16 rounded-3xl"
          >
            <h2 className="font-serif text-3xl font-semibold mb-10 text-creama-accent">Creama Downtown</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-creama-dark/10 rounded-full text-creama-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Address</h3>
                  <p className="text-creama-dark/70">KK 21 Avenue<br />Kicukiro District, Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-creama-dark/10 rounded-full text-creama-accent shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Hours</h3>
                  <p className="text-creama-dark/70">Monday - Friday: 7:00 AM - 7:00 PM<br />Saturday - Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-creama-dark/10 rounded-full text-creama-accent shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Contact</h3>
                  <p className="text-creama-dark/70">+250 788 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-creama-dark/10 rounded-full text-creama-accent shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <p className="text-creama-dark/70">hello@creamacoffee.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[600px] rounded-3xl overflow-hidden shadow-lg border border-creama-latte/30 relative bg-creama-latte/20"
          >
            <iframe 
              src="https://maps.google.com/maps?q=KK%2021%20Avenue,%20Kicukiro,%20Kigali,%20Rwanda&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Creama Location"
              className="absolute inset-0 grayscale invert contrast-125 opacity-80"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
