
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight, Layers, Trophy, Github, Globe, Share2, Linkedin, Copy, Code, Loader2 } from 'lucide-react';
import { pb, getImageUrl } from '../lib/pocketbase';
import { Project } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import SpotlightCard from '../components/SpotlightCard';
import TextGenerateEffect from '../components/TextGenerateEffect';
import { useProfile } from '../context/ProfileContext';
import Meta from '../components/Meta'; // Import Meta

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { socials } = useProfile();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) return;
        const record = await pb.collection('projects').getOne<Project>(id);
        setProject(record);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );
  }

  if (!project) {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center pt-28">
            <h2 className="text-2xl font-bold uppercase mb-4 text-white">Project Not Found</h2>
            <Link to="/works" className="text-sm font-bold border-b border-white text-white">Back to Works</Link>
        </div>
    );
  }

  // Construct image URL for meta tag
  const projectImageUrl = getImageUrl(project.collectionId, project.id, project.image);

  return (
    <div className="w-full pt-28 pb-16 px-6">
      {/* Dynamic SEO for this project */}
      <Meta 
        title={project.title}
        description={project.description}
        image={projectImageUrl}
      />

      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto">
            <Link to="/works" className="inline-flex items-center gap-2 text-sm font-bold text-textMuted hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to Works
            </Link>

            {/* Header Section */}
            <ScrollReveal animation="fade-up">
              <div className="mb-8">
                  <div className="flex gap-3 mb-4">
                      <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-xs font-bold uppercase rounded-full">{project.category}</span>
                      <span className="bg-white/5 border border-white/10 text-textMuted px-3 py-1 text-xs font-bold uppercase rounded-full">{project.year}</span>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                      <h1 className="text-4xl md:text-5xl font-bold text-white font-display uppercase leading-tight tracking-tight">
                          {project.title}
                      </h1>

                      <div className="flex flex-wrap gap-4 shrink-0">
                          {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                                 className="px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-black border border-primary text-primary hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300"
                                 style={{ boxShadow: '0 0 20px -5px var(--primary)' }}>
                                  <Globe size={18} /> LIVE DEMO
                              </a>
                          )}
                          {project.repoUrl ? (
                              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-black border border-white/30 text-white hover:border-white hover:bg-white/5 hover:-translate-y-1 transition-all duration-300">
                                  <Github size={18} /> Source Code
                              </a>
                          ) : (
                              <button disabled className="px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-black border border-white/10 text-white/50 cursor-not-allowed">
                                  <Github size={18} /> Private Repo
                              </button>
                          )}
                      </div>
                  </div>

                  <div className="py-4 border-y border-white/10 flex items-center gap-4 overflow-x-auto no-scrollbar">
                       <span className="text-xs font-bold text-textMuted uppercase shrink-0">Tech Stack</span>
                       <div className="h-4 w-px bg-white/10 shrink-0"></div>
                       <div className="flex flex-nowrap gap-2">
                           {project.techStack && project.techStack.map(tech => (
                               <span key={tech} className="text-xs font-bold border border-white/10 px-3 py-1 bg-white/5 rounded-full text-textMuted hover:text-white transition-colors cursor-default whitespace-nowrap">{tech}</span>
                           ))}
                       </div>
                  </div>
              </div>
            </ScrollReveal>

            {/* Main Image */}
            <ScrollReveal animation="blur-in" delay={200}>
              <TiltCard intensity={5}>
                <div className="w-full aspect-video border border-white/10 rounded-2xl bg-surfaceHighlight mb-12 overflow-hidden relative group shadow-2xl shadow-black/50">
                    <img 
                        src={projectImageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Single Column Content Flow */}
            <div className="space-y-16">
                
                {/* Challenge Section */}
                <ScrollReveal animation="slide-left" distance={40}>
                  <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase font-display flex items-center gap-3">
                          <span className="w-3 h-8 bg-primary rounded-full"></span>
                          The Challenge
                      </h2>
                      <div className="text-textMuted font-medium leading-relaxed text-lg md:text-xl text-justify">
                          <TextGenerateEffect words={project.challenge} />
                      </div>
                  </div>
                </ScrollReveal>

                {/* Solution Section */}
                <ScrollReveal animation="slide-right" distance={40}>
                  <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase font-display flex items-center gap-3">
                              <span className="w-3 h-8 bg-secondary rounded-full"></span>
                              The Solution
                      </h2>
                      <p className="text-textMuted font-medium leading-relaxed mb-8 text-lg md:text-xl text-justify">
                          {project.solution}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.keyFeatures && project.keyFeatures.map((item, idx) => (
                              <SpotlightCard key={idx} className="bg-[#0A0A0A] rounded-2xl border border-white/5">
                                <div className="flex items-start gap-4 p-5">
                                    <div className="mt-1 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                              </SpotlightCard>
                          ))}
                      </div>
                  </div>
                </ScrollReveal>

                {/* System Architecture Section */}
                {project.modules && project.modules.length > 0 && (
                    <ScrollReveal animation="fade-up">
                      <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 uppercase font-display flex items-center gap-3">
                                  <Layers size={28} className="text-accent" />
                                  System Architecture
                          </h2>
                          <div className="grid grid-cols-1 gap-6">
                              {project.modules.map((mod, idx) => (
                                  <ScrollReveal key={idx} animation="scale-up" delay={idx * 100}>
                                    <SpotlightCard className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group">
                                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{mod.title}</h4>
                                        <p className="text-textMuted leading-relaxed">{mod.desc}</p>
                                    </SpotlightCard>
                                  </ScrollReveal>
                              ))}
                          </div>
                      </div>
                    </ScrollReveal>
                )}

                {/* Outcome Section */}
                {project.outcome && (
                    <ScrollReveal animation="blur-in">
                      <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 uppercase font-display flex items-center gap-3">
                                  <Trophy size={28} className="text-yellow-400" />
                                  Impact & Outcome
                          </h2>
                          <TiltCard>
                            <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-10 overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Trophy size={100} />
                                </div>
                                <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed relative z-10">
                                    "{project.outcome}"
                                </p>
                            </div>
                          </TiltCard>
                      </div>
                    </ScrollReveal>
                )}

                {/* Footer Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-10 mt-10">
                    <ScrollReveal animation="slide-left" delay={100}>
                      <SpotlightCard className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl h-full">
                           <h3 className="text-sm font-bold text-textMuted uppercase mb-6 tracking-wider flex items-center gap-2">
                              <Share2 size={16} /> Share Project
                           </h3>
                           <div className="flex gap-3">
                              <button onClick={handleCopy} className={`flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2 font-bold group ${copied ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 hover:bg-white hover:text-black hover:border-white'}`}>
                                  {copied ? <Check size={18} /> : <Copy size={18} />} 
                                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
                                  <span className="sm:hidden">{copied ? 'Copied' : ''}</span>
                              </button>
                              <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-primary/20 hover:text-primary transition-all" title="LeetCode Profile">
                                  <Code size={20} />
                              </a>
                              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-[#0077b5] hover:text-white transition-all">
                                  <Linkedin size={20} />
                              </a>
                           </div>
                      </SpotlightCard>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-right" delay={200}>
                      <TiltCard className="h-full">
                        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors"></div>
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Build something like this?</h3>
                            <p className="text-textMuted text-sm mb-6 relative z-10">I can help you turn your complex ideas into robust, scalable applications.</p>
                            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all relative z-10 uppercase tracking-wider">
                                Let's Collaborate <ArrowRight size={16} />
                            </Link>
                        </div>
                      </TiltCard>
                    </ScrollReveal>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
