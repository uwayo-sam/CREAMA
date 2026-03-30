import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Clock, CreditCard, ArrowLeft, CheckCircle, Phone, User, Navigation } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export function Checkout() {
  const { items, totalPrice, checkout, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: user?.name || '',
    phone: '',
    instructions: '',
  });
  const [step, setStep] = useState<'location' | 'details' | 'confirm'>('location');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/menu');
    }
  }, [items, navigate]);

  // Automatically get current location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode to get address
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const address = `${data.city}, ${data.locality}, ${data.countryName}`;
            setLocation({ latitude, longitude, address });
          } catch (error) {
            // Fallback to coordinates only
            setLocation({
              latitude,
              longitude,
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setLocation({ latitude: lat, longitude: lng, address });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      alert('Please select a delivery location');
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice * 1.18, // Including 18% tax
        delivery_address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        customer_name: deliveryDetails.name,
        customer_phone: deliveryDetails.phone,
        delivery_instructions: deliveryDetails.instructions,
      };

      console.log('Submitting order with location:', location);
      await checkout({
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = totalPrice;
  const tax = subtotal * 0.18;
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center gap-2 text-black hover:text-amber-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Menu
          </button>
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
          <p className="text-black mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === 'location' ? 'bg-amber-600 text-white' :
                location ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                <MapPin size={20} />
              </div>
              <div className={`h-1 w-16 ${
                step === 'details' || step === 'confirm' ? 'bg-amber-600' : 'bg-gray-300'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === 'details' ? 'bg-amber-600 text-white' :
                deliveryDetails.name ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                <User size={20} />
              </div>
              <div className={`h-1 w-16 ${
                step === 'confirm' ? 'bg-amber-600' : 'bg-gray-300'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === 'confirm' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                <CheckCircle size={20} />
              </div>
            </div>

            {/* Location Selection */}
            {step === 'location' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-black mb-4">Select Delivery Location</h2>

                {!location ? (
                  <div className="text-center py-8">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-black mb-2">Choose Your Delivery Location</h3>
                    <p className="text-black mb-6">Select where you'd like your order delivered</p>
                    <button
                      onClick={getCurrentLocation}
                      className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Navigation size={20} />
                      Use My Current Location
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Simple Map Placeholder */}
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <MapPin className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                        <p className="text-black font-medium">Location Selected</p>
                        <p className="text-gray-600 text-sm">Lat: {location.latitude.toFixed(6)}</p>
                        <p className="text-gray-600 text-sm">Lng: {location.longitude.toFixed(6)}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-green-600 mt-1" size={20} />
                        <div>
                          <p className="font-medium text-black">Delivery Address</p>
                          <p className="text-black text-sm">{location.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={getCurrentLocation}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-medium transition-colors"
                      >
                        Update Location
                      </button>
                      <button
                        onClick={() => setStep('details')}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Delivery Details */}
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-black mb-4">Delivery Details</h2>

                <form onSubmit={(e) => { e.preventDefault(); setStep('confirm'); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={deliveryDetails.name}
                      onChange={(e) => setDeliveryDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-black placeholder-gray-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={deliveryDetails.phone}
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-black placeholder-gray-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={deliveryDetails.instructions}
                      onChange={(e) => setDeliveryDetails(prev => ({ ...prev, instructions: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-black placeholder-gray-500 transition-colors"
                      rows={3}
                      placeholder="e.g., Ring doorbell twice, leave at door..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('location')}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Order Confirmation */}
            {step === 'confirm' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-black mb-4">Confirm Your Order</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-blue-900">Delivery Address</p>
                      <p className="text-blue-700 text-sm">{location?.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <User className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-green-900">Contact Details</p>
                      <p className="text-green-700 text-sm">{deliveryDetails.name}</p>
                      <p className="text-green-700 text-sm">{deliveryDetails.phone}</p>
                      {deliveryDetails.instructions && (
                        <p className="text-green-700 text-sm mt-1">Note: {deliveryDetails.instructions}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image_url || '/images/placeholder.jpg'}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black">Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Tax (18%)</span>
                  <span className="text-black">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Delivery Fee</span>
                  <span className="text-black">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span className="text-black">Total</span>
                  <span className="text-amber-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800 mb-2">
                  <Clock size={18} />
                  <span className="font-medium">Estimated Delivery</span>
                </div>
                <p className="text-amber-700 text-sm">
                  25-35 minutes from order confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}