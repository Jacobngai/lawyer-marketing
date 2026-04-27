import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, BookOpen, X } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSelect = (id: string, type: 'blog' | 'tutorial') => {
    const path = type === 'blog' ? `/blog/${id}` : `/tutorials/${id}`;
    navigate(path);
    onClose();
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Command Center */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0A0F1D] shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] animate-in zoom-in-95 slide-in-from-top-2 duration-300">
        <Command label="Global Search" className="flex flex-col h-full">
          <div className="flex items-center border-b border-white/10 px-4 py-4">
            <Search className="mr-3 h-5 w-5 text-amber-500/70" />
            <Command.Input
              autoFocus
              placeholder="Search guides, strategies, tutorials..."
              className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-slate-500 font-light"
              value={search}
              onValueChange={setSearch}
            />
            <button 
              onClick={onClose}
              className="ml-2 rounded-lg p-1 text-slate-500 hover:bg-white/5 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-amber-500/20">
            <Command.Empty className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-white/5 p-4 mb-4">
                <Search className="h-8 w-8 text-slate-600" />
              </div>
              <p className="text-slate-400">No results found for "{search}"</p>
              <p className="text-sm text-slate-600 mt-1">Try searching for "SEO", "AI", or "Strategy"</p>
            </Command.Empty>

            {/* Blogs Group */}
            <Command.Group heading={<span className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-amber-500/50">Strategic Blogs</span>}>
              {blogPosts.map((post) => (
                <Command.Item
                  key={post.id}
                  value={post.title}
                  onSelect={() => handleSelect(post.id, 'blog')}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-slate-300 aria-selected:bg-white/5 aria-selected:text-amber-400 transition-all duration-200"
                >
                  <FileText className="h-5 w-5 opacity-60" />
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-xs text-slate-500 line-clamp-1 italic">{post.excerpt}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Tutorials Group */}
            {tutorials && tutorials.length > 0 && (
              <Command.Group heading={<span className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-blue-500/50 mt-4">Video Tutorials</span>}>
                {tutorials.map((tutorial) => (
                  <Command.Item
                    key={tutorial.id}
                    value={tutorial.title}
                    onSelect={() => handleSelect(tutorial.id, 'tutorial')}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-slate-300 aria-selected:bg-white/5 aria-selected:text-blue-400 transition-all duration-200"
                  >
                    <BookOpen className="h-5 w-5 opacity-60" />
                    <div className="flex flex-col">
                      <span className="font-medium">{tutorial.title}</span>
                      <span className="text-xs text-slate-500 line-clamp-1 font-light italic">{tutorial.excerpt || tutorial.description}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-[10px] text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-sans border border-white/10 uppercase">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-sans border border-white/10 uppercase">Enter</kbd> Select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-sans border border-white/10 uppercase">Esc</kbd> Close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
};
