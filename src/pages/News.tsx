import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import announcementsData from '../data/announcements.json';
import type { Announcement } from '../types';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'notice', label: 'Notices' },
  { id: 'event', label: 'Events' },
  { id: 'achievement', label: 'Achievements' },
  { id: 'general', label: 'General' },
] as const;

type CategoryType = typeof CATEGORIES[number]['id'];

export const News = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(6);
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Parse and sort announcements: newest first
  const allAnnouncements = (announcementsData as Announcement[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pinned announcements (always shown at top if they match search, ignoring category filter)
  const pinnedAnnouncements = allAnnouncements.filter(
    (item) =>
      item.isPinned &&
      (searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Normal feed announcements (excluding pinned)
  const feedAnnouncements = allAnnouncements.filter((item) => {
    if (item.isPinned) return false;

    // Filter by category
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;

    // Filter by search query
    if (searchQuery !== '') {
      const query = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesBody = item.body.toLowerCase().includes(query);
      const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(query));
      if (!matchesTitle && !matchesBody && !matchesTags) return false;
    }

    return true;
  });

  // Paginated feed
  const paginatedFeed = feedAnnouncements.slice(0, visibleLimit);

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleLimit(6);
  }, [activeCategory, searchQuery]);

  // Click outside modal handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedNotice &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedNotice(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedNotice]);

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedNotice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedNotice]);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Category Theme Mapper
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'notice':
        return {
          bg: 'bg-navy text-white',
          border: 'border-navy',
          accent: 'text-navy',
          label: 'Notice',
        };
      case 'event':
        return {
          bg: 'bg-crimson text-white',
          border: 'border-crimson',
          accent: 'text-crimson',
          label: 'Event',
        };
      case 'achievement':
        return {
          bg: 'bg-[#D4AF37] text-navy',
          border: 'border-[#D4AF37]',
          accent: 'text-[#D4AF37]',
          label: 'Achievement',
        };
      default:
        return {
          bg: 'bg-slate-500 text-white',
          border: 'border-slate-300',
          accent: 'text-slate-600',
          label: 'General',
        };
    }
  };

  return (
    <div className="space-y-10 py-8 relative">
      <SEO title="News & Notices" description="Read latest notice notifications, announcements, achievement reviews, and events from GEC Palakkad College Union." />
      
      {/* Page Hero */}
      <section className="bg-navy dark:bg-darkSurface text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            News & Notices
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">News</span>
          </nav>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white dark:bg-darkCard border-y border-border dark:border-darkBorder py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Filter Chips */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin select-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all duration-200 focus:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-crimson text-white shadow-sm'
                    : 'bg-surface dark:bg-darkBg text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-darkSurface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border dark:border-darkBorder bg-white dark:bg-darkBg text-textPrimary dark:text-darkText rounded-button text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all duration-200"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Pinned Section */}
        {pinnedAnnouncements.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center space-x-2 select-none text-gold">
              <svg className="w-4 h-4 fill-current rotate-45" viewBox="0 0 20 20">
                <path d="M10.824 13.622l-1.414 1.414-3.078-3.078 1.414-1.414 3.078 3.078zm4.242-4.242l-1.414 1.414-3.078-3.078 1.414-1.414 3.078 3.078zm-1.5-6l3.586 3.586-1.5 1.5-3.586-3.586 1.5-1.5zm-5.742 7.158L3.54 14.824l1.414 1.414 4.286-4.286-1.414-1.414z" />
              </svg>
              <h2 className="font-display font-bold text-lg text-navy dark:text-white tracking-tight">Pinned Announcements</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedAnnouncements.map((item) => {
                const styles = getCategoryStyles(item.category);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-darkCard border-l-4 border-[#D4AF37] border-y border-r border-border dark:border-darkBorder rounded-r-card p-6 shadow-sm hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start select-none mb-3">
                        <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${styles.bg}`}>
                          {styles.label}
                        </span>
                        <span className="text-3xs font-medium text-textSecondary dark:text-slate-400">
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-navy dark:text-white text-base leading-snug hover:text-crimson cursor-pointer transition-colors mb-2" onClick={() => setSelectedNotice(item)}>
                        {item.title}
                      </h3>
                      <p className="text-textSecondary dark:text-slate-300 text-xs leading-relaxed font-body line-clamp-3 mb-4">
                        {item.body}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-darkBg text-slate-600 dark:text-slate-400 rounded text-3xs font-body">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-border dark:border-darkBorder select-none">
                        <button
                          onClick={() => setSelectedNotice(item)}
                          className="text-xs font-semibold text-crimson hover:text-navy dark:hover:text-white transition-colors flex items-center space-x-1"
                        >
                          <span>Read Full Story</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {item.attachment && (
                          <a
                            href={item.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                            title="Download PDF attachment"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Normal Announcement Feed */}
        <section className="space-y-6">
          <h2 className="font-display font-bold text-lg text-navy dark:text-white tracking-tight select-none">Latest Updates</h2>
          
          {feedAnnouncements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedFeed.map((item) => {
                const styles = getCategoryStyles(item.category);
                return (
                  <div
                    key={item.id}
                    className={`bg-white dark:bg-darkCard border border-border dark:border-darkBorder p-6 rounded-card shadow-sm hover:shadow-subtle transition-all duration-300 flex flex-col justify-between ${
                      item.isImportant ? 'border-l-4 border-l-crimson' : ''
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start select-none mb-3">
                        <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${styles.bg}`}>
                          {styles.label}
                        </span>
                        <span className="text-3xs font-medium text-textSecondary dark:text-slate-400">
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-navy dark:text-white text-base leading-snug hover:text-crimson cursor-pointer transition-colors mb-2" onClick={() => setSelectedNotice(item)}>
                        {item.title}
                      </h3>
                      <p className="text-textSecondary dark:text-slate-300 text-xs leading-relaxed font-body line-clamp-3 mb-4">
                        {item.body}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-darkBg text-slate-600 dark:text-slate-400 rounded text-3xs font-body">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-border dark:border-darkBorder select-none">
                        <button
                          onClick={() => setSelectedNotice(item)}
                          className="text-xs font-semibold text-crimson hover:text-navy dark:hover:text-white transition-colors flex items-center space-x-1"
                        >
                          <span>Read Details</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {item.attachment && (
                          <a
                            href={item.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                            title="Download PDF attachment"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            pinnedAnnouncements.length === 0 && (
              <div className="text-center py-20 border border-dashed border-border dark:border-darkBorder rounded-card select-none">
                <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-display font-bold text-navy dark:text-white text-base mb-1">No Notices Found</h3>
                <p className="text-textSecondary dark:text-slate-400 text-xs font-body max-w-xs mx-auto">
                  Try adjusting your filters or keyword search query.
                </p>
              </div>
            )
          )}

          {/* Load More Button */}
          {feedAnnouncements.length > visibleLimit && (
            <div className="flex justify-center pt-8 select-none">
              <Button
                onClick={() => setVisibleLimit((prev) => prev + 6)}
                variant="primary"
                size="md"
              >
                Load More Updates
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Details Lightbox Modal Popup */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-darkCard max-w-2xl w-full rounded-card overflow-hidden shadow-premium flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border dark:border-darkBorder flex justify-between items-start bg-slate-50 dark:bg-darkSurface select-none">
                <div>
                  <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${getCategoryStyles(selectedNotice.category).bg}`}>
                    {getCategoryStyles(selectedNotice.category).label}
                  </span>
                  {selectedNotice.isImportant && (
                    <span className="ml-2 px-2 py-0.5 bg-crimson/10 text-crimson rounded text-3xs font-bold uppercase tracking-wider">
                      Important
                    </span>
                  )}
                  <p className="text-3xs font-medium text-textSecondary dark:text-slate-400 mt-2">
                    Published on {formatDate(selectedNotice.publishedAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors focus:outline-none"
                  aria-label="Close Announcement Dialog"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <h2 className="font-display font-extrabold text-navy dark:text-white text-lg sm:text-xl leading-tight">
                  {selectedNotice.title}
                </h2>
                
                {/* Description */}
                <p className="text-textSecondary dark:text-slate-300 text-sm leading-relaxed font-body whitespace-pre-line">
                  {selectedNotice.body}
                </p>

                {/* Attachments */}
                {selectedNotice.attachment && (
                  <div className="bg-surface dark:bg-darkBg border border-border dark:border-darkBorder p-4 rounded-card flex items-center justify-between select-none">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-crimson/10 text-crimson rounded">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy dark:text-white">Official Reference Document</h4>
                        <p className="text-3xs text-textSecondary dark:text-slate-400">PDF Document Format</p>
                      </div>
                    </div>
                    <Button
                      href={selectedNotice.attachment}
                      variant="secondary"
                      size="sm"
                    >
                      Download PDF
                    </Button>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 select-none pt-4 border-t border-border dark:border-darkBorder">
                  {selectedNotice.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-darkBg text-slate-600 dark:text-slate-400 rounded text-xs font-body">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default News;
