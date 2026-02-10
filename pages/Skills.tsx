
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Loader2 } from 'lucide-react';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { pb, getImageUrl } from '../lib/pocketbase';
import { Skill, Tool } from '../types';
import { getIcon } from '../lib/icons';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchSkillsAndTools = async () => {
        try {
            // Skills: Sort by newest created
            const skillReq = await pb.collection('skills').getList<Skill>(1, 50, { sort: '-created' });
            setSkills(skillReq.items);

            // Tools: Sort by newest created
            const toolReq = await pb.collection('tools').getList<Tool>(1, 50, { sort: '-created' });
            setTools(toolReq.items);
        } catch (error) {
            console.error("Error fetching skills/tools:", error);
        }
    };

    fetchSkillsAndTools();
  }, []);

  return (
    <div className="w-full pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        <ScrollReveal animation="fade-up">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Arsenal</span>
                </h1>
                <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
                    A curated list of technologies I use to build performant, scalable, and intelligent applications.
                </p>
            </div>
        </ScrollReveal>

        {/* Skills Grid */}
        {skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {skills.map((skill, idx) => (
                    <ScrollReveal key={skill.id} animation="blur-in" delay={idx * 100}>
                        <TiltCard className="h-full">
                            <div className="relative group rounded-3xl bg-[#050505] border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.08)] flex flex-col p-8 h-full shadow-[0_0_15px_-5px_rgba(255,255,255,0.05)]">
                                <CardBackground />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-white/10 group-hover:border-white/30">
                                        {getIcon(skill.icon, { size: 28 })}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight transition-colors">{skill.title}</h3>
                                    <p className="text-textMuted text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </ScrollReveal>
                ))}
            </div>
        ) : (
            <TiltCard className="w-full mb-16">
                <div className="w-full py-20 rounded-3xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group">
                    <CardBackground />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="relative">
                             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                             <Loader2 className="animate-spin text-primary relative z-10" size={28} />
                        </div>
                        <p className="text-textMuted font-bold uppercase tracking-widest text-sm animate-pulse">Loading Skills...</p>
                    </div>
                </div>
            </TiltCard>
        )}

        {/* Tools I Use Section */}
        <div className="mb-12">
            <ScrollReveal animation="slide-right" distance={40}>
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-display px-4">
                        <Wrench className="text-primary" size={24} /> Tools & Environment
                    </h3>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>
            </ScrollReveal>
            
            {tools.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {tools.map((tool, idx) => (
                        <ScrollReveal key={tool.id} animation="scale-up" delay={idx * 50}>
                            <TiltCard className="h-full">
                                <div className="group relative bg-[#050505] border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 h-full overflow-hidden hover:border-white/40 shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)]">
                                    <CardBackground />
                                    
                                    <div className="relative z-10 h-10 w-10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                                        {tool.logo ? (
                                            <img 
                                                src={getImageUrl(tool.collectionId, tool.id, tool.logo)} 
                                                alt={tool.name} 
                                                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-full font-bold text-xs">{tool.name[0]}</div>
                                        )}
                                    </div>
                                    
                                    <span className="text-sm font-bold text-white relative z-10 tracking-tight text-center">{tool.name}</span>
                                </div>
                            </TiltCard>
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
                            <p className="text-textMuted font-bold uppercase tracking-widest text-sm animate-pulse">Loading Tools...</p>
                        </div>
                    </div>
                </TiltCard>
            )}
        </div>

        <ScrollReveal animation="fade-up">
            <div className="text-center relative z-10">
                <Link 
                  to="/works" 
                  className="btn px-10 py-5 rounded-2xl bg-black border-2 border-primary text-white font-black uppercase tracking-widest hover:shadow-[0_0_30px_color-mix(in_srgb,var(--primary),transparent_50%)] transition-all group active:scale-95"
                >
                    See Skills in Action 
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform ml-2" />
                </Link>
            </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Skills;
