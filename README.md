# 🚀 Harishama Chaurasia

**AI/ML Engineer & Full-Stack Developer**

[![Portfolio](https://img.shields.io/badge/Portfolio-harishama.tegota.com-00d4ff?style=for-the-badge&logo=globe&logoColor=white)](https://harishama.tegota.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harishama%20Chaurasia-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-harishama-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

---

## ✨ About This Repository

This is the official source code for my **premium dark-mode portfolio website** — a high-performance, visually immersive React SPA designed to showcase **AI/ML engineering expertise** and full-stack development capabilities.

**Live at:** [harishama.tegota.com](https://harishama.tegota.com/)

> A modern portfolio built with cutting-edge web technologies, featuring complex canvas animations, interactive 3D cards, and seamless app-like navigation.

---

## 🎯 Who I Am

**B.Tech (2027) Student** specializing in **Artificial Intelligence & Machine Learning**

I'm passionate about solving real-world problems through:

- 🤖 **Artificial Intelligence & Machine Learning**
- 🧠 **Deep Learning & Neural Networks**
- 🐍 **Python Development**
- ✨ **Generative AI & Prompt Engineering**
- 💻 **Modern Web Technologies**
- 🔗 **Full-Stack Development**

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — Latest React with Hooks and Functional Components
- **TypeScript** — Strictly typed interfaces for reliability
- **React Router Dom v6.28+** — Client-side routing with v7 Future Flags
- **Tailwind CSS** — Utility-first styling with custom extended palette
- **Lucide React** — Modern SVG icon library

### Styling & Design
- **Custom CSS Keyframes** — Beams, glows, marquees, and dynamic effects
- **3D CSS Transforms** — Perspective-based interactive elements
- **HTML5 Canvas** — High-performance background animations
- **Typography:** 'Plus Jakarta Sans' (Body) & 'Space Grotesk' (Display)

### Interactivity
- **Intersection Observer API** — Scroll-triggered animations
- **Mouse Tracking** — Dynamic spotlight and tilt effects
- **Canvas Animations** — Background curves and shooting stars

### Backend & Deployment
- **Formspree** — Contact form API integration
- **Tegota Infrastructure** — Hosting & deployment
- **Git & GitHub** — Version control

---

## 📂 Project Structure

```
harishama-portfolio/
├── 📄 index.html              # Entry point with Tailwind config & SEO
├── 📄 index.tsx               # React DOM root
├── 📄 App.tsx                 # Main routing & layout
├── 📄 types.ts                # TypeScript interfaces
├── 📄 constants.tsx           # Static data (projects, skills)
├── 📄 metadata.json           # App metadata
│
├── 🧩 components/             # Reusable UI blocks
│   ├── Navbar.tsx             # Floating island navigation
│   ├── Footer.tsx             # Site footer with animations
│   ├── CTA.tsx                # Call-to-action electric card
│   ├── Preloader.tsx          # Loading screen
│   │
│   ├── 🎨 Visual Effects
│   ├── Background.tsx         # Base background layer
│   ├── BackgroundCurves.tsx   # Animated glowing lines (Canvas)
│   ├── ShootingStars.tsx      # Ambient starfield (Canvas)
│   ├── CardBackground.tsx     # Grid patterns
│   ├── ScrollReveal.tsx       # Scroll animations wrapper
│   │
│   └── ✨ UI Elements
│   ├── TiltCard.tsx           # 3D hover effect
│   ├── SpotlightCard.tsx      # Glowing border with cursor tracking
│   ├── Marquee.tsx            # Infinite scrolling text
│   ├── CountUp.tsx            # Animated counters
│   └── TextGenerateEffect.tsx # Typewriter text loader
│
└── 📄 pages/                  # Route views
    ├── Home.tsx               # Landing & hero section
    ├── About.tsx              # Bio & education
    ├── Skills.tsx             # Tech stack grid
    ├── Works.tsx              # Project gallery
    ├── ProjectDetail.tsx      # Individual project case study
    ├── Contact.tsx            # Contact form
    ├── Blogs.tsx              # Blog listing
    ├── BlogDetail.tsx         # Blog post view
    ├── PrivacyPolicy.tsx      # Legal
    ├── TermsOfUse.tsx         # Legal
    └── NotFound.tsx           # 404 page
```

---

## ✨ Key Features

### 🎬 Immersive Visual Design
- **Layered Background System** — Subtle depth with ShootingStars, BackgroundCurves, and static base layer
- **High-Contrast Aesthetics** — Deep blacks paired with neon cyan/green accents
- **Spotlight Effects** — Elements glow on hover, simulating interactive lighting

### 🎯 Dynamic Routing & SEO
- **Page Title Updater** — Dynamic browser tab titles
- **Route-Based Layout** — Persistent Navbar/Footer with nested routing
- **Structured Metadata** — Optimized for search engines

### 🎨 Project Showcase System
- **Data-Driven Architecture** — All projects stored in `constants.tsx`
- **Dynamic Routes** — `/works/:id` detailed case study views
- **Rich Project Pages** — Full project descriptions with metadata

### 📧 Contact & Integration
- **Formspree API** — Direct email integration (no backend needed)
- **Form Validation** — Loading states with success/error handling
- **Responsive Contact Form** — Beautiful, accessible form UI

### ⚡ Performance Optimizations
- **Custom Preloader** — Manages asset loading elegantly
- **Effect Cleanups** — Proper useEffect cleanup to prevent memory leaks
- **Canvas Optimization** — High-performance animations without janky rendering
- **Lazy Loading** — Route-based code splitting with React Router

---

## 🎨 Design System

### Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| **Primary Accent** | `#22d3ee` (Cyan) | Buttons, links, highlights |
| **Secondary Accent** | `#4ade80` (Green) | Active states, success |
| **Background** | `#000000` (Pure Black) | Main canvas |
| **Surface** | `#050505` (Deep Black) | Cards, sections |
| **Text** | `#ffffff` (White) | Primary text |
| **Text Secondary** | `#a0aec0` (Gray) | Secondary text |

### Typography
- **Display Font:** 'Space Grotesk' — Bold, futuristic headings
- **Body Font:** 'Plus Jakarta Sans' — Clean, readable content
- **Weight Scale:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Visual Elements
- **Borders** — Subtle `white/10` and `white/20` for definition
- **Shadows** — Soft glows for depth, spotlight effects on interaction
- **Radius** — `8px` standard, `12px` for larger components
- **Spacing** — 16px grid system throughout

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/harishama-portfolio.git
cd harishama-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📋 Website Sections

| Section | Purpose |
|---------|---------|
| **Home** | Hero, stats, featured projects |
| **About** | Biography, education, certifications |
| **Skills** | Technical expertise grid |
| **Works** | Full project portfolio with filters |
| **Projects** | Detailed case studies |
| **Contact** | Professional connection form |
| **Blogs** | Articles and insights |

---

## 📊 Performance Metrics

- ⚡ **Lighthouse Score:** 90+
- 🎯 **Core Web Vitals:** Optimized
- 📱 **Mobile Responsive:** 100%
- ♿ **Accessibility:** WCAG 2.1 AA

---

## 📚 API Integrations

### Formspree Contact Form
- Collect Contact us Page Data

### Google Analytics integration
- For tracking user behaviour on website


---

## 🛡️ License

This project is intended for **personal and professional use**.

Licensed under the **MIT License**, feel free to use this as a template for your own portfolio.


---

## 📞 Connect With Me

- 🌐 **Portfolio:** [harishama.tegota.com](https://harishama.tegota.com/)
- 💼 **LinkedIn:** [Harishama Chaurasia](https://linkedin.com/in/harishama)



---

## 🙏 Credits & Acknowledgments

- **React 19** — The modern JavaScript library
- **Tailwind CSS** — Utility-first CSS framework
- **Tegota Infrastructure** — Hosting partner
- **Formspree** — Email form backend
- **Lucide React** — Icon library

---


<div align="center">

**Made with ❤️ by Harishama Chaurasia**

⭐ Star this repo if you find it useful!

</div>