import { BRAND } from "../../constants";
import { Youtube, Instagram, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        <div className="space-y-0.5">
          <h3 className="font-display font-black text-2xl tracking-tighter">{BRAND.logoText}</h3>
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">{BRAND.tagline}</p>
        </div>
        
        <div className="pt-4 space-y-4">
          <div className="flex justify-center gap-6 text-white/30 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <span className="text-white/10">|</span>
            <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
          </div>
          <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest leading-loose">
            © 2026 {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
