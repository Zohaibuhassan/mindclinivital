import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Activity } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication process
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[rgba(0,212,200,0.1)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[rgba(10,132,255,0.1)] blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-[rgba(255,255,255,0.02)] backdrop-blur-2xl border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[rgba(0,212,200,0.2)] to-[rgba(10,132,255,0.2)] flex items-center justify-center border border-[rgba(255,255,255,0.1)] shadow-[0_0_30px_rgba(0,212,200,0.15)]"
          >
            <Activity className="w-8 h-8 text-[#00d4c8]" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to start your wellness journey.'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] rounded-xl focus:outline-none focus:border-[#00d4c8] focus:bg-[rgba(255,255,255,0.05)] transition-all text-white placeholder-gray-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-500" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-12 pr-4 py-3.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] rounded-xl focus:outline-none focus:border-[#00d4c8] focus:bg-[rgba(255,255,255,0.05)] transition-all text-white placeholder-gray-500"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full pl-12 pr-4 py-3.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] rounded-xl focus:outline-none focus:border-[#00d4c8] focus:bg-[rgba(255,255,255,0.05)] transition-all text-white placeholder-gray-500"
            />
          </motion.div>

          {isLogin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-end pt-1"
            >
              <button type="button" className="text-sm text-[#00d4c8] hover:text-[#0a84ff] transition-colors">
                Forgot password?
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button 
              whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0,212,200,0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 mt-4 bg-gradient-to-r from-[#00d4c8] to-[#0a84ff] rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-2 group transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00d4c8] hover:text-white font-medium transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
