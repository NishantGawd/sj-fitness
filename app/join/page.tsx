'use client';
import AuthForm from '@/components/AuthForm';
import { motion } from 'framer-motion';

// Since we use motion, this page needs to be a client component

export default function JoinPage() {
  return (
    <div 
      className="min-h-screen bg-black text-white flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580261450048-1b7392683e20?q=80&w=2574&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        <AuthForm />
      </motion.div>
    </div>
  );
}
