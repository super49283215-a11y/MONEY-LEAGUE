import { motion, AnimatePresence } from "motion/react";
import { useCMS } from "../context/CMSContext";
import { Calendar, ChevronRight, X, ArrowLeft, PenSquare } from "lucide-react";
import { useState } from "react";
import { NewsPost } from "../types";

export default function News() {
  const { posts, loading } = useCMS();
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white/20 font-display font-black text-4xl uppercase tracking-tighter">
          Loading News...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-12">
      <section className="border-b border-white/10 pb-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase">NEWS</h1>
          <p className="text-white/40 font-light text-lg">머니리그의 최신 소식과 정보를 확인하세요.</p>
        </div>
      </section>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedPost(post)}
            className="group glass rounded-[32px] overflow-hidden border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all flex flex-col h-full cursor-pointer"
          >
            {post.imageUrl && (
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A30] to-transparent opacity-40" />
              </div>
            )}
            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <span className="text-white/20">{(post as any).authorName || "Admin"}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-white/40 text-sm font-light line-clamp-3 leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center text-xs font-black text-white/20 group-hover:text-white transition-all uppercase tracking-[0.2em] gap-1">
                Read Full Entry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-32 text-center glass rounded-[40px] border border-dashed border-white/10 bg-white/[0.01]">
          <p className="text-white/20 font-light italic text-xl tracking-tighter">등록된 뉴스가 없습니다.</p>
        </div>
      )}

      {/* Post Detail Drawer/Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-12 md:p-24"
          >
            <div 
              className="absolute inset-0 bg-[#050A30]/95 backdrop-blur-3xl" 
              onClick={() => setSelectedPost(null)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl h-full max-h-[90vh] bg-[#050A30] glass rounded-[48px] border border-white/10 overflow-hidden flex flex-col shadow-[0_100px_200px_rgba(0,0,0,0.8)]"
            >
              <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> BACK TO NEWS
                </button>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-3 glass rounded-full hover:bg-white/10 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 md:p-20 space-y-12 custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-[1.1]">
                      {selectedPost.title}
                    </h2>
                    <div className="flex items-center gap-6 text-sm text-white/40 border-t border-b border-white/5 py-6">
                       <div className="flex items-center gap-2 font-bold tracking-widest">
                         <Calendar size={18} className="text-white/20" />
                         {selectedPost.date}
                       </div>
                       <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-[10px] text-white/20">
                            {(selectedPost as any).authorName?.[0] || 'A'}
                         </div>
                         <span className="font-bold tracking-widest uppercase">{(selectedPost as any).authorName || "Admin"}</span>
                       </div>
                    </div>
                  </div>

                  {selectedPost.imageUrl && (
                    <div className="aspect-[16/9] w-full rounded-[40px] overflow-hidden glass border border-white/10 shadow-2xl">
                      <img 
                        src={selectedPost.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt={selectedPost.title} 
                      />
                    </div>
                  )}

                  <div className="text-white/70 leading-[1.8] text-xl md:text-2xl whitespace-pre-wrap font-light">
                    {selectedPost.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
