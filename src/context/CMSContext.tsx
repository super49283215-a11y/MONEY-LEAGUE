import React, { createContext, useContext, useState, useEffect } from "react";
import { NewsPost } from "../types";
import { db, auth } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp
} from "firebase/firestore";

interface CMSContextType {
  posts: NewsPost[];
  addPost: (post: Omit<NewsPost, "id" | "date">) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, post: Partial<NewsPost>) => Promise<void>;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate()?.toLocaleDateString() || new Date().toLocaleDateString(),
      })) as NewsPost[];
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async (postData: Omit<NewsPost, "id" | "date" | "category">) => {
    if (!auth.currentUser) throw new Error("Authentication required");
    
    await addDoc(collection(db, "posts"), {
      ...postData,
      category: "게시판", // Default category
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || "익명",
      createdAt: serverTimestamp(),
    });
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
  };

  const updatePost = async (id: string, postUpdate: Partial<NewsPost>) => {
    await updateDoc(doc(db, "posts", id), postUpdate);
  };

  return (
    <CMSContext.Provider value={{ posts, addPost, deletePost, updatePost, loading }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
}
