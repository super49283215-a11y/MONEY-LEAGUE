import { motion } from "motion/react";

export default function Match() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">MATCH</h1>
        <p className="text-white/40 font-light">진행 중인 토너먼트 대진표와 실시간 스코어를 확인하세요.</p>
      </section>

      <div className="py-24 text-center glass rounded-3xl border border-white/5">
        <p className="text-white/20 font-light italic">현재 예정된 대전이 없거나 준비 중입니다.</p>
      </div>
    </div>
  );
}
