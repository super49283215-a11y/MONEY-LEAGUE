export interface NewsPost {
  id: string;
  title: string;
  content: string;
  category: "공지사항" | "뉴스";
  date: string;
  imageUrl?: string;
  authorId?: string;
  authorName?: string;
}

export interface LeagueInfoData {
  rules: string[];
  prizePool: string;
  howToJoin: string;
}

export interface SiteSettings {
  primaryColor: string;
  logoText: string;
  heroTitle: string;
  heroSubtitle: string;
}
