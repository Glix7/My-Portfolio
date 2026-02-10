
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, FolderGit2, Globe, Github, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { pb, getImageUrl } from '../lib/pocketbase';
import { Project } from '../types';

const Works: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Projects: Sort by newest created first
        const records = await pb.collection('projects').getList<Project>(1, 50, {
          sort: '-created',
        });
        setProjects(records.items);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-primary uppercase tracking-wider mb-6">
                  <FolderGit2 size={14} /> Portfolio
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                  Selected <span className="text-primary">Works</span>
              </h1>
              <p className="text-textMuted text-lg max-w-xl mx-auto leading-relaxed">
                  A showcase of my technical projects involving AI, Machine Learning, and Full Stack Development.
              </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} animation={idx % 2 === 0 ? 'slide-left' : 'slide-right'} delay={idx * 100} distance={50}>
              <TiltCard className="h-full">
                  <div className="group relative rounded-[2rem] bg-[#050505] border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] flex flex-col h-full shadow-[0_0_20px_-10px_rgba(255,255,255,0.08)]">
                    
                    <CardBackground />

                    {/* Window Header Style Image Container */}
                    <div className="relative h-64 w-full overflow-hidden z-10 border-b border-white/10 bg-[#0A0A0A] group-hover:border-white/20 transition-colors">
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>

                      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10 shadow-lg">
                          {project.year}
                      </div>

                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img 
                        src={getImageUrl(project.collectionId, project.id, project.image)}
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 relative z-10 flex flex-col flex-grow bg-gradient-to-b from-[#050505] to-transparent">
                      <div className="mb-6">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="text-2xl font-bold text-white font-display group-hover:text-primary transition-colors tracking-tight">{project.title}</h3>
                              <Link 
                                  to={`/works/${project.id}`} 
                                  className="w-10 h-10 rounded-full bg-white/5 text-white/70 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 -mt-1 -mr-1"
                              >
                                  <ArrowUpRight size={18} />
                              </Link>
                          </div>
                          <p className="text-textMuted text-sm line-clamp-2 leading-relaxed font-medium">{project.description}</p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                              {project.techStack && project.techStack.slice(0, 5).map(tag => (
                                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 bg-white/5 text-textMuted rounded-md border border-white/10 group-hover:border-white/20 transition-colors">
                                      {tag}
                                  </span>
                              ))}
                              {project.techStack && project.techStack.length > 5 && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 bg-white/5 text-textMuted rounded-md border border-white/10">+{project.techStack.length - 5}</span>
                              )}
                          </div>
                          
                          <div className="flex gap-2 shrink-0">
                              {project.liveUrl && (
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-black transition-colors">
                                      <Globe size={14} /> Live
                                  </a>
                              )}
                              {project.repoUrl && (
                                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-white/70 border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors">
                                      <Github size={14} /> Source
                                  </a>
                              )}
                          </div>
                      </div>
                    </div>
                  </div>
              </TiltCard>
            </ScrollReveal>
          ))}
          {projects.length === 0 && (
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
    </div>
  );
};

export default Works;
