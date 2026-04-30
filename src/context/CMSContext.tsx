import React, { createContext, useContext, useState, useEffect } from "react";
import { NewsPost } from "../types";

interface CMSContextType {
  posts: NewsPost[];
  addPost: (post: Omit<NewsPost, "id" | "date">) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, post: Partial<NewsPost>) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const INITIAL_POSTS: NewsPost[] = [
  {
    id: "1",
    title: "제1회 MONEY LEAGUE 개최 안내",
    content: "총 상금 1,000,000원! FC MOBILE 최강자를 가리는 첫 번째 머니 리그가 시작됩니다. 지금 바로 참가 신청하세요.",
    category: "공지사항",
    date: new Date().toLocaleDateString(),
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "FC MOBILE 최신 전술 가이드: 4-3-3 홀딩",
    content: "현 메타에서 가장 안정적인 4-3-3 홀딩 전술의 상세 설정과 선수 기용 팁을 공개합니다.",
    category: "가이드",
    date: new Date().toLocaleDateString(),
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
  },
];

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem("ml_posts");
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  useEffect(() => {
    localStorage.setItem("ml_posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: Omit<NewsPost, "id" | "date">) => {
    const newPost: NewsPost = {
      ...postData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const updatePost = (id: string, postUpdate: Partial<NewsPost>) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...postUpdate } : p)));
  };

  return (
    <CMSContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
}
