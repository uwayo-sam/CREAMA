import React from 'react';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-creama-mocha text-creama-dark py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-creama-bg overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Creama Logo" className="w-full h-full object-contain" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-creama-accent"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>';
                }} />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest uppercase">
                Creama
              </span>
            </Link>
            <p className="text-creama-dark/70 max-w-sm mb-8 font-serif text-lg">
              Crafting exceptional coffee experiences with ethically sourced beans and artisanal pastries.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-creama-dark/10 hover:bg-creama-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-creama-dark/10 hover:bg-creama-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-creama-dark/10 hover:bg-creama-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-creama-accent">Quick Links</h4>
            <ul className="space-y-4 text-creama-dark/80">
              <li><Link to="/menu" className="hover:text-white transition-colors">Menu & Order</Link></li>
              <li><Link to="/location" className="hover:text-white transition-colors">Our Location</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-creama-accent">Visit Us</h4>
            <address className="not-italic text-creama-dark/80 space-y-2">
              <p>KK 21 Avenue</p>
              <p>Kicukiro District, Kigali, Rwanda</p>
              <p className="pt-2">+250 788 123 456</p>
              <p className="pt-4">Mon-Fri: 7am - 7pm</p>
              <p>Sat-Sun: 8am - 8pm</p>
              <p className="pt-4 text-creama-accent">hello@creamacoffee.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-creama-dark/10 text-center text-sm text-creama-dark/50">
          <p>&copy; {new Date().getFullYear()} Creama Coffee Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
