
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Terminal, Hexagon, Code, Cpu, Globe, Zap, Database, Sparkles, Layout, Loader2 } from 'lucide-react';
import CountUp from '../components/CountUp';
import Marquee from '../components/Marquee';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import SpotlightCard from '../components/SpotlightCard';
import { pb, getImageUrl } from '../lib/pocketbase';
import { Project, Skill, AnimatedTagline, Keyword, NumberedShowcase } from '../types';
import { useProfile } from '../context/ProfileContext';
import { getIcon } from '../lib/icons';

const Home: React.FC = () => {
  const { profile } = useProfile();
  
  const [taglines, setTaglines] = useState<AnimatedTagline[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [showcaseStats, setShowcaseStats] = useState<NumberedShowcase[]>([]);
  
  const [index, setIndex] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [topSkills, setTopSkills] = useState<Skill[]>([]);

  useEffect(() => {
    // 1. Fetch Dynamic Home Content
    const fetchHomeContent = async () => {
        try {
            // Taglines: Sort by creation date (Oldest first: +created)
            // Updated collection name from 'animated_taglines' to 'taglines'
            const taglinesReq = await pb.collection('taglines').getList<AnimatedTagline>(1, 5, { 
                sort: '+created' 
            });
            if (taglinesReq.items.length > 0) setTaglines(taglinesReq.items);

            // Keywords: Sort by Newest first (-created)
            const keywordsReq = await pb.collection('keywords').getList<Keyword>(1, 50, { sort: '-created' });
            if (keywordsReq.items.length > 0) setKeywords(keywordsReq.items);

            // Numbered Showcase: Sort by Oldest first (+created)
            // Updated collection name from 'numbered_showcase' to 'showcase'
            const statsReq = await pb.collection('showcase').getList<NumberedShowcase>(1, 4, { sort: '+created' });
            if (statsReq.items.length > 0) setShowcaseStats(statsReq.items);

        } catch (err) {
            console.error("Error fetching home content - utilizing fallbacks.", err);
        }
    };

    // 2. Fetch Projects: Latest 2 based on created time
    const fetchFeatured = async () => {
      try {
        const records = await pb.collection('projects').getList<Project>(1, 2, {
          sort: '-created',
        });
        setFeaturedProjects(records.items);
      } catch (err) {
        console.error("Failed to load featured projects", err);
      }
    };

    // 3. Fetch Skills: Latest featured skills
    const fetchSkills = async () => {
        try {
            const records = await pb.collection('skills').getList<Skill>(1, 3, {
                filter: 'isFeatured = true',
                sort: '-created'
            });
            setTopSkills(records.items);
        } catch (err) {
            console.error("Failed to load skills", err);
        }
    }

    fetchHomeContent();
    fetchFeatured();
    fetchSkills();
  }, []);

  // Default / Fallback Data Configuration
  const DISPLAY_TAGLINES = taglines.length > 0 ? taglines : [
    { line1: "Tagline Line 1", line2: "Tagline Line 2", id: "1" } as AnimatedTagline,
    { line1: "Another Heading", line2: "Sub Heading", id: "2" } as AnimatedTagline,
    { line1: "Creative", line2: "Portfolio", id: "3" } as AnimatedTagline
  ];

  const DISPLAY_KEYWORDS = keywords.length > 0 ? keywords.map(k => k.text) : 
    ['Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4', 'Keyword 5', 'Keyword 6', 'Keyword 7', 'Keyword 8'];

  const DISPLAY_STATS = showcaseStats.length > 0 ? showcaseStats : [
      { id: '1', label: 'Stat Label', value: '100', icon: 'star' } as NumberedShowcase,
      { id: '2', label: 'Metric', value: '50+', icon: 'folder-git-2' } as NumberedShowcase,
      { id: '3', label: 'Achieved', value: '10', icon: 'award' } as NumberedShowcase,
      { id: '4', label: 'Items', value: '20+', icon: 'layers' } as NumberedShowcase
  ];

  // Rotate Headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DISPLAY_TAGLINES.length);
    }, 3500); // Slightly slower for better readability
    return () => clearInterval(interval);
  }, [DISPLAY_TAGLINES.length]);

  // Parallax Logic
  useEffect(() => {
    const handleScroll = () => {
       const scrolled = window.scrollY;
       const parallaxElements = document.querySelectorAll('.parallax-icon');
       parallaxElements.forEach((el) => {
           const speed = parseFloat((el as HTMLElement).dataset.speed || '0.1');
           (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
       });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Config for floating icons
  const FLOATING_ICONS = [
    { Icon: Hexagon, color: 'text-secondary', top: '15%', right: '15%', delay: '0s', duration: '6s', size: 40, speed: -0.1 },
    { Icon: Terminal, color: 'text-primary', bottom: '20%', left: '10%', delay: '2s', duration: '7s', size: 32, speed: 0.15 },
    { Icon: Code, color: 'text-accent', top: '25%', left: '15%', delay: '1s', duration: '5s', size: 36, speed: -0.08 },
    { Icon: Cpu, color: 'text-purple-400', bottom: '30%', right: '10%', delay: '3s', duration: '8s', size: 34, speed: 0.12 },
    { Icon: Globe, color: 'text-blue-400', top: '10%', left: '40%', delay: '4s', duration: '9s', size: 28, speed: -0.15 },
    { Icon: Zap, color: 'text-yellow-400', top: '40%', right: '5%', delay: '1.5s', duration: '6.5s', size: 30, speed: 0.05 },
    { Icon: Database, color: 'text-green-400', bottom: '15%', left: '35%', delay: '0.5s', duration: '7.5s', size: 32, speed: 0.1 },
    { Icon: Sparkles, color: 'text-pink-400', top: '20%', left: '5%', delay: '2.5s', duration: '5.5s', size: 24, speed: -0.05 },
    { Icon: Layout, color: 'text-indigo-400', bottom: '40%', right: '25%', delay: '3.5s', duration: '6s', size: 28, speed: 0.08 },
  ];

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6 min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        
        {/* Floating Decoration Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {FLOATING_ICONS.map((item, idx) => (
                <div 
                    key={idx}
                    className="absolute parallax-icon"
                    data-speed={item.speed}
                    style={{ 
                        top: item.top, 
                        left: item.left, 
                        right: item.right, 
                        bottom: item.bottom,
                    }}
                >
                    <div 
                        className={`animate-float opacity-50 ${item.color}`}
                        style={{
                            animationDelay: item.delay,
                            animationDuration: item.duration,
                        }}
                    >
                        <item.Icon size={item.size} strokeWidth={1.5} />
                    </div>
                </div>
            ))}
        </div>

        {/* Welcome Badge */}
        <ScrollReveal animation="blur-in" duration={1000}>
          <div className="relative z-10 inline-flex mb-8 group">
            <div className="
              relative flex items-center gap-3 pl-4 pr-6 py-2 rounded-full overflow-hidden
              border border-white/20 bg-white/5
              shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]
              hover:border-white/30
              transition-all duration-300
            ">
                <div className="absolute inset-0 opacity-60">
                    <CardBackground />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>

                <span className="relative z-10 text-xl animate-hand-wave origin-[70%_70%] select-none">👋</span>
                
                <span className="relative z-10 text-sm md:text-base font-bold text-white tracking-wide">
                   {profile ? profile.firstName : 'User'} Welcome’s You!
                </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Headline - Grid Layout to prevent overlaps */}
        <ScrollReveal animation="fade-up" delay={100} distance={40}>
          <div className="relative z-10 w-full max-w-6xl mx-auto mb-8 grid grid-cols-1 place-items-center">
             
             {/* Glow Background */}
             <div className="col-start-1 row-start-1 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
             
             {DISPLAY_TAGLINES.map((tagline, i) => (
                 <div 
                    key={tagline.id}
                    className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                        i === index 
                        ? "opacity-100 scale-100 blur-0 z-10 translate-y-0" 
                        : "opacity-0 scale-110 blur-md z-0 pointer-events-none translate-y-4 absolute"
                    }`}
                 >
                    <h1 className="flex flex-col gap-2 sm:gap-4">
                        <span className="text-white text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] drop-shadow-xl">
                            {tagline.line1}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] drop-shadow-xl">
                            {tagline.line2}
                        </span>
                    </h1>
                 </div>
             ))}
             
             {/* Spacer to reserve height for the grid if JS fails or loading */}
             <div className="col-start-1 row-start-1 invisible pointer-events-none" aria-hidden="true">
                <h1 className="flex flex-col gap-2 sm:gap-4">
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display leading-[1.1]">Placeholder</span>
                    <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display leading-[1.1]">Placeholder</span>
                </h1>
             </div>
          </div>
        </ScrollReveal>

        {/* Subtitle - USING PROFILE TAGLINE */}
        <ScrollReveal animation="fade-up" delay={200} distance={40}>
           <p className="relative z-10 text-textMuted text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
              {profile?.tagline || "Your professional tagline goes here."}
           </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal animation="blur-in" delay={300}>
          <div className="relative z-10 flex flex-col sm:flex-row gap-5 mb-10 items-center justify-center">
            <Link to="/works" className="btn btn-white min-w-[180px] rounded-full">
              View Projects
            </Link>
            <Link to="/contact" className="btn min-w-[180px] rounded-full flex items-center justify-center gap-2 group text-primary font-bold hover:bg-primary/10">
              Contact Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Marquee & Stats Section */}
      <section className="px-4 md:px-6 relative z-10 pb-8 -mt-8">
        <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Infinite Keywords Marquee */}
            <ScrollReveal animation="fade-in" duration={1200}>
              <div className="relative w-full max-w-4xl mx-auto overflow-hidden border border-white/20 rounded-full bg-[#050505] shadow-[0_0_20px_rgba(0,0,0,0.5)] group h-14 flex items-center">
                   
                   {/* Animated Border Beam */}
                   <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                       <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-beam-horz"></div>
                   </div>

                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-gradient-to-r from-black via-white/5 to-black opacity-50"></div>
                   
                   {/* Side Fades */}
                   <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 rounded-l-full"></div>
                   <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 rounded-r-full"></div>
                   
                   {/* Marquee Content */}
                   <div className="relative z-10 w-full flex items-center">
                       <Marquee 
                          items={DISPLAY_KEYWORDS} 
                          direction="left" 
                          variant="transparent"
                       />
                   </div>
              </div>
            </ScrollReveal>

            {/* Premium Stats Bar */}
            <ScrollReveal animation="fade-up" delay={200} distance={30}>
                <div className="max-w-5xl mx-auto px-2">
                    <div className="bg-[#030303] border border-white/10 rounded-[2.5rem] p-2 shadow-2xl relative">
                        <div className="bg-[#080808] rounded-[2rem] border border-white/5 px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative z-10">
                             
                             {DISPLAY_STATS.map((stat, idx) => (
                                <React.Fragment key={stat.id}>
                                    <div className="flex items-center gap-5 w-full md:w-auto justify-center md:justify-start group">
                                        {/* Icon Box */}
                                        <div className="w-14 h-14 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-white group-hover:scale-110 transition-transform duration-300">
                                            {getIcon(stat.icon, { size: 22, className: "text-white/70 group-hover:text-white transition-colors" })}
                                        </div>
                                        
                                        <div className="flex flex-col text-left">
                                            <span className="text-3xl font-bold text-white font-display leading-none mb-1.5">
                                                <CountUp 
                                                    end={parseFloat(stat.value)} 
                                                    suffix={stat.value.includes('+') ? '+' : ''} 
                                                    decimals={stat.value.includes('.') ? 1 : 0}
                                                />
                                            </span>
                                            <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest group-hover:text-white transition-colors">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {idx < DISPLAY_STATS.length - 1 && (
                                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                                    )}
                                    {idx < DISPLAY_STATS.length - 1 && (
                                        <div className="md:hidden w-full max-w-[120px] h-px bg-white/10"></div>
                                    )}
                                </React.Fragment>
                             ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

        </div>
      </section>

      {/* Top Skills Section */}
      <section className="pt-12 pb-16 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
             <ScrollReveal animation="slide-left" distance={60}>
               <div className="flex justify-between items-end mb-8">
                   <div>
                       <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-2">Top Skills</h2>
                       <p className="text-textMuted">Core technologies I use to build scalable solutions.</p>
                   </div>
                   <Link to="/skills" className="hidden md:flex items-center gap-2 text-white font-bold transition-all text-sm group hover:text-primary">
                      View All Skills <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
               </div>
             </ScrollReveal>

             {topSkills.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {topSkills.map((skill, idx) => (
                         <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} distance={40}>
                           <SpotlightCard className="h-full border border-white/20 shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]">
                               <div className="relative group flex flex-col items-center text-center p-8 h-full bg-transparent">
                                   <CardBackground />
                                   
                                   <div className="relative z-10 mb-6 p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:-translate-y-2 backdrop-blur-md">
                                       {getIcon(skill.icon, { size: 32 })}
                                   </div>

                                   <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight relative z-10">{skill.title}</h3>
                                   <p className="text-textMuted text-sm leading-relaxed mb-10 max-w-[85%] mx-auto relative z-10 drop-shadow-sm">
                                       {skill.desc}
                                    </p>

                                    <div className="w-full mt-auto relative z-10">
                                       <Link to="/skills" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#000000] border border-white/20 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-black z-20 hover:border-white shadow-sm">
                                           Explore Tech <ArrowRight size={14} />
                                       </Link>
                                   </div>
                               </div>
                           </SpotlightCard>
                         </ScrollReveal>
                     ))}
                 </div>
             ) : (
                <TiltCard className="w-full">
                    <div className="w-full py-20 rounded-3xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group">
                        <CardBackground />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="relative">
                                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                 <Loader2 className="animate-spin text-primary relative z-10" size={28} />
                            </div>
                            <p className="text-textMuted font-bold uppercase tracking-widest text-sm animate-pulse">Loading Top Skills...</p>
                        </div>
                    </div>
                </TiltCard>
             )}
             
             <div className="mt-8 md:hidden flex justify-center">
                 <Link to="/skills" className="text-white font-bold text-sm underline underline-offset-4">View All Skills</Link>
             </div>
          </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6 bg-surfaceHighlight/30 border-t border-white/5 relative z-10">
          <div className="max-w-6xl mx-auto">
             <ScrollReveal animation="slide-right" distance={60}>
               <div className="flex justify-between items-end mb-10">
                   <div>
                       <div className="text-white font-bold text-xs uppercase tracking-wider mb-2 opacity-70">Portfolio</div>
                       <h2 className="text-3xl md:text-5xl font-bold text-white font-display">Featured Projects</h2>
                   </div>
                   <Link to="/works" className="hidden md:flex items-center gap-2 text-white font-bold text-sm group transition-all hover:text-primary">
                      View All Works <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
               </div>
             </ScrollReveal>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {featuredProjects.map((project, idx) => (
                     <ScrollReveal key={project.id} animation="blur-in" delay={idx * 200}>
                       <TiltCard className="h-full">
                           <div className="group relative rounded-3xl bg-[#000000] border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-500 flex flex-col h-full shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.15)]">
                               <CardBackground />
                               
                               <div className="relative h-64 w-full overflow-hidden z-10 border-b border-white/10 group-hover:border-white/20 transition-colors">
                                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                                   <img 
                                        src={getImageUrl(project.collectionId, project.id, project.image)}
                                        alt={project.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                   />
                                   
                                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 z-20 shadow-lg group-hover:border-white/50 transition-colors">
                                      {project.category}
                                   </div>
                               </div>
                               
                               <div className="p-6 relative z-10 flex flex-col flex-grow bg-gradient-to-b from-[#000000] to-transparent/50 backdrop-blur-[2px]">
                                   <h3 className="text-2xl font-bold text-white mb-2 font-display transition-colors group-hover:text-primary">{project.title}</h3>
                                   <p className="text-textMuted text-sm line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
                                   
                                   <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
                                      <div className="flex gap-2">
                                          {project.techStack && project.techStack.slice(0, 3).map(tag => (
                                              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-textMuted bg-white/5 px-2 py-1 rounded border border-white/10 group-hover:border-white/20 transition-colors">{tag}</span>
                                          ))}
                                      </div>
                                      <Link to={`/works/${project.id}`} className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform group-hover:rotate-45 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                          <ArrowUpRight size={18} />
                                      </Link>
                                   </div>
                               </div>
                           </div>
                       </TiltCard>
                     </ScrollReveal>
                 ))}
                 {featuredProjects.length === 0 && (
                    <div className="col-span-1 md:col-span-2">
                         <TiltCard className="w-full">
                            <div className="w-full py-20 rounded-3xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group">
                                <CardBackground />
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="relative">
                                         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                         <Loader2 className="animate-spin text-primary relative z-10" size={28} />
                                    </div>
                                    <p className="text-textMuted font-bold uppercase tracking-widest text-sm animate-pulse">Loading Projects...</p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                 )}
             </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
