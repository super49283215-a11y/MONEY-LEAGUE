import { motion } from "motion/react";
import { Trophy, Gamepad2, ShieldCheck, HelpCircle } from "lucide-react";

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
          머니 리그는 FC MOBILE 유저들을 위한 공정하고 박진감 넘치는 경쟁의 장입니다. 아래 규칙과 참가를 위한 상세 정보를 확인하세요.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Rules */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold underline decoration-white/20 underline-offset-8">대회 규칙</h2>
          </div>
          <div className="space-y-4">
            {[
              "모든 경기는 FC MOBILE을 이용하여 조별, 토너먼트를 진행한다.",
              "네트워크 환경으로 인한 튕김은 협의 후 재경기를 진행한다.",
              "비매너 행위(볼돌,무한임티 등)는 적발 즉시 탈락 처리 한다.",
              "대회 세부적인 안내는 추후 조별 리그 오픈톡방에서 안내/확인 한다.",
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
              <p className="text-3xl md:text-5xl font-display font-extrabold text-gradient">NEXON 지원+후원금</p>
              <p className="text-white/40 text-sm">*자세한 내용은 대표자방에 공지</p>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold underline decoration-white/20 underline-offset-8">참가 방법</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white/80 font-bold">MONEY LEAGUE 카카오 오픈톡으로 신청하세요</p>
              <p className="text-white/60 text-sm">카카오톡 공식 오픈톡 입장하기</p>
              <a 
                href="https://open.kakao.com/o/glBaXr9h" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full py-4 glass rounded-xl font-bold hover:bg-white/10 transition-all text-center"
              >
                오픈톡 참여하기
              </a>
            </div>
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
            { q: "참가비가 있나요?", a: "소정의 참가비가 있을수 있습니다." },
            { q: "상금 지급 방식은 어떻게 되나요?", a: "대회 종료 후 30일 이내 FC MOBILE 본인 가입 계정으로 지금됩니다." },
            { q: "대회는 몇일간 진행 되나요?", a: "조별 예선은 5~7일 본선은 방송스케쥴에 따라 2~3일 정도 소요됩니다. 총 대회 기간은 7일~14일 사이입니다." },
            { q: "참가 인원 교체 가능한가요?", a: "정해진 기간내에 참기 인원 교체가 가능합니다." }
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
