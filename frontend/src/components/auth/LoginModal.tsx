import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        onClose();
      } else {
        await register(formData.name, formData.email, formData.password);
        // After successful registration, switch to login
        setIsLogin(true);
        setFormData(prev => ({ ...prev, name: '', password: '' }));
        setError('Registration successful! Please log in.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setError('');
    setIsLoading(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-creama-bg rounded-2xl shadow-2xl border border-creama-latte/30 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-creama-latte/30">
                <h2 className="font-serif text-2xl font-bold text-creama-dark">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-creama-dark/60 hover:text-creama-dark transition-colors rounded-full hover:bg-creama-latte/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name field (only for registration) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-creama-dark">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-creama-dark/40" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-creama-latte rounded-lg focus:outline-none focus:ring-2 focus:ring-creama-accent focus:border-transparent bg-creama-bg"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-creama-dark">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-creama-dark/40" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-creama-latte rounded-lg focus:outline-none focus:ring-2 focus:ring-creama-accent focus:border-transparent bg-creama-bg"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-creama-dark">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-creama-dark/40" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-creama-latte rounded-lg focus:outline-none focus:ring-2 focus:ring-creama-accent focus:border-transparent bg-creama-bg"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-creama-dark/40 hover:text-creama-dark"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-lg text-sm ${
                        error.includes('successful')
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading
                    ? (isLogin ? 'Signing In...' : 'Creating Account...')
                    : (isLogin ? 'Sign In' : 'Create Account')
                  }
                </Button>

                {/* Switch mode */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-sm text-creama-dark/70 hover:text-creama-accent transition-colors"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : 'Already have an account? Sign in'
                    }
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}