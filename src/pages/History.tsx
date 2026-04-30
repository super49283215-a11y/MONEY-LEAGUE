import { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Users, Sword } from "lucide-react";

const HISTORY_DATA = [
  {
    edition: "4th MONEY LEAGUE",
    winner: "현질팸",
    members: ["취미는레알단일", "취미는레알인뎅", "취미는쿵쿵따", "Scholes", "흑토마"],
    matchLeft: { top: "SODA", bottom: "Maestro", boldSide: "top" },
    matchRight: { top: "현질팸", bottom: "승부사", boldSide: "top" },
    color: "from-amber-400/20"
  },
  {
    edition: "3rd MONEY LEAGUE",
    winner: "톰과제리",
    members: ["우서장", "호수", "다닝뇨", "호검", "호우"],
    matchLeft: { top: "Maestro", bottom: "뚝배기원상대", boldSide: "bottom" },
    matchRight: { top: "톰과제리", bottom: "현질팸", boldSide: "top" },
    color: "from-blue-400/20"
  },
  {
    edition: "2nd MONEY LEAGUE",
    winner: "Maestro",
    members: ["Beelzunu", "Beelzebul", "둥글게둥글게", "가을", "Ahina"],
    matchLeft: { top: "현질팸", bottom: "처음처럼", boldSide: "top" },
    matchRight: { top: "Maestro", bottom: "UEFA단일", boldSide: "top" },
    color: "from-purple-400/20"
  },
  {
    edition: "1st MONEY LEAGUE",
    winner: "뚝배기원상대",
    members: ["범자", "이원상", "bosque", "그냥만들었다"],
    color: "from-green-400/20"
  }
];

export default function History() {
  const [hoveredTrophy, setHoveredTrophy] = useState<number | null>(null);
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter">HISTORY</h1>
        <p className="text-white/40 font-light text-lg">머니리그의 찬란한 역사를 기록합니다.</p>
      </section>
      
      <div className="flex flex-col gap-16">
        {HISTORY_DATA.map((league, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden glass rounded-[3rem] border border-white/5 p-8 md:p-14 group hover:border-white/20 transition-all`}
          >
            {/* Background Glow */}
            <div className={`absolute -top-32 -right-32 w-full h-[200%] bg-gradient-to-br ${league.color} to-transparent blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />
            
            <div className="relative z-10 flex flex-col gap-12">
              {/* Header: Edition Info */}
              <div className="space-y-4">
                <span className="font-mono text-sm font-black tracking-[0.5em] text-white/10 uppercase block italic border-b border-white/5 pb-4">
                  {league.edition}
                </span>

                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                  {/* Winner Block */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/30">
                      <Trophy size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Winner</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-amber-400/10 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.05)]">
                        <Trophy className="text-amber-400" size={32} />
                      </div>
                      <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white">
                        {league.winner}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Roster Block */}
                  <div className="space-y-4 flex-1 md:max-w-md">
                    <div className="flex items-center gap-2 text-white/30">
                      <Users size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Winning Roster</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {league.members.map((member, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white/5 rounded-xl text-sm text-white/70 font-bold border border-white/5 whitespace-nowrap">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bracket Visualization */}
              {league.matchLeft && (
                <div className="pt-10 border-t border-white/5">
                  <div className="flex items-center justify-center gap-4 md:gap-16">
                    {/* Match 1 */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <span className={`text-sm md:text-lg font-black transition-colors ${league.matchLeft.boldSide === 'top' ? 'text-white' : 'text-white/30'}`}>
                         {league.matchLeft.top}
                       </span>
                       <div className="flex flex-col items-center">
                         <div className="h-4 w-px bg-white/10" />
                         <span className="font-mono text-[10px] font-black italic text-white/10 my-1">VS</span>
                         <div className="h-4 w-px bg-white/10" />
                       </div>
                       <span className={`text-sm md:text-lg font-black transition-colors ${league.matchLeft.boldSide === 'bottom' ? 'text-white' : 'text-white/30'}`}>
                         {league.matchLeft.bottom}
                       </span>
                    </div>

                    {/* Center Trophy with Hover Effect */}
                    <motion.div 
                      onMouseEnter={() => setHoveredTrophy(i)}
                      onMouseLeave={() => setHoveredTrophy(null)}
                      whileHover={{ scale: 1.1 }}
                      className="p-4 md:p-6 glass rounded-full border border-amber-400/30 bg-amber-400/5 shadow-[0_0_30px_rgba(251,191,36,0.1)] shrink-0 min-w-[80px] md:min-w-[120px] h-[80px] md:h-[120px] flex items-center justify-center cursor-help transition-all duration-300 overflow-hidden"
                    >
                      {hoveredTrophy === i ? (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-amber-400 font-display font-black text-xs md:text-sm whitespace-nowrap text-center px-2"
                        >
                          {league.winner}
                        </motion.span>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Trophy size={32} className="text-amber-400" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Match 2 */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                       <span className={`text-sm md:text-lg font-black transition-colors ${league.matchRight?.boldSide === 'top' ? 'text-white' : 'text-white/30'}`}>
                         {league.matchRight?.top}
                       </span>
                       <div className="flex flex-col items-center">
                         <div className="h-4 w-px bg-white/10" />
                         <span className="font-mono text-[10px] font-black italic text-white/10 my-1">VS</span>
                         <div className="h-4 w-px bg-white/10" />
                       </div>
                       <span className={`text-sm md:text-lg font-black transition-colors ${league.matchRight?.boldSide === 'bottom' ? 'text-white' : 'text-white/30'}`}>
                         {league.matchRight?.bottom}
                       </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
