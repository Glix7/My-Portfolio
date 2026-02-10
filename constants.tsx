
import { BlogPost, Stat } from './types';

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Works', path: '/works' },
];

export const HERO_STATS: Stat[] = [
  { label: 'CGPA', value: '8.3', plus: false },
  { label: 'Live Projects', value: '3', plus: true },
  { label: 'Certifications', value: '4', plus: false },
  { label: 'Tech Stack', value: '15', plus: true },
];

const BLOG_IMAGE = "https://images.unsplash.com/photo-1499750310159-52f0f837ce62?q=80&w=2070&auto=format&fit=crop";

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Leveraging Gemini API for Career Growth Apps',
    category: 'AI Development',
    date: 'Mar 15, 2024',
    image: BLOG_IMAGE,
    excerpt: 'How integrating Google Gemini API can transform standard career portals into intelligent coaching platforms.'
  },
  {
    id: '2',
    title: 'Building Scalable AI Apps with Next.js 15',
    category: 'Web Dev',
    date: 'Feb 10, 2024',
    image: BLOG_IMAGE,
    excerpt: 'Exploring the new features of Next.js 15 and how they benefit AI-driven application performance.'
  }
];
