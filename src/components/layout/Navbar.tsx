import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { BRAND, NAVIGATION } from "../../constants";
import { Menu, X, ChevronRight, Youtube, Instagram, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="w-10 h-10 bg-white flex items-center justify-center rounded-lg shadow-lg"
          >
            <span className="text-[#050A30] font-display font-black text-xl">M</span>
          </motion.div>
          <span className="font-display font-black text-2xl tracking-tighter">
            {BRAND.logoText}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`text-sm font-bold tracking-widest transition-all hover:text-white ${
                  isActive ? "text-white" : "text-white/70"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="h-1 bg-white mt-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden fixed inset-0 top-[72px] bg-[#050A30] z-50 p-8 flex flex-col gap-6 shadow-2xl h-fit border-b border-white/20"
        >
          {NAVIGATION.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black tracking-tighter text-white border-b border-white/10 pb-4 flex justify-between items-center group"
            >
              {item.name}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <ChevronRight className="text-white/20" size={32} />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
