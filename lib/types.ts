export interface Project {
  _id: string;
  title: string;
  slug: { current: string } | string;
  description: string;
  content?: unknown[];
  coverImage?: unknown;
  coverImageUrl?: string;
  techStack: string[];
  category: 'Web App' | 'AI Project' | 'Automation' | 'Full Stack' | 'Open Source' | string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
  highlights?: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Automation' | 'Database' | 'Deployment' | string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  order?: number;
}

export interface AboutData {
  _id?: string;
  role: string;
  pitch: string;
  bio: unknown;
  location: string;
  profileImage?: unknown;
  profileImageUrl?: string;
  resumeUrl?: string;
  focusAreas?: string[];
}
