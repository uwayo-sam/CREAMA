import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Clock, MapPin, Home, Coffee } from 'lucide-react';

export function OrderSuccess() {
  const navigate = useNavigate();

  // Redirect to home if accessed directly without placing an order
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // Auto redirect after 10 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Success Header */}
          <div className="text-center py-8 px-6 bg-green-600">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4"
            >
              <CheckCircle className="text-green-600" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-green-100">Your delicious coffee is on its way</p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">What's Next?</h2>
              <p className="text-gray-600 text-sm">
                Our baristas are preparing your order with care
              </p>
            </motion.div>

            {/* Status Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-amber-600 rounded-full">
                  <Coffee className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Preparing Your Order</p>
                  <p className="text-amber-700 text-sm">Our skilled baristas are at work</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <Clock className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Out for Delivery</p>
                  <p className="text-blue-700 text-sm">Your order will arrive in 25-35 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
                  <MapPin className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-medium text-green-900">Delivered to Your Location</p>
                  <p className="text-green-700 text-sm">Fresh coffee at your doorstep</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <Link
                to="/menu"
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Order More Coffee
              </Link>

              <Link
                to="/"
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Back to Home
              </Link>
            </motion.div>

            {/* Auto Redirect Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-sm text-gray-500"
            >
              You will be redirected to the home page in 10 seconds...
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}