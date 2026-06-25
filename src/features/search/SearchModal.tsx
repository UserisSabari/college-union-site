import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from './useSearch';
import { SearchResult } from './SearchResult';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by navbar toggle usually, but support direct toggle here too
          // since this listener is mounted, if closed we won't receive it unless it is mounted.
          // That is fine, we mount this in PageWrapper or App so it's always listening.
        }
      } else if (e.key === 'Escape') {
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const hasResults =
    results.members.length > 0 ||
    results.events.length > 0 ||
    results.notices.length > 0 ||
    results.initiatives.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-10 pt-20 sm:pt-28"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="bg-white max-w-2xl w-full rounded-card overflow-hidden shadow-premium flex flex-col max-h-[70vh] border border-border"
          >
            {/* Input Header bar */}
            <div className="relative border-b border-border p-4 flex items-center">
              <svg className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              <input
                ref={inputRef}
                type="text"
                placeholder="Search members, events, notices, projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-1 text-sm sm:text-base font-body focus:outline-none placeholder-slate-400 bg-transparent text-navy"
              />

              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-4xs font-mono text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded bg-slate-50 select-none">
                  ESC
                </span>
              )}
            </div>

            {/* Results scroll container */}
            <div className="flex-grow overflow-y-auto p-4 space-y-5">
              {query.trim() === '' ? (
                <div className="text-center py-10 text-slate-400 font-body text-xs select-none">
                  Type something to search the College Union database.
                </div>
              ) : hasResults ? (
                <div className="space-y-4">
                  {/* Members Group */}
                  {results.members.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-4xs font-bold text-navy uppercase tracking-widest px-3 select-none">
                        Union Members
                      </h4>
                      <div className="space-y-0.5">
                        {results.members.map((item) => (
                          <SearchResult key={item.id} item={item} query={query} onSelect={onClose} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events Group */}
                  {results.events.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-4xs font-bold text-crimson uppercase tracking-widest px-3 select-none">
                        Events & Festivals
                      </h4>
                      <div className="space-y-0.5">
                        {results.events.map((item) => (
                          <SearchResult key={item.id} item={item} query={query} onSelect={onClose} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notices Group */}
                  {results.notices.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-4xs font-bold text-yellow-600 uppercase tracking-widest px-3 select-none">
                        Notices & Circulars
                      </h4>
                      <div className="space-y-0.5">
                        {results.notices.map((item) => (
                          <SearchResult key={item.id} item={item} query={query} onSelect={onClose} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Initiatives Group */}
                  {results.initiatives.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-4xs font-bold text-green-600 uppercase tracking-widest px-3 select-none">
                        Union Initiatives
                      </h4>
                      <div className="space-y-0.5">
                        {results.initiatives.map((item) => (
                          <SearchResult key={item.id} item={item} query={query} onSelect={onClose} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 select-none border border-dashed border-border rounded-card">
                  <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-display font-bold text-navy text-sm mb-0.5">No results for "{query}"</h4>
                  <p className="text-textSecondary text-xs font-body">Check spelling or try other keywords.</p>
                </div>
              )}
            </div>
            
            {/* Modal Keyboard Helper Footer */}
            <div className="bg-slate-50 border-t border-border p-3 flex justify-between items-center text-4xs font-mono text-slate-400 select-none">
              <span>Use arrows to navigate</span>
              <span>Press ESC to close</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
