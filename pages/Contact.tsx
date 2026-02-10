
import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle, Loader2, Send, MessageSquare, AlertTriangle } from 'lucide-react';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import { pb } from '../lib/pocketbase';
import { Faq } from '../types';

const Contact: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        // Fetch FAQs from PocketBase, sorted by creation date
        const records = await pb.collection('faqs').getList<Faq>(1, 50, { sort: '+created' });
        setFaqs(records.items);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
        // Create record in 'messages' collection
        await pb.collection('messages').create(formData);

        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
        console.error("Submission error:", error);
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-primary uppercase tracking-wider mb-6">
                  <MessageSquare size={14} /> Let's Chat
               </div>
               <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                  Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
               </h1>
               <p className="text-textMuted text-lg font-medium">Have a project in mind? Let's build something great together.</p>
          </div>
        </ScrollReveal>

        {/* Form Section - Centered */}
        <div className="max-w-3xl mx-auto mb-16">
            <ScrollReveal animation="blur-in" duration={1000}>
              <div className="rounded-[2rem] bg-[#000000] border border-white/10 shadow-2xl overflow-hidden relative">
                  <div className="p-8 md:p-12 relative group">
                      <CardBackground />
                      
                      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
                          <Send size={150} />
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wide ml-1">Name</label>
                                  <input 
                                      type="text" 
                                      name="name" 
                                      value={formData.name} 
                                      onChange={handleInputChange} 
                                      className="w-full bg-black focus:bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600 font-medium hover:border-white/30 z-20 relative" 
                                      placeholder="Your Name" 
                                      required 
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wide ml-1">Email</label>
                                  <input 
                                      type="email" 
                                      name="email" 
                                      value={formData.email} 
                                      onChange={handleInputChange} 
                                      className="w-full bg-black focus:bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600 font-medium hover:border-white/30 z-20 relative" 
                                      placeholder="email@example.com" 
                                      required 
                                  />
                              </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wide ml-1">Company (Optional)</label>
                                  <input 
                                      type="text" 
                                      name="phone" 
                                      value={formData.phone} 
                                      onChange={handleInputChange} 
                                      className="w-full bg-black focus:bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600 font-medium hover:border-white/30 z-20 relative" 
                                      placeholder="Your Company" 
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wide ml-1">Subject</label>
                                  <input 
                                      type="text" 
                                      name="subject" 
                                      value={formData.subject} 
                                      onChange={handleInputChange} 
                                      className="w-full bg-black focus:bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/50 transition-all placeholder:text-gray-600 font-medium hover:border-white/30 z-20 relative" 
                                      placeholder="Hiring / Project Inquiry" 
                                  />
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wide ml-1">Message</label>
                              <textarea 
                                  name="message" 
                                  value={formData.message} 
                                  onChange={handleInputChange} 
                                  rows={6} 
                                  className="w-full bg-black focus:bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/50 transition-all resize-none placeholder:text-gray-600 font-medium hover:border-white/30 z-20 relative" 
                                  placeholder="Tell me about the opportunity..." 
                                  required
                              ></textarea>
                          </div>
                          
                          <button 
                              type="submit" 
                              disabled={formStatus === 'sending'} 
                              className="w-full py-4 rounded-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg font-bold text-lg border transition-all duration-300 bg-black text-white border-white hover:bg-white hover:text-black hover:border-white relative z-20"
                          >
                             {formStatus === 'sending' ? (
                                 <div className="flex items-center justify-center gap-2"><Loader2 size={20} className="animate-spin" /> Sending...</div>
                             ) : formStatus === 'success' ? (
                                 <div className="flex items-center justify-center gap-2 text-green-400"><CheckCircle size={20} /> Sent Successfully</div>
                             ) : formStatus === 'error' ? (
                                 <div className="flex items-center justify-center gap-2 text-red-400"><AlertTriangle size={20} /> Failed. Try Again.</div>
                             ) : (
                                 'Send Message'
                             )}
                          </button>
                      </form>
                  </div>
              </div>
            </ScrollReveal>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <h2 className="text-2xl font-bold text-white text-center mb-4 font-display uppercase tracking-tight">Frequently Asked Questions</h2>
              <p className="text-center text-textMuted text-sm mb-8 font-medium">Common queries about my expertise.</p>
            </ScrollReveal>
            
            <div className="space-y-4">
                {faqs.length > 0 ? faqs.map((faq, idx) => (
                    <ScrollReveal key={faq.id} animation="slide-left" delay={idx * 100} distance={30}>
                      <SpotlightCard className="rounded-2xl bg-[#000000] border border-white/5 overflow-hidden group hover:border-white/10 transition-all">
                          <button 
                              onClick={() => toggleFaq(idx)}
                              className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors relative z-10"
                          >
                              <span className="font-bold text-white text-sm md:text-base pr-8">{faq.question}</span>
                              <div className={`text-textMuted transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-primary' : ''}`}>
                                  <ChevronDown size={20} />
                              </div>
                          </button>
                          <div 
                              className={`px-6 transition-all duration-300 ease-in-out overflow-hidden relative z-10 bg-black/20 ${activeFaq === idx ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                          >
                              <p className="text-textMuted text-sm leading-relaxed pt-2">{faq.answer}</p>
                          </div>
                      </SpotlightCard>
                    </ScrollReveal>
                )) : (
                    <div className="text-center text-textMuted text-sm py-10">
                        No FAQs available at the moment.
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
