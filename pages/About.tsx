
import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Download, GraduationCap, Award, ExternalLink, Trophy, Code, Loader2, FolderOpen } from 'lucide-react';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useProfile } from '../context/ProfileContext';
import { getImageUrl, pb } from '../lib/pocketbase';
import { Education, Certification, Achievement } from '../types';
import { getIcon } from '../lib/icons';
import Meta from '../components/Meta';

// Internal helper for consistent loading/empty states
const StatusBlock = ({ loading, text }: { loading: boolean, text: string }) => (
    <TiltCard className="w-full">
        <div className="w-full py-20 rounded-3xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group">
            <CardBackground />
            <div className="relative z-10 flex flex-col items-center gap-4">
                {loading ? (
                    <div className="relative">
                         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                         <Loader2 className="animate-spin text-primary relative z-10" size={28} />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                        <FolderOpen size={24} />
                    </div>
                )}
                <p className="text-textMuted font-bold uppercase tracking-widest text-sm animate-pulse">
                    {text}
                </p>
            </div>
        </div>
    </TiltCard>
);

const About: React.FC = () => {
  const { profile, branding, socials } = useProfile();
  
  const [education, setEducation] = useState<Education[]>([]);
  const [loadingEdu, setLoadingEdu] = useState(true);

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchieve, setLoadingAchieve] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
        // Education
        try {
            const eduReq = await pb.collection('education').getList<Education>(1, 20, { sort: '-created' });
            setEducation(eduReq.items);
        } catch (error) {
            console.error("Error fetching education:", error);
        } finally {
            setLoadingEdu(false);
        }

        // Certifications
        try {
            const certReq = await pb.collection('certifications').getList<Certification>(1, 20, { sort: '-created' });
            setCertifications(certReq.items);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingCerts(false);
        }

        // Achievements
        try {
            const achReq = await pb.collection('achievements').getList<Achievement>(1, 20, { sort: '-created' });
            setAchievements(achReq.items);
        } catch (error) {
            console.error("Error fetching achievements:", error);
        } finally {
            setLoadingAchieve(false);
        }
    };

    fetchContent();
  }, []);

  const avatarUrl = profile?.avatar 
    ? getImageUrl(profile.collectionId, profile.id, profile.avatar)
    : ""; 

  const resumeUrl = profile?.resume
    ? getImageUrl(profile.collectionId, profile.id, profile.resume)
    : "#";

  return (
    <div className="w-full pt-28 pb-12 px-6">
      {/* Dynamic SEO */}
      <Meta 
        title="About Me" 
        description={profile?.aboutBio?.substring(0, 150) || "Learn more about my background, education, and achievements."} 
        image={avatarUrl}
      />

      <div className="max-w-6xl mx-auto">
        
        {/* Top Intro Text - Dynamic Tagline */}
        <ScrollReveal animation="fade-down" duration={800}>
            <div className="text-center mb-8">
                <p className="text-textMuted text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
                    {profile?.about_text || "About Page Tagline..."}
                </p>
            </div>
        </ScrollReveal>

        {/* MOBILE ONLY HEADLINE */}
        <div className="md:hidden mb-10 w-full overflow-hidden">
             <ScrollReveal animation="fade-up" delay={100}>
                 <div className="flex justify-center">
                     <h1 className="text-[1.5rem] sm:text-4xl font-bold text-white font-display leading-tight flex flex-nowrap whitespace-nowrap items-center gap-2 justify-center tracking-tight">
                         <span>I'm</span>
                         <span className="relative inline-block group mx-1">
                             <span className="absolute inset-0 w-full h-full bg-primary transform -rotate-2 translate-x-1 translate-y-1"></span>
                             <span className="relative block bg-white text-black border-2 border-black px-2 py-0.5 transform -rotate-2 z-10">
                                 {profile ? profile.firstName : "Name"}
                             </span>
                         </span>
                         <span>{profile ? profile.lastName : "Surname"}</span>
                     </h1>
                 </div>
             </ScrollReveal>
        </div>
        
        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-16 items-stretch">
          
          <div className="md:col-span-5 relative group flex flex-col h-full">
            <ScrollReveal animation="slide-left" distance={50} className="h-full">
              <TiltCard className="h-full" intensity={5}>
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-[#050505] border border-white/20 shadow-2xl transition-all duration-500 hover:border-white/20 min-h-[400px] md:min-h-0 flex items-center justify-center">
                      {avatarUrl ? (
                          <img 
                            src={avatarUrl} 
                            alt={branding.fullName} 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 filter grayscale-[10%] group-hover:grayscale-0" 
                          />
                      ) : (
                          <div className="text-textMuted text-sm">No Avatar Uploaded</div>
                      )}
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]"></div>
                  </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7 flex flex-col gap-8 justify-center min-w-0">
             
             {/* DESKTOP ONLY HEADLINE */}
             <div className="hidden md:block w-full max-w-full">
                 <ScrollReveal animation="fade-up" delay={100}>
                     <div>
                         <h1 className="w-full max-w-full flex flex-row flex-nowrap justify-center items-center gap-3 font-bold text-white font-display leading-tight mb-4">
                             <span className="shrink text-[clamp(1.5rem,2.5vw,3.5rem)]">I'm</span>
                             
                             <span className="relative inline-block group mx-2 shrink">
                                 <span className="absolute inset-0 w-full h-full bg-primary transform -rotate-2 translate-x-1 translate-y-1"></span>
                                 <span className="relative block bg-white text-black border-2 border-black px-3 py-1 transform -rotate-2 z-10 text-[clamp(1.5rem,2.5vw,3.5rem)] whitespace-nowrap">
                                     {profile ? profile.firstName : "Name"}
                                 </span>
                             </span>
                             
                             <span className="shrink text-[clamp(1.5rem,2.5vw,3.5rem)]">{profile ? profile.lastName : "Surname"}</span>
                         </h1>
                     </div>
                 </ScrollReveal>
             </div>

             {/* Bio Card */}
             <ScrollReveal animation="blur-in" delay={200} className="flex-grow">
               <div className="rounded-[2rem] border border-white/20 bg-[#080808] overflow-hidden shadow-2xl relative h-full flex flex-col">
                   
                   <div className="bg-black/80 backdrop-blur-md border-b border-white/5 p-6 flex items-center justify-between">
                       <div className="flex items-center gap-2 select-none">
                           <span className="text-3xl font-black text-white font-display tracking-tight">ABOUT</span>
                           <div className="relative mx-1">
                               <div className="absolute inset-0 bg-[#222] rounded transform translate-x-1 translate-y-1 rotate-3"></div>
                               <div className="relative bg-[#4ade80] px-2 py-0.5 rounded transform rotate-2 border border-black/10">
                                   <span className="text-3xl font-black text-black font-display tracking-tight">ME</span>
                               </div>
                           </div>
                           <span className="text-3xl font-black text-white font-display tracking-tight">.</span>
                       </div>
                       
                       <div className="flex gap-2">
                           <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 text-textMuted hover:bg-white/10 hover:text-white transition-all bg-white/5">
                               <Github size={16} />
                           </a>
                           <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 text-textMuted hover:bg-white/10 hover:text-white transition-all bg-white/5">
                               <Linkedin size={16} />
                           </a>
                           <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 text-textMuted hover:bg-white/10 hover:text-white transition-all bg-white/5" title="LeetCode">
                               <Code size={16} />
                           </a>
                       </div>
                   </div>

                   <div className="relative p-6 md:p-8 flex-grow flex flex-col justify-center">
                       <CardBackground />
                       <div className="relative z-10 space-y-4 text-textMuted text-sm md:text-base leading-relaxed font-medium text-justify"
                        dangerouslySetInnerHTML={{ __html: profile?.aboutBio || "Bio content loading or not available." }}
                       >
                       </div>
                   </div>
               </div>
             </ScrollReveal>

             <ScrollReveal animation="fade-up" delay={300}>
               <a href={resumeUrl} download target="_blank" rel="noopener noreferrer" className="btn btn-white w-full rounded-full flex items-center justify-center gap-3 uppercase tracking-wider text-sm !py-4 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]">
                  {profile?.button || "Download Resume"} <Download size={18} />
               </a>
             </ScrollReveal>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12">
            <ScrollReveal animation="slide-left" distance={30}>
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 font-display mb-6 uppercase tracking-tight">
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70"><GraduationCap size={18} /></span>
                Education
            </h3>
            </ScrollReveal>
            
            {loadingEdu ? (
                <StatusBlock loading={true} text="Fetching Education..." />
            ) : education.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {education.map((edu, idx) => (
                        <ScrollReveal key={edu.id} animation="fade-up" delay={idx * 150} distance={40}>
                        <TiltCard className="h-full">
                            <div className="group relative bg-[#080808] border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_0_25px_-10px_rgba(255,255,255,0.1)] overflow-hidden">
                                <CardBackground />
                                <div className="relative z-10 mb-6 flex justify-between items-start">
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                                        <GraduationCap size={20} className="text-white/70 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest border border-white/10 bg-black px-2 py-1 rounded">{edu.year}</span>
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <h4 className="text-lg font-bold text-white leading-tight mb-2">{edu.degree}</h4>
                                    <p className="text-sm font-medium text-white/60 mb-4">{edu.institution}</p>
                                    <div className="w-full h-px bg-white/5 mb-4"></div>
                                    <p className="text-xs text-textMuted leading-relaxed">{edu.description}</p>
                                </div>
                            </div>
                        </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>
            ) : (
                <StatusBlock loading={false} text="No Education Records Found" />
            )}
        </div>

        {/* Certifications Section */}
        <div className="mb-12">
            <ScrollReveal animation="slide-left" distance={30}>
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 font-display mb-6 uppercase tracking-tight">
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70"><Award size={18} /></span>
                Certifications
            </h3>
            </ScrollReveal>
            
            {loadingCerts ? (
                <StatusBlock loading={true} text="Fetching Certifications..." />
            ) : certifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert, idx) => (
                        <ScrollReveal key={cert.id} animation="blur-in" delay={idx * 100}>
                        <TiltCard className="h-full">
                            <div className="group relative bg-[#080808] border border-white/20 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col h-full shadow-[0_0_20px_-10px_rgba(255,255,255,0.05)]">
                                <CardBackground />
                                <div className="relative z-10 p-6 flex items-start justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2 block">Credentials</span>
                                        <h4 className="text-lg font-bold text-white leading-snug mb-1 transition-all">{cert.name}</h4>
                                        <p className="text-xs text-textMuted mt-2">Issued by <span className="text-white">{cert.issuer}</span></p>
                                    </div>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black hover:border-white transition-all shrink-0">
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>
            ) : (
                <StatusBlock loading={false} text="No Certifications Found" />
            )}
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
            <ScrollReveal animation="slide-left" distance={30}>
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 font-display mb-6 uppercase tracking-tight">
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70"><Trophy size={18} /></span>
                Achievements
            </h3>
            </ScrollReveal>
            
            {loadingAchieve ? (
                <StatusBlock loading={true} text="Fetching Achievements..." />
            ) : achievements.length > 0 ? (
                <ScrollReveal animation="fade-up" delay={100}>
                    <TiltCard>
                        <div className="bg-[#080808] border border-white/20 rounded-3xl p-8 md:p-10 relative overflow-hidden group shadow-2xl hover:border-white/40 transition-all">
                            <CardBackground />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
                            
                            <div className="relative z-10 grid gap-8">
                                {achievements.map((ach, idx) => (
                                    <React.Fragment key={ach.id}>
                                        <div className="flex gap-6 items-start">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors shrink-0 shadow-inner">
                                                {getIcon(ach.icon, { size: 20 })}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg mb-1">{ach.title}</h4>
                                                <p className="text-textMuted text-sm leading-relaxed">{ach.description}</p>
                                            </div>
                                        </div>
                                        {idx < achievements.length - 1 && (
                                            <div className="w-full h-px bg-white/5"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </TiltCard>
                </ScrollReveal>
            ) : (
                <StatusBlock loading={false} text="No Achievements Found" />
            )}
        </div>
      </div>
    </div>
  );
};

export default About;
