import { useState, FormEvent, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { motion } from "motion/react";
import { LayoutDashboard, FileText, Settings, Plus, Trash2, Edit3, Save, X, Power } from "lucide-react";
import { NewsPost } from "../types";
import { auth, signInWithGoogle, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Admin() {
  const { posts, addPost, deletePost, updatePost, loading } = useCMS();
  const [activeTab, setActiveTab] = useState<"posts" | "settings">("posts");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const [formData, setFormData] = useState<Omit<NewsPost, "id" | "date" | "category">>({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        // Check if user is in admins collection
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        setIsAdmin(adminDoc.exists());
      } else {
        setIsAdmin(false);
      }
      setCheckingAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
      alert("로그인에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addPost(formData);
      setFormData({ title: "", content: "", imageUrl: "" });
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("게시글 업로드 실패");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updatePost(id, formData);
      setEditingId(null);
      setFormData({ title: "", content: "", imageUrl: "" });
    } catch (error) {
      console.error(error);
      alert("수정 실패");
    }
  };

  const startEditing = (post: NewsPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl || "",
    });
    setIsAdding(true);
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A30]">
        <div className="animate-pulse text-white/40 font-display font-black text-2xl uppercase tracking-tighter">
          Verifying Admin...
        </div>
      </div>
    );
  }

  if (!authUser || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A30] px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-10 glass rounded-3xl border border-white/10 space-y-8 text-center">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Settings className="text-white/40" size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-display font-black tracking-tighter uppercase">ADMIN ACCESS</h1>
              {authUser && !isAdmin ? (
                <p className="text-red-400 text-sm font-bold">승인된 관리자 계정이 아닙니다.<br/><span className="text-white/40 font-normal">관리자 권한이 필요합니다.</span></p>
              ) : (
                <p className="text-white/40 text-sm">머니리그 관리자 대시보드에 접속합니다.</p>
              )}
            </div>
          </div>
          
          <button 
            onClick={authUser ? handleLogout : handleLogin}
            className="w-full py-4 bg-white text-[#050A30] font-bold rounded-xl transition-all hover:bg-gray-200 flex items-center justify-center gap-3"
          >
            {authUser ? "로그아웃" : "구글 계정으로 로그인"}
          </button>
          
          {authUser && !isAdmin && (
            <p className="text-[10px] text-white/20 uppercase tracking-widest break-all">
              UID: {authUser.uid}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 flex flex-col md:flex-row bg-[#050A30]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 p-6 flex flex-col gap-2">
        <div className="mb-8 px-4 py-3 glass rounded-xl border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Authenticated as</p>
          <p className="text-sm font-bold truncate text-white">{authUser.displayName || authUser.email}</p>
        </div>
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
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 w-full hover:bg-red-400/10 rounded-xl transition-all">
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
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">제목</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none"
                    />
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
              {loading ? (
                <div className="text-center py-12 text-white/20 uppercase tracking-widest font-bold">Loading Posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12 glass rounded-3xl border border-white/5 text-white/20 uppercase tracking-widest font-bold">No posts found</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="p-6 glass rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4 items-center w-full">
                      <div className="w-16 h-16 rounded-xl overflow-hidden glass shrink-0">
                        <img src={post.imageUrl || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" alt="" />
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
                ))
              )}
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
