import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, checkout, totalPrice } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to place an order');
      return;
    }
    setIsCheckingOut(true);
    try {
      await checkout();
      alert('Order placed successfully!');
      setIsCartOpen(false);
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-creama-bg shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-creama-latte/30">
              <h2 className="font-serif text-2xl font-semibold text-creama-dark flex items-center gap-2">
                <ShoppingBag size={24} />
                Your Order
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-creama-dark/60 hover:text-creama-dark transition-colors rounded-full hover:bg-creama-latte/20"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-creama-dark/50 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-lg font-serif">Your cart is empty</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-creama-latte/20 flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-creama-dark">{item.name}</h3>
                            <p className="text-sm text-creama-dark/60 capitalize">{item.category}</p>
                          </div>
                          <p className="font-medium text-creama-dark">{(item.price * item.quantity).toLocaleString()} FRW</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-creama-mocha border border-creama-latte rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-creama-dark/60 hover:text-creama-dark"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-creama-dark/60 hover:text-creama-dark"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-creama-bg border-t border-creama-latte/30">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-creama-dark/70">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString()} FRW</span>
                  </div>
                  <div className="flex justify-between text-creama-dark/70">
                    <span>Tax (18%)</span>
                    <span>{(totalPrice * 0.18).toLocaleString()} FRW</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl font-semibold text-creama-dark pt-3 border-t border-creama-latte/30">
                    <span>Total</span>
                    <span>{(totalPrice * 1.18).toLocaleString()} FRW</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? 'Placing Order...' : 'Proceed to Checkout'}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
