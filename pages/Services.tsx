
import React from 'react';
import { PenTool, Monitor, Smartphone, Globe, BarChart3, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_LIST = [
  {
    icon: <PenTool size={32} />,
    title: 'Brand Identity',
    desc: 'Crafting unique and memorable brand identities that resonate with your audience. Logo, typography, and color palette systems.',
    color: 'bg-retroPink'
  },
  {
    icon: <Monitor size={32} />,
    title: 'Web Design',
    desc: 'Designing responsive, accessible, and high-converting websites that look great on all devices.',
    color: 'bg-retroGreen'
  },
  {
    icon: <Smartphone size={32} />,
    title: 'Mobile Apps',
    desc: 'User-centric mobile application design focusing on intuitive navigation and seamless experiences.',
    color: 'bg-retroYellow'
  },
  {
    icon: <Globe size={32} />,
    title: 'Development',
    desc: 'Turning designs into pixel-perfect, clean code using modern frameworks like React and Tailwind CSS.',
    color: 'bg-accent'
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'SEO & Analytics',
    desc: 'Optimizing your digital presence for search engines and setting up tracking to measure success.',
    color: 'bg-retroBlue'
  },
  {
    icon: <Camera size={32} />,
    title: 'Content Creation',
    desc: 'Producing high-quality visual and written content to engage your audience and tell your story.',
    color: 'bg-retroOrange'
  }
];

const Services: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 font-display uppercase lg:whitespace-nowrap">
                What can I do <span className="bg-retroYellow px-3 border-2 border-black inline-block transform -rotate-2 shadow-retro-sm">for you?</span>
            </h1>
            <p className="text-black font-medium text-lg max-w-2xl mx-auto">
                We provide a full range of digital services to help you build, grow, and scale your business online with a focus on Brutalism and Usability.
            </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {SERVICES_LIST.map((service, idx) => (
                <div key={idx} className="bg-white border-2 border-black p-8 shadow-retro hover:shadow-retro-lg transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
                    {/* Hover Pattern Background */}
                    <div className="absolute inset-0 bg-grid-small opacity-40 transition-opacity pointer-events-none mask-gradient-to-b"></div>
                    
                    <div className={`w-16 h-16 ${service.color} border-2 border-black rounded-xl flex items-center justify-center text-black mb-6 shadow-retro-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10`}>
                        {React.cloneElement(service.icon as React.ReactElement<any>, { strokeWidth: 2.5 })}
                    </div>
                    <h3 className="text-2xl font-black text-black mb-3 font-display uppercase relative z-10">{service.title}</h3>
                    <p className="text-black font-medium text-sm leading-relaxed mb-6 relative z-10">{service.desc}</p>
                    <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:text-accent hover:border-accent transition-colors relative z-10 group-btn">
                        Start Project <ArrowRight size={14} className="group-btn-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            ))}
        </div>

        {/* Process Section */}
        <div className="bg-white border-2 border-black p-10 md:p-16 shadow-retro-lg relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-small opacity-40 pointer-events-none mask-gradient-to-b"></div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-retroGreen rounded-full opacity-20 -mr-20 -mt-20 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-retroPink rounded-full opacity-20 -ml-20 -mb-20 blur-3xl"></div>
             
             <div className="relative z-10">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-black text-black mb-4 font-display uppercase">My Working Process</h2>
                     <p className="text-textMuted font-bold uppercase tracking-widest text-xs">From concept to final launch</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                     {/* Connecting Line (Desktop) */}
                     <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 border-t-2 border-dashed border-black -z-10"></div>

                     {[
                         { step: '01', title: 'Discover', desc: 'Understanding your goals and user needs.' },
                         { step: '02', title: 'Strategy', desc: 'Planning the roadmap and architecture.' },
                         { step: '03', title: 'Design', desc: 'Crafting visuals and prototypes.' },
                         { step: '04', title: 'Develop', desc: 'Building and launching the final product.' }
                     ].map((item, idx) => (
                         <div key={idx} className="relative group">
                             <div className="w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl font-black shadow-retro-sm mb-6 mx-auto group-hover:scale-110 group-hover:bg-retroYellow transition-all duration-300 z-10 relative">
                                {item.step}
                             </div>
                             <div className="text-center px-2">
                                <h3 className="text-xl font-black text-black mb-2 uppercase">{item.title}</h3>
                                <p className="text-sm font-medium text-textMuted">{item.desc}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
