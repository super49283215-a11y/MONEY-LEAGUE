import { motion } from "motion/react";
import { useCMS } from "../context/CMSContext";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function News() {
  const { posts } = useCMS();
  const [filter, setFilter] = useState<string>("전체");

  const categories = ["전체", "공지사항", "뉴스", "가이드"];
  const filteredPosts = filter === "전체" ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">NEWS & COMMUNITY</h1>
        <p className="text-white/40 font-light">머니리그의 소식과 최신 정보를 한곳에서 확인하세요.</p>
      </section>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 p-1 glass rounded-xl overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                filter === cat ? "bg-white text-[#050A30]" : "text-white/40 hover:text-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            placeholder="제목이나 내용 검색..." 
            className="w-full pl-12 pr-4 py-3 glass rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={post.imageUrl || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={post.title}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white text-[#050A30] text-[10px] font-black uppercase rounded-full tracking-widest">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 space-y-4">
              <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold tracking-widest uppercase">
                <Calendar size={12} />
                {post.date}
              </div>
              <h3 className="text-xl font-bold leading-tight line-clamp-2">{post.title}</h3>
              <p className="text-white/50 text-sm font-light line-clamp-3 leading-relaxed flex-1">
                {post.content}
              </p>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors pt-4 group">
                자세히 보기 <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-white/20 font-light italic">관련 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
