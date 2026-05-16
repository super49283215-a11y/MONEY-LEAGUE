import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Trophy, Sword, LayoutGrid, ListFilter, Save, Info, Camera, X as CloseIcon } from "lucide-react";

// Types
interface SetResult {
  homePlayer: string;
  awayPlayer: string;
  homeScore: number;
  awayScore: number;
  winner: "home" | "away" | null;
}

interface MatchRecord {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  sets: SetResult[];
  isCompleted: boolean;
  screenshots: string[]; // Base64 strings
}

interface TeamStats {
  rank: number;
  team: string;
  played: number;
  points: number;
  wins: number;
  losses: number;
  gw: number; // Games Won (sets)
  gl: number; // Games Lost (sets)
  gd: number; // Set Difference
}

// Initial Data
const TEAMS = ["현질팸", "뚝배기원상대", "1st", "톰과제리", "Maestro", "SODA"];

const generateInitialMatches = () => {
  const matches: MatchRecord[] = [];
  let idCount = 1;
  for (let i = 0; i < TEAMS.length; i++) {
    for (let j = i + 1; j < TEAMS.length; j++) {
      matches.push({
        id: `M${idCount++}`,
        homeTeam: TEAMS[i],
        awayTeam: TEAMS[j],
        homeScore: 0,
        awayScore: 0,
        isCompleted: false,
        screenshots: [],
        sets: Array.from({ length: 5 }, () => ({
          homePlayer: "",
          awayPlayer: "",
          homeScore: 0,
          awayScore: 0,
          winner: null,
        })),
      });
    }
  }
  return matches;
};

