
import React, { useState } from 'react';
import { Search, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOGS } from '../constants';
import { Link } from 'react-router-dom';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = BLOGS.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-secondary uppercase tracking-wider mb-6">
                  <BookOpen size={14} /> Knowledge Base
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                  Thoughts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Insights</span>
              </h1>
              <p className="text-textMuted font-medium text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Deep dives into AI, Engineering, and the future of tech.
              </p>
              
              <div className="max-w-lg mx-auto relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-textMuted w-5 h-5 group-focus-within:text-white transition-colors z-10" />
                  <input 
                      type="text" 
                      placeholder="Search articles..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-medium placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-[#0f0f0f] transition-all shadow-xl"
                  />
              </div>
          </div>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
                <ScrollReveal key={blog.id} animation="blur-in" delay={idx * 150}>
                  <TiltCard className="h-full">
                      <article className="relative group rounded-3xl bg-[#050505] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 h-full flex flex-col">
                          
                          <CardBackground />
                          
                          <div className="aspect-[16/10] overflow-hidden relative z-10 border-b border-white/5">
                              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white z-20 shadow-lg">
                                  {blog.category}
                              </div>
                              <img 
                                  src={blog.image} 
                                  alt={blog.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                          </div>
                          
                          <div className="p-8 relative z-10 flex flex-col flex-grow bg-gradient-to-b from-[#050505] to-transparent -mt-10">
                              <div className="flex items-center gap-3 mb-4 text-xs font-bold text-primary/80 uppercase tracking-wider">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                  <span>{blog.date}</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                                  {blog.title}
                              </h3>
                              <p className="text-textMuted text-sm font-medium mb-6 line-clamp-3 leading-relaxed">
                                  {blog.excerpt}
                              </p>
                              <div className="mt-auto">
                                  <Link 
                                      to={`/blogs/${blog.id}`} 
                                      className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary pb-0.5"
                                  >
                                      Read Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </Link>
                              </div>
                          </div>
                      </article>
                  </TiltCard>
                </ScrollReveal>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
