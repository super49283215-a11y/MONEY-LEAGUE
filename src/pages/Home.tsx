import { motion } from "motion/react";
import { Trophy, Users, Zap, ArrowRight, ShieldCheck, Youtube, Star, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-0 space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A30]/50 via-[#050A30] to-[#050A30]" />
          <img 
            src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Stadium"
          />
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 glass rounded-full text-xs font-black tracking-[0.2em] uppercase text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            FC MOBILE ULTIMATE LEAGUE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter leading-[0.9]"
          >
            BECOME THE <br/>
            <span className="text-gradient">NEW LEGEND</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center pt-8"
          >
            <a 
              href="https://open.kakao.com/o/glBaXr9h" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-white text-[#050A30] font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
            >
              Join the League <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Official Sponsors */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black tracking-[0.3em] text-white/30 uppercase">Official Sponsors</h2>
          <div className="h-0.5 w-16 bg-white/20 mx-auto rounded-full" />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
          {[
            { name: "NEXON", url: "https://forum.nexon.com/fcmobile/", icon: ShieldCheck },
            { name: "영미터", url: "https://www.youtube.com/@%EC%98%81%EB%AF%B8%ED%84%B0", icon: Youtube },
            { name: "이원상", url: "https://www.youtube.com/@%EC%9D%B4%EC%9B%90%EC%83%81", icon: Star },
            { name: "SODA", url: "https://www.youtube.com/@SODA_", icon: Zap },
            { name: "청춘갈비", url: "#", icon: Flame },
          ].map((sponsor, i) => (
            <motion.a 
              key={i} 
              href={sponsor.url} 
              target="_blank" 
              rel="noreferrer"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05, textShadow: "0 0 15px rgba(255,255,255,0.5)" }}
              className="flex items-center gap-3 text-xl md:text-2xl font-display font-black tracking-tighter text-white hover:text-white transition-all duration-300"
            >
              <sponsor.icon size={22} className="text-white group-hover:text-white" />
              {sponsor.name}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Trophy, title: "풍성한 상금", desc: "매 시즌 넥슨지원 그리고 후원으로 풍성한 상금이 지급됩니다." },
          { icon: Users, title: "공정한 진행", desc: "감독님들이 경기에만 집중할 수 있게 공정하고, 객관적인 진행을 보장합니다." },
          { icon: Zap, title: "LIVE 생중계", desc: "4강/결승 FC MOBILE 인플루언서, 전문 해설진과 함께 LIVE 생중계 됩니다." },
        ].map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 glass rounded-2xl space-y-4 border border-white/5"
          >
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-xl">
              <f.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="text-white/50 leading-relaxed font-light">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