export default function Match() {
  const [activeView, setActiveView] = useState<"standings" | "list" | "detail">("standings");
  const [matches, setMatches] = useState<MatchRecord[]>(() => {
    const saved = localStorage.getItem("money_league_matches");
    return saved ? JSON.parse(saved) : generateInitialMatches();
  });
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem("money_league_matches", JSON.stringify(matches));
  }, [matches]);

  // Derived Standings
  const standings = useMemo(() => {
    const statsMap: Record<string, TeamStats> = {};
    TEAMS.forEach((team) => {
      statsMap[team] = { rank: 0, team, played: 0, points: 0, wins: 0, losses: 0, gw: 0, gl: 0, gd: 0 };
    });

    matches.forEach((m) => {
      if (!m.isCompleted) return;

      const home = statsMap[m.homeTeam];
      const away = statsMap[m.awayTeam];

      home.played += 1;
      away.played += 1;

      // Sets calculation
      home.gw += m.homeScore;
      home.gl += m.awayScore;
      away.gw += m.awayScore;
      away.gl += m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.wins += 1;
        home.points += 3;
        away.losses += 1;
      } else {
        away.wins += 1;
        away.points += 3;
        home.losses += 1;
      }
    });

    return Object.values(statsMap)
      .map((s) => ({ ...s, gd: s.gw - s.gl }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gw - a.gw;
      })
      .map((s, i) => ({ ...s, rank: i + 1 }));
  }, [matches]);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  const handleSaveMatch = (matchId: string, updatedSets: SetResult[], screenshots: string[]) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          const homeWins = updatedSets.filter((s) => s.winner === "home").length;
          const awayWins = updatedSets.filter((s) => s.winner === "away").length;
          return {
            ...m,
            sets: updatedSets,
            homeScore: homeWins,
            awayScore: awayWins,
            isCompleted: true,
            screenshots: screenshots,
          };
        }
        return m;
      })
    );
    setActiveView("list");
  };

  return (
    <div className="pt-8 pb-24 px-4 md:px-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-white">MATCH</h1>
          <p className="text-white/40 font-light text-sm md:text-base">모든 결과는 실시간으로 순위표에 반영됩니다.</p>
        </div>

        {activeView !== "detail" && (
          <div className="flex p-1 glass rounded-2xl border border-white/10 w-fit">
            <button
              onClick={() => setActiveView("standings")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                activeView === "standings" ? "bg-white text-[#050A30] shadow-lg" : "text-white/50 hover:text-white"
              }`}
            >
              <LayoutGrid size={16} /> 순위표
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest ${
                activeView === "list" ? "bg-white text-[#050A30] shadow-lg" : "text-white/50 hover:text-white"
              }`}
            >
              <ListFilter size={16} /> 경기 일정
            </button>
          </div>
        )}
      </section>

      <AnimatePresence mode="wait">
        {activeView === "standings" && (
          <motion.div
            key="standings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-[0.2em] px-2">
              <Trophy size={14} className="text-yellow-500" /> Group A Standings
            </div>
            
            <div className="overflow-x-auto glass rounded-3xl border border-white/10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-white/50">
                    <th className="px-6 py-5">순위</th>
                    <th className="px-6 py-5">클랜</th>
                    <th className="px-6 py-5 text-center">경기</th>
                    <th className="px-6 py-5 text-center">승점</th>
                    <th className="px-6 py-5 text-center">승</th>
                    <th className="px-6 py-5 text-center">패</th>
                    <th className="px-6 py-5 text-center text-white/30 italic">GW</th>
                    <th className="px-6 py-5 text-center text-white/30 italic">GL</th>
                    <th className="px-6 py-5 text-center text-white font-bold underline decoration-white/20 underline-offset-4">GD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {standings.map((s, idx) => (
                    <tr 
                      key={s.team} 
                      className={`group transition-all hover:bg-white/5 ${
                        idx < 2 ? "bg-white/5" : ""
                      }`}
                    >
                      <td className="px-6 py-5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black ${
                          idx === 0 ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30" :
                          idx === 1 ? "bg-white/20 text-white border border-white/30" :
                          "text-white/40"
                        }`}>
                          {s.rank}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${idx < 2 ? "bg-green-500" : "bg-white/10"}`} title={idx < 2 ? "8강 진출권" : ""} />
                          <span className={`font-bold transition-colors ${idx < 2 ? "text-white" : "text-white/70"}`}>
                            {s.team}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center font-mono font-bold text-white/60">{s.played}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 bg-white text-[#050A30] font-black rounded-full text-xs">
                          {s.points}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-green-400/80">{s.wins}</td>
                      <td className="px-6 py-5 text-center font-bold text-red-400/80">{s.losses}</td>
                      <td className="px-6 py-5 text-center text-white/30 font-medium">{s.gw}</td>
                      <td className="px-6 py-5 text-center text-white/30 font-medium">{s.gl}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`font-black text-lg ${s.gd > 0 ? "text-white" : s.gd < 0 ? "text-white/20" : "text-white/40"}`}>
                          {s.gd > 0 ? `+${s.gd}` : s.gd}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <Info className="text-white/40" size={16} />
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
                상위 2개 클랜은 8강 토너먼트 진출 자격이 주어집니다. (승점 {">"} 득실차 {">"} 승리세트 순)
              </p>
            </div>
          </motion.div>
        )}

        {activeView === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {matches.map((match) => (
              <div 
                key={match.id} 
                className="group glass rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all text-white"
              >
                <div className="p-1 bg-white/5 border-b border-white/5 text-[9px] font-black tracking-[0.3em] uppercase text-white/20 text-center">
                  Full League · Match {match.id.replace('M', '')}
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-center space-y-2">
                      <div className="w-12 h-12 glass rounded-2xl mx-auto flex items-center justify-center font-black text-xl text-white/20 group-hover:text-white/40 transition-colors">
                        {match.homeTeam.charAt(0)}
                      </div>
                      <div className="font-bold text-sm truncate">{match.homeTeam}</div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-3xl font-display font-black tracking-tighter">
                        {match.isCompleted ? `${match.homeScore} : ${match.awayScore}` : "VS"}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${match.isCompleted ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/30"}`}>
                        {match.isCompleted ? "Finished" : "Pending"}
                      </div>
                    </div>

                    <div className="flex-1 text-center space-y-2">
                      <div className="w-12 h-12 glass rounded-2xl mx-auto flex items-center justify-center font-black text-xl text-white/20 group-hover:text-white/40 transition-colors">
                        {match.awayTeam.charAt(0)}
                      </div>
                      <div className="font-bold text-sm truncate">{match.awayTeam}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setActiveView("detail");
                    }}
                    className="w-full py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-[#050A30]"
                  >
                    매칭상세 보기
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeView === "detail" && selectedMatch && (
          <MatchDetailView 
            match={selectedMatch} 
            onBack={() => setActiveView("list")} 
            onSave={(updatedSets, screenshots) => handleSaveMatch(selectedMatch.id, updatedSets, screenshots)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MatchDetailView({ match, onBack, onSave }: { match: MatchRecord; onBack: () => void; onSave: (sets: SetResult[], screenshots: string[]) => void }) {
  const [sets, setSets] = useState<SetResult[]>(match.sets);
  const [screenshots, setScreenshots] = useState<string[]>(match.screenshots || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetChange = (index: number, field: keyof SetResult, value: string | number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleWinnerChange = (index: number, winner: "home" | "away" | null) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], winner };
    setSets(newSets);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshots((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-8 pb-12"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Match List</span>
      </button>

      <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl text-white">
        <div className="p-8 md:p-12 bg-white/5 border-b border-white/5 text-center space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Match Detail Recording</div>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="space-y-4">
              <div className="w-16 h-16 md:w-24 md:h-24 glass rounded-3xl flex items-center justify-center font-black text-3xl md:text-5xl text-white/20">
                {match.homeTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-3xl font-display font-black tracking-tighter">{match.homeTeam}</h2>
            </div>
            <div className="text-4xl md:text-6xl font-display font-black opacity-20">VS</div>
            <div className="space-y-4">
              <div className="w-16 h-16 md:w-24 md:h-24 glass rounded-3xl flex items-center justify-center font-black text-3xl md:text-5xl text-white/20">
                {match.awayTeam.charAt(0)}
              </div>
              <h2 className="text-xl md:text-3xl font-display font-black tracking-tighter">{match.awayTeam}</h2>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-12 space-y-12">
          {/* Screenshots Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="text-white/40" size={18} />
                <h3 className="text-sm font-black uppercase tracking-widest">경기 스크린샷</h3>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 glass rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                이미지 추가
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/*"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {screenshots.map((src, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden glass border border-white/10 group">
                  <img src={src} className="w-full h-full object-cover" alt={`Screenshot ${i + 1}`} />
                  <button 
                    onClick={() => removeScreenshot(i)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CloseIcon size={12} />
                  </button>
                </div>
              ))}
              {screenshots.length === 0 && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-white/20 hover:text-white/40 hover:border-white/20 cursor-pointer transition-all"
                >
                  <Camera size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">이미지 업로드</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sword className="text-white/40" size={18} />
              <h3 className="text-sm font-black uppercase tracking-widest">세트별 상세 결과</h3>
            </div>
            
            <div className="min-w-[800px] space-y-4">
            {sets.map((set, i) => (
              <div key={i} className="grid grid-cols-12 items-center gap-4 p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="col-span-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black italic text-white/30 border border-white/10">
                    S{i + 1}
                  </div>
                </div>

                <div className="col-span-3">
                  <input 
                    type="text" 
                    placeholder={`${match.homeTeam} 선수명`}
                    value={set.homePlayer}
                    onChange={(e) => handleSetChange(i, "homePlayer", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-white outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="col-span-4 flex items-center justify-center gap-3">
                   <input 
                    type="text" 
                    inputMode="numeric"
                    value={set.homeScore}
                    onChange={(e) => handleSetChange(i, "homeScore", parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                    className="w-16 bg-black/60 border border-white/10 rounded-xl px-2 py-3 text-center text-lg font-bold outline-none focus:border-white transition-colors"
                  />
                  <span className="text-white/20 font-black">:</span>
                   <input 
                    type="text" 
                    inputMode="numeric"
                    value={set.awayScore}
                    onChange={(e) => handleSetChange(i, "awayScore", parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                    className="w-16 bg-black/60 border border-white/10 rounded-xl px-2 py-3 text-center text-lg font-bold outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="col-span-3">
                  <input 
                    type="text" 
                    placeholder={`${match.awayTeam} 선수명`}
                    value={set.awayPlayer}
                    onChange={(e) => handleSetChange(i, "awayPlayer", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-white outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="col-span-1 flex justify-end">
                  <select 
                    value={set.winner || ""} 
                    onChange={(e) => handleWinnerChange(i, (e.target.value as "home" | "away") || null)}
                    className="bg-black/80 border border-white/10 rounded-lg py-2 px-3 text-[10px] font-black uppercase tracking-tighter outline-none cursor-pointer hover:bg-white hover:text-black transition-colors"
                  >
                    <option value="">N/A</option>
                    <option value="home">HOME</option>
                    <option value="away">AWAY</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
            <button 
              onClick={() => onSave(sets, screenshots)}
              className="flex items-center gap-3 px-12 py-5 bg-white text-[#050A30] rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all outline-none"
            >
              <Save size={18} /> 결과 저장하기
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
