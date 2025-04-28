export interface User {
  id: string;
  name: string;
  role: string;
  group: string;
  avatar?: string;
  backgroundImage?: string;
  bgColor?: string;
  socialLinks: { name: string; url: string }[];
  stats: {
    problems: number;
    submissions: number;
    dedicatedTime: string;
  };
}