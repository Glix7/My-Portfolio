import { RecordModel } from 'pocketbase';

export interface BaseRecord extends RecordModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export interface ProjectModule {
  title: string;
  desc: string;
}

// Define the schema for project data fields independent of the DB record
export interface ProjectSchema {
  title: string;
  category: string;
  year: string;
  image: string; // This will be the filename string from PB
  description: string;
  techStack: string[];
  challenge: string;
  solution: string;
  keyFeatures: string[];
  modules?: ProjectModule[];
  outcome?: string;
  liveUrl?: string;
  repoUrl?: string;
}

// Extend PocketBase's RecordModel to include system fields (id, created, updated)
export interface Project extends BaseRecord, ProjectSchema {}

export interface Profile extends BaseRecord {
  firstName: string;
  lastName: string;
  email: string;
  logoText: string;
  tagline: string;
  footerText: string;
  aboutBio: string;
  about_text: string; 
  button: string; // Custom button text for resume download
  linkedinUrl: string;
  githubUrl: string;
  leetcodeUrl: string;
  resume: string;
  avatar: string;
}

// New Interface for Site Settings (SEO & Branding)
export interface SiteSettings extends BaseRecord {
    homepage_title: string; // Special title for home
    seo_description: string;
    seo_keywords: string;
    seo_author: string;
    og_image: string;
    og_title: string;
    og_description: string;
    favicon: string;
    primary_color: string; // Hex code (e.g. #22d3ee)
    background_color: string; // Hex code (e.g. #000000)
    isLive: boolean; // Controls Maintenance Mode
    analytics: string; // Google Analytics Tag ID (G-XXXXX)
}

export interface Education extends BaseRecord {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Certification extends BaseRecord {
  name: string;
  issuer: string;
  link: string;
}

export interface Achievement extends BaseRecord {
  title: string;
  description: string;
  icon: string; // Map string to Lucide icon
}

export interface Skill extends BaseRecord {
  title: string;
  desc: string;
  icon: string;
  isFeatured: boolean;
}

export interface Tool extends BaseRecord {
  name: string;
  logo: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  plus: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// New Interfaces for Home Page Dynamic Content
export interface AnimatedTagline extends BaseRecord {
  line1: string;
  line2: string;
}

export interface Keyword extends BaseRecord {
  text: string;
}

export interface NumberedShowcase extends BaseRecord {
  label: string;
  value: string;
  icon: string;
}

// Interface for Privacy Policy and Terms of Use
export interface LegalDoc extends BaseRecord {
  slug: string;
  title: string;
  content: string; // Rich Text HTML
  last_updated?: string;
}

export interface Faq extends BaseRecord {
  question: string;
  answer: string;
}

// Interface for Dynamic CTA Section
export interface ActionSection extends BaseRecord {
    heading: string;
    subheading: string;
    button: string; // Updated from button_text to button
    icon?: string; // e.g. 'lightbulb', 'search', etc.
}

export enum PageRoute {
  HOME = '/',
  ABOUT = '/about',
  WORKS = '/works',
  BLOGS = '/blogs',
  CONTACT = '/contact',
  MANAGE = '/manage',
  ADMIN = '/admin'
}