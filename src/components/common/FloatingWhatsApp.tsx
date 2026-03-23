"use client"

import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20UrbanArch%2C%0AI'd%20like%20to%20know%20more%20about%20the%20properties%20available%20in%20Mumbai.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3.5 shadow-lg flex items-center justify-center w-14 h-14"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-full h-full" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
