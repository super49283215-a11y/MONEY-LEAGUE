import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BRAND, NAVIGATION } from "../../constants";
import { Menu, X, ChevronRight, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 left-0 w-full z-50 glass border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center rounded-lg shadow-lg transition-transform flex-shrink-0"
            >
              <span className="text-[#050A30] font-display font-black text-lg md:text-xl">M</span>
            </motion.div>
            <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-white/80 transition-colors whitespace-nowrap">
              {BRAND.logoText}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-10">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`text-sm font-black tracking-[0.2em] transition-all hover:text-white relative pb-1 ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Instagram & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <div className="hidden md:flex items-center">
            <a 
              href={BRAND.social.instagram} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 glass rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav - Dropdown Half Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "50vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#050A30] border-b border-white/10 overflow-y-auto"
          >
            <div className="p-8 flex flex-col gap-6">
              {NAVIGATION.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black tracking-tighter text-white border-b border-white/5 pb-4 flex justify-between items-center group"
                >
                  {item.name}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <ChevronRight className="text-white/20" size={24} />
                  </motion.div>
                </Link>
              ))}

              {/* Mobile Instagram */}
              <div className="pt-4 flex justify-center">
                <a 
                  href={BRAND.social.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-4 glass rounded-2xl text-white flex items-center justify-center gap-3 w-full font-bold uppercase tracking-widest text-sm"
                >
                  <Instagram size={20} /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
