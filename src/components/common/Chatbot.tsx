"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  propertyId?: string;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Hi! I am the UrbanArch AI assistant. How can I help you find your dream home in Mumbai today? ✨',
  sender: 'bot',
  timestamp: new Date()
};

const SUGGESTED_QUESTIONS = [
  "Show me luxury apartments in South Mumbai",
  "Recommend units under ₹5 Cr",
  "Best investment properties in Thane",
  "What is UrbanArch AI?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const userText = textOverride || inputValue;
    
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages.slice(-10), userMsg];
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();
      
      let rawText = data.message || "I'm having trouble connecting right now.";
      let propertyId: string | undefined;

      const propertyMatch = rawText.match(/\[PROPERTY:\s*(.+?)\s*\]/i);
      if (propertyMatch) {
        propertyId = propertyMatch[1].trim().toLowerCase();
        rawText = rawText.replace(/\[PROPERTY:\s*.+?\s*\]/gi, "").trim();
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: rawText,
        sender: 'bot',
        timestamp: new Date(),
        propertyId: propertyId
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, my AI systems are temporarily offline. Please use WhatsApp for urgent queries.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-primary-100 flex flex-col z-[100] overflow-hidden backdrop-blur-xl"
            style={{ height: '550px', maxHeight: '80vh' }}
          >
            {/* AI Header with Gradient Overlay */}
            <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white p-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 z-10">
                <div className="relative">
                  <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                    <Sparkles className="h-5 w-5 text-primary-200 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-primary-950 rounded-full animate-pulse shadow-sm"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white/95">UrbanArch AI</h3>
                  <p className="text-[10px] text-primary-200/80 font-medium tracking-wide">Assistant is online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white bg-white/0 hover:bg-white/10 p-2 rounded-xl transition-all z-10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area with Subtle Grid Pattern */}
            <div className="flex-1 overflow-y-auto p-5 bg-[#fcfcfd] flex flex-col gap-6 relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[92%]", 
                    msg.sender === 'user' ? "flex-row-reverse ml-auto" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-muted border-primary-100" 
                      : "bg-primary-900 border-primary-800 text-white"
                  )}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-primary-950" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={cn("flex flex-col gap-1.5 min-w-0", msg.sender === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                      msg.sender === 'user' 
                        ? "bg-primary-900 text-white rounded-tr-sm" 
                        : "bg-white border border-primary-50 text-foreground rounded-tl-sm font-medium"
                    )}>
                      {msg.text}
                    </div>
                    
                    {msg.propertyId && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-1"
                      >
                        <Link 
                          href={`/property/${msg.propertyId}`} 
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-900 to-primary-800 text-white px-5 py-2.5 rounded-2xl font-bold hover:shadow-[0_10px_20px_-5px_rgba(20,20,40,0.3)] active:scale-95 transition-all text-[11px] group"
                          onClick={() => setIsOpen(false)}
                        >
                           Examine Property
                           <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-primary-50/30">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      onClick={() => handleSend(undefined, q)}
                      className="text-[11px] font-bold text-primary-900 bg-white border border-primary-100 px-4 py-2.5 rounded-2xl hover:bg-primary-900 hover:text-white hover:border-primary-900 transition-all shadow-sm active:scale-95 text-left"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary-900 flex items-center justify-center text-white shadow-md animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-primary-50 rounded-tl-sm flex items-center gap-3 text-muted-foreground shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-[10px] font-bold text-primary-900 tracking-wider">AI THINKING</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input Area */}
            <div className="p-5 bg-white border-t border-primary-50/50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="bg-muted/30 border-primary-50 focus-visible:ring-2 focus-visible:ring-primary-900/10 rounded-2xl pl-5 py-6 text-sm transition-all placeholder:text-muted-foreground/60"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-primary-900 hover:bg-black rounded-2xl shrink-0 shadow-lg shadow-black/10 w-12 h-12 transition-all active:scale-95"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magical Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 z-50 group"
          aria-label="Ask AI Assistant"
        >
          {/* Pulsing Outer Glow */}
          <div className="absolute inset-x-0 -inset-y-2 bg-primary-900 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white rounded-[24px] p-4 shadow-2xl flex items-center justify-center w-16 h-16 border border-white/10 overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)]">
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Sparkles className="w-7 h-7 text-primary-200" />
            </motion.div>
            
            {/* Invisible expanded hit area for label hover */}
            <div className="absolute -top-12 right-0 bg-primary-950 text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none uppercase tracking-widest leading-none">
               UrbanArch AI
            </div>
          </div>
        </motion.button>
      )}
    </>
  );
}
