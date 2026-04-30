import { motion } from "motion/react";
import { Trophy, Target, ShieldCheck, HelpCircle } from "lucide-react";

export default function LeagueInfo() {
  return (
    <div className="pt-32 pb-24 px-6 space-y-24 max-w-7xl mx-auto">
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-extrabold"
        >
          LEAGUE INFO
        </motion.h1>
        <p className="text-white/60 max-w-2xl mx-auto font-light">
          머니리그는 FC MOBILE 유저들을 위한 전문 경쟁 플랫폼입니다. <br/>
          누구나 공정한 환경에서 최고의 자리에 도전할 수 있습니다.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Rules */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold underline decoration-white/20 underline-offset-8">리그 규칙</h2>
          </div>
          <div className="space-y-4">
            {[
              "경기 모드: 일반 모드(Head to Head) 기반 정식 토너먼트",
              "팀 오버롤 제한: 해당 시즌 공지에 따라 매 시즌 변동",
              "비매너 행위: 시간 끌기, 비속어 사용 시 즉시 몰수패 및 영구 제명",
              "네트워크: 원활한 경기를 위해 WI-FI 환경 권장",
            ].map((rule, i) => (
              <div key={i} className="p-5 glass rounded-xl border border-white/5 flex items-start gap-4">
                <span className="text-white/20 font-display font-bold">0{i+1}</span>
                <p className="text-white/80 font-light">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prize & Join */}
        <div className="space-y-12">
          <section className="space-y-8 p-8 glass rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                <Trophy className="text-yellow-400" size={20} />
              </div>
              <h2 className="text-2xl font-bold">상금 규모</h2>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-display font-extrabold text-gradient">₩1,000,000</p>
              <p className="text-white/40 text-sm">총 상금 규모 (우선 시즌 기준)</p>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-xs text-white/40 uppercase tracking-tighter">1st Place</p>
                <p className="font-bold">₩500,000</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/40 uppercase tracking-tighter">2nd Place</p>
                <p className="font-bold">₩300,000</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/40 uppercase tracking-tighter">3rd Place</p>
                <p className="font-bold">₩200,000</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                <Target className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold italic">참가 방법</h2>
            </div>
            <ol className="space-y-4">
              {[
                "머니리그 공식 디스코드 채널 입장",
                "참가 신청 탭에서 구글 폼 작성",
                "선수 선발 안내 확인 및 단톡방 참여",
                "지정된 일정에 맞춰 경기 진행",
              ].map((step, i) => (
                <li key={i} className="flex gap-4 items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-[#050A30] flex items-center justify-center text-[10px] font-bold">
                    {i+1}
                  </div>
                  <p className="text-white/60 font-light text-sm">{step}</p>
                </li>
              ))}
            </ol>
            <button className="w-full py-4 glass rounded-xl font-bold hover:bg-white/10 transition-all">
              디스코드 채널 바로가기
            </button>
          </section>
        </div>
      </div>

      {/* FAQ */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">자주 묻는 질문</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "참가비가 있나요?", a: "아니요, 머니리그 모든 경기는 참가비 없이 무료로 진행됩니다." },
            { q: "모바일 기기 제한이 있나요?", a: "기기 제한은 없으나 원활한 게임 구동이 가능한 스펙을 권장합니다." },
            { q: "상금 지급 방식은 어떻게 되나요?", a: "리그 종료 후 7일 이내에 본인 명의 계좌로 지급됩니다." },
            { q: "대리 참여가 가능한가요?", a: "불가능합니다. 적발 시 영구 제명 및 상금 회수 조치가 취해집니다." }
          ].map((faq, i) => (
            <div key={i} className="p-6 glass rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <HelpCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Question</span>
              </div>
              <h4 className="text-lg font-bold">Q. {faq.q}</h4>
              <p className="text-white/50 text-sm font-light leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
