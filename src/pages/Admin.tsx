import { useState, FormEvent } from "react";
import { useCMS } from "../context/CMSContext";
import { motion } from "motion/react";
import { LayoutDashboard, FileText, Settings, Plus, Trash2, Edit3, Save, X, Power } from "lucide-react";
import { NewsPost } from "../types";

export default function Admin() {
  const { posts, addPost, deletePost, updatePost } = useCMS();
  const [activeTab, setActiveTab] = useState<"posts" | "settings">("posts");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pw, setPw] = useState("");

  const [formData, setFormData] = useState<Omit<NewsPost, "id" | "date">>({
    title: "",
    content: "",
    category: "공지사항",
    imageUrl: "",
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pw === "admin") setIsAuthenticated(true);
    else alert("비밀번호가 틀렸습니다. (힌트: admin)");
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ title: "", content: "", category: "공지사항", imageUrl: "" });
    setIsAdding(false);
  };

  const handleUpdate = (id: string) => {
    const postToEdit = posts.find((p) => p.id === id);
    if (!postToEdit) return;
    updatePost(id, formData);
    setEditingId(null);
    setFormData({ title: "", content: "", category: "공지사항", imageUrl: "" });
  };

  const startEditing = (post: NewsPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl || "",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A30] px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-10 glass rounded-3xl border border-white/10 space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-black tracking-tighter">ADMIN ACCESS</h1>
            <p className="text-white/40 text-sm">머니리그 관리자 대시보드에 접속합니다.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full px-6 py-4 glass rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <button className="w-full py-4 bg-white text-[#050A30] font-bold rounded-xl transition-all hover:bg-gray-200">
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 flex flex-col md:flex-row bg-[#050A30]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 p-6 flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "posts" ? "bg-white/10 text-white font-bold" : "text-white/40 hover:bg-white/5"}`}
        >
          <FileText size={18} /> 게시글 관리
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "settings" ? "bg-white/10 text-white font-bold" : "text-white/40 hover:bg-white/5"}`}
        >
          <Settings size={18} /> 사이트 설정
        </button>
        <div className="mt-auto pt-6 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 px-4 py-3 text-red-400 w-full hover:bg-red-400/10 rounded-xl transition-all">
            <Power size={18} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-5xl mx-auto w-full">
        <header className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight">
              {activeTab === "posts" ? "CMS DASHBOARD" : "SITE SETTINGS"}
            </h2>
            <p className="text-white/40 text-sm">코딩 없이 콘텐츠를 자유롭게 관리하세요.</p>
          </div>
          {activeTab === "posts" && !isAdding && (
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg shadow-green-500/20">
              <Plus size={18} /> 새 게시글
            </button>
          )}
        </header>

        {activeTab === "posts" ? (
          <div className="space-y-6">
            {/* Editor Form */}
            {(isAdding || editingId) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 glass rounded-3xl border border-white/10 space-y-6 mb-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{editingId ? "게시글 수정" : "새 게시글 작성"}</h3>
                  <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white"><X size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">제목</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">카테고리</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none appearance-none"
                    >
                      <option value="공지사항">공지사항</option>
                      <option value="뉴스">뉴스</option>
                      <option value="가이드">가이드</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">내용</label>
                    <textarea 
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">이미지 URL</label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
                    className="flex justify-center items-center gap-2 w-full py-4 bg-white text-[#050A30] font-bold rounded-xl hover:bg-gray-200 transition-all"
                  >
                    <Save size={18} /> {editingId ? "저장하기" : "업로드"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-6 glass rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-4 items-center w-full">
                    <div className="w-16 h-16 rounded-xl overflow-hidden glass shrink-0">
                      <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/40">{post.category}</span>
                        <span className="text-[10px] text-white/20">{post.date}</span>
                      </div>
                      <h4 className="font-bold line-clamp-1">{post.title}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto shrink-0">
                    <button onClick={() => startEditing(post)} className="flex-1 md:flex-none p-3 hover:bg-white/10 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold"><Edit3 size={16}/> 수정</button>
                    <button onClick={() => deletePost(post.id)} className="flex-1 md:flex-none p-3 hover:bg-red-400/10 text-red-400 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold"><Trash2 size={16}/> 삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 glass rounded-3xl border border-white/10 text-center space-y-6">
            <LayoutDashboard size={48} className="mx-auto text-white/20" />
            <h3 className="text-xl font-bold">환경 설정 (개발 예정)</h3>
            <p className="text-white/40 font-light">추후 색상 테마, 로고, 소셜 링크 등을 직접 수정할 수 있는 기능을 추가할 예정입니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
