import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, BookOpen, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data/posts';
import { tutorials } from '../data/tutorials';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Close on Escape key
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onClose]);

  const handleSelect = (id: string, type: 'blog' | 'tutorial' | 'direct') => {
    let path = '';
    if (type === 'blog') path = `/blog/${id}`;
    else if (type === 'tutorial') path = `/tutorials/${id}`;
    else path = id; // Direct path for quick links

    navigate(path);
    onClose();
    setSearch('');
  };

  const quickLinks = [
    { label: 'Lawyer SEO Guide', path: '/tutorials/overview-seo-for-lawyers', icon: BookOpen },
    { label: 'Strategic Marketing Playbook', path: '/blog/law-firm-marketing-strategies', icon: FileText },
    { label: 'Google Business Profile Guide', path: '/blog/google-my-business-for-lawyers', icon: Search },
    { label: 'AI Authority & Search', path: '/blog/law-firm-ai-authority-search-optimization', icon: ArrowRight },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm" 
            onClick={onClose}
          />

          {/* Search Dropdown / Panel */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[130] bg-[#080808] border-b border-white/5 shadow-2xl"
          >
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">
              <Command label="Global Search" className="flex flex-col h-full bg-transparent">
                {/* Search Input Row */}
                <div className="flex items-center gap-4 mb-10">
                  <Search className="h-7 w-7 text-white/40" />
                  <Command.Input
                    autoFocus
                    placeholder="Search lawyer-marketing.my"
                    className="flex-1 bg-transparent text-3xl md:text-5xl text-white outline-none placeholder:text-white/20 font-serif tracking-tight"
                    value={search}
                    onValueChange={setSearch}
                  />
                  <button 
                    onClick={onClose}
                    className="group rounded-full p-2 text-white/40 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  {/* Left Column: Results or Quick Links */}
                  <div className="md:col-span-8">
                    <Command.List className="max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                      {search === '' ? (
                        <div className="space-y-6">
                           <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-4">Quick Links</h2>
                           <div className="space-y-2">
                             {quickLinks.map((link) => (
                               <button
                                 key={link.path}
                                 onClick={() => handleSelect(link.path, 'direct')}
                                 className="flex items-center gap-4 w-full group px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all text-left"
                               >
                                 <link.icon className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                 <span className="text-lg md:text-xl font-medium tracking-tight">{link.label}</span>
                               </button>
                             ))}
                           </div>
                        </div>
                      ) : (
                        <>
                          <Command.Empty className="text-center py-12">
                            <p className="text-white/40 text-lg">No results for "{search}"</p>
                          </Command.Empty>

                          {/* Blogs Group */}
                          <Command.Group heading={<span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent px-4 mb-4 block">Strategic Deep Dives</span>}>
                            <div className="space-y-1">
                              {blogPosts.map((post) => (
                                <Command.Item
                                  key={post.id}
                                  value={post.title}
                                  onSelect={() => handleSelect(post.id, 'blog')}
                                  className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-white/60 aria-selected:bg-white/5 aria-selected:text-white transition-all"
                                >
                                  <FileText className="h-5 w-5 shrink-0 opacity-40" />
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-lg font-medium truncate tracking-tight">{post.title}</span>
                                    <span className="text-sm text-white/30 line-clamp-1 italic font-light">{post.excerpt}</span>
                                  </div>
                                </Command.Item>
                              ))}
                            </div>
                          </Command.Group>

                          {/* Tutorials Group */}
                          {tutorials && tutorials.length > 0 && (
                            <Command.Group heading={<span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent px-4 mb-4 mt-8 block">Video Tutorials</span>}>
                              <div className="space-y-1">
                                {tutorials.map((tutorial) => (
                                  <Command.Item
                                    key={tutorial.id}
                                    value={tutorial.title}
                                    onSelect={() => handleSelect(tutorial.id, 'tutorial')}
                                    className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-white/60 aria-selected:bg-white/5 aria-selected:text-white transition-all"
                                  >
                                    <BookOpen className="h-5 w-5 shrink-0 opacity-40" />
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-lg font-medium truncate tracking-tight">{tutorial.title}</span>
                                      <span className="text-sm text-white/30 line-clamp-1 italic font-light">{tutorial.excerpt || tutorial.description}</span>
                                    </div>
                                  </Command.Item>
                                ))}
                              </div>
                            </Command.Group>
                          )}
                        </>
                      )}
                    </Command.List>
                  </div>

                  {/* Right Column: Featured (Optional/Decoration) */}
                  <div className="hidden md:block md:col-span-4 border-l border-white/5 pl-12">
                     <div className="space-y-8">
                        <div>
                          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-6">Masterclass</h3>
                          <div className="aspect-video rounded-xl bg-white/5 overflow-hidden border border-white/5 group cursor-pointer relative" onClick={() => handleSelect('/tutorials/overview-seo-for-lawyers', 'direct')}>
                             <img src="/images/tutorials/tut1_seo_concept_malaysian_v2.png" alt="Featured" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-12 w-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/40 text-accent">
                                   <BookOpen className="h-6 w-6" />
                                </div>
                             </div>
                          </div>
                        </div>
                        <p className="text-sm text-white/30 leading-relaxed font-light italic">
                          "Success in legal marketing isn't about chasing traffic—it's about building an authority machine."
                        </p>
                     </div>
                  </div>
                </div>
              </Command>
            </div>
            
            {/* Bottom Glow bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 shadow-[0_0_20px_rgba(201,169,97,0.3)]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
