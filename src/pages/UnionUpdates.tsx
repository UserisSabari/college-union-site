import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import announcementsData from '../data/announcements.json';
import initiativesData from '../data/initiatives.json';
import type { Announcement } from '../types';

interface DocumentInfo {
  name: string;
  url: string;
  size?: string;
}

interface InitiativeItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  impactMetrics?: string[];
  gallery?: string[];
  documents?: DocumentInfo[];
  year: string;
}

// Unified Union Update interface
interface UpdateItem {
  id: string;
  title: string;
  body: string;
  category: 'notice' | 'achievement' | 'general' | 'initiative';
  isPinned: boolean;
  isImportant: boolean;
  publishedAt: string;
  attachment?: string;
  gallery?: string[];
  status?: 'active' | 'completed' | 'planned';
  impactMetrics?: string[];
  documents?: DocumentInfo[];
  tags: string[];
  year: string;
  type: 'announcement' | 'initiative';
}

const CATEGORIES = [
  { id: 'all', label: 'All Updates' },
  { id: 'notice', label: 'Notices' },
  { id: 'initiative', label: 'Welfare Initiatives' },
  { id: 'achievement', label: 'Achievements' },
  { id: 'general', label: 'General' },
] as const;

type CategoryType = typeof CATEGORIES[number]['id'];

export const UnionUpdates = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(6);
  const [selectedNotice, setSelectedNotice] = useState<UpdateItem | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Map and sort combined updates
  const mappedAnnouncements: UpdateItem[] = (announcementsData as Announcement[]).map((a) => ({
    ...a,
    type: 'announcement' as const,
    category: a.category as 'notice' | 'achievement' | 'general',
    body: a.body,
    isPinned: a.isPinned || false,
    isImportant: a.isImportant || false,
  }));

  const mappedInitiatives: UpdateItem[] = ([...(initiativesData as InitiativeItem[])].reverse()).map((i) => ({
    id: i.id,
    title: i.title,
    body: i.description,
    category: 'initiative' as const,
    isPinned: false,
    isImportant: false,
    publishedAt: '2026-06-01T00:00:00Z', // Baseline fallback date
    gallery: i.gallery || [],
    status: i.status,
    impactMetrics: i.impactMetrics || [],
    documents: i.documents || [],
    tags: ['Initiative', i.status],
    year: i.year,
    type: 'initiative' as const,
  }));

  const allUpdates = [...mappedAnnouncements, ...mappedInitiatives].sort((a, b) => {
    // Keep announcements sorted by date; initiatives are placed right after pinned ones
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Pinned updates (announcements only)
  const pinnedUpdates = allUpdates.filter(
    (item) =>
      item.isPinned &&
      (searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Normal updates feed
  const feedUpdates = allUpdates.filter((item) => {
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

  const paginatedFeed = feedUpdates.slice(0, visibleLimit);

  // Reset limit when filter changes
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

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'notice':
        return {
          bg: 'bg-navy text-white',
          border: 'border-navy',
          accent: 'text-navy',
          label: 'Notice',
        };
      case 'initiative':
        return {
          bg: 'bg-crimson text-white',
          border: 'border-crimson border-t-4',
          accent: 'text-crimson',
          label: 'Initiative',
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-crimson/10 text-crimson dark:bg-crimson/20 dark:text-crimson',
          label: 'Active',
        };
      case 'completed':
        return {
          bg: 'bg-navy/10 text-navy dark:bg-navy/30 dark:text-slate-300',
          label: 'Completed',
        };
      default:
        return {
          bg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-500',
          label: 'Planned',
        };
    }
  };

  return (
    <div className="space-y-10 py-8 relative">
      <SEO title="Union Updates" description="Read latest notice notifications, announcements, welfare initiatives, and student updates from GEC Palakkad College Union." />

      {/* Page Hero with bulletin motif */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#16233e] to-slate-900 text-white py-14 md:py-20 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-border/40 dark:border-darkBorder rounded-b-card shadow-md">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-2xs font-semibold uppercase tracking-wider text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
              Live Union Bulletin
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              News, Notices & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-crimson">Initiatives</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-body leading-relaxed">
              Official circulars, student welfare projects, academic notifications, and campus event dispatches from the Secular College Union.
            </p>
            <nav className="text-xs sm:text-sm font-body font-medium text-slate-400 pt-1">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-slate-200">Updates</span>
            </nav>
          </div>

          {/* Quick info counter card */}
          <div className="hidden lg:flex flex-col gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-card min-w-[220px]">
            <div className="text-2xs text-slate-400 uppercase tracking-widest font-bold">Bulletin Stats</div>
            <div className="text-xl font-display font-bold text-white">{allUpdates.length} Total Dispatches</div>
            <div className="text-3xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {pinnedUpdates.length} Pinned Priority Items
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter & Search Bar */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white dark:bg-darkCard border-y border-border dark:border-darkBorder py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Chips */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin select-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all duration-200 focus:outline-none whitespace-nowrap ${
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
              placeholder="Search updates..."
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
        {/* Pinned Announcements */}
        {pinnedUpdates.length > 0 && activeCategory === 'all' && (
          <section className="space-y-4">
            <div className="flex items-center space-x-2 select-none text-gold">
              <svg className="w-4 h-4 fill-current rotate-45" viewBox="0 0 20 20">
                <path d="M10.824 13.622l-1.414 1.414-3.078-3.078 1.414-1.414 3.078 3.078zm4.242-4.242l-1.414 1.414-3.078-3.078 1.414-1.414 3.078 3.078zm-1.5-6l3.586 3.586-1.5 1.5-3.586-3.586 1.5-1.5zm-5.742 7.158L3.54 14.824l1.414 1.414 4.286-4.286-1.414-1.414z" />
              </svg>
              <h2 className="font-display font-bold text-lg text-navy dark:text-white tracking-tight">Pinned Announcements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedUpdates.map((item) => {
                const styles = getCategoryStyles(item.category);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-darkCard border-l-4 border-[#D4AF37] border-y border-r border-border dark:border-darkBorder rounded-r-card p-6 shadow-sm hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
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
                      <h3
                        className="font-display font-bold text-navy dark:text-white text-base leading-snug hover:text-crimson cursor-pointer transition-colors mb-2"
                        onClick={() => setSelectedNotice(item)}
                      >
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

                      {/* Actions */}
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
                            title="Download attachment"
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

        {/* Regular Update Feed */}
        <section className="space-y-6">
          <h2 className="font-display font-bold text-lg text-navy dark:text-white tracking-tight select-none">Updates Feed</h2>

          {feedUpdates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedFeed.map((item) => {
                const styles = getCategoryStyles(item.category);

                // Rendering Initiative Type Card
                if (item.type === 'initiative') {
                  const statusCfg = getStatusConfig(item.status || 'planned');
                  const isExpanded = expandedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white dark:bg-darkCard rounded-card overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between p-6 border-t-4 ${styles.border}`}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start select-none">
                          <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${statusCfg.bg}`}>
                            {statusCfg.label}
                          </span>
                          <span className="text-3xs font-medium text-textSecondary dark:text-slate-400">
                            Term: {item.year}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-navy dark:text-white text-base sm:text-lg leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-textSecondary dark:text-slate-300 text-xs leading-relaxed font-body">
                          {item.body}
                        </p>

                        {/* Impact Metrics Row */}
                        {item.impactMetrics && item.impactMetrics.length > 0 && (
                          <div className="bg-slate-50 dark:bg-darkBg border border-slate-100 dark:border-darkBorder rounded-card p-4 select-none">
                            <h4 className="text-4xs font-bold text-navy dark:text-white uppercase tracking-widest mb-2 font-body">
                              Impact Metrics
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                              {item.impactMetrics.map((metric, i) => (
                                <div key={i} className="text-center p-1 border-r last:border-0 border-slate-200 dark:border-darkBorder">
                                  <p className="text-xs font-bold text-crimson font-body">{metric.split(' ')[0]}</p>
                                  <p className="text-[8px] text-textSecondary dark:text-slate-400 font-medium">{metric.split(' ').slice(1).join(' ')}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Expandable Media / Documents Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden space-y-6 pt-6 mt-6 border-t border-border dark:border-darkBorder"
                          >
                            {/* Gallery */}
                            {item.gallery && item.gallery.length > 0 && (
                              <div className="space-y-2 select-none">
                                <h4 className="text-4xs font-bold text-navy dark:text-white uppercase tracking-widest font-body">
                                  Progress & Site Gallery
                                </h4>
                                <div className="flex space-x-2">
                                  {item.gallery.map((img, index) => (
                                    <a
                                      key={index}
                                      href={img}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-20 h-16 rounded overflow-hidden border border-border dark:border-darkBorder bg-slate-100 dark:bg-darkBg"
                                    >
                                      <img src={img} alt="progress" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Reference Documents */}
                            {item.documents && item.documents.length > 0 && (
                              <div className="space-y-2 select-none">
                                <h4 className="text-4xs font-bold text-navy dark:text-white uppercase tracking-widest font-body">
                                  Reference Documents
                                </h4>
                                <div className="space-y-2">
                                  {item.documents.map((doc, index) => (
                                    <div key={index} className="flex justify-between items-center bg-slate-50 dark:bg-darkBg border border-slate-100 dark:border-darkBorder p-3 rounded-card text-2xs">
                                      <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-bold text-navy dark:text-white truncate max-w-[200px]">{doc.name}</span>
                                      </div>
                                      <Button href={doc.url} variant="secondary" size="sm">Download</Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pt-4 border-t border-border dark:border-darkBorder mt-6 flex justify-end select-none">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="text-xs font-bold text-crimson hover:text-navy dark:hover:text-white transition-colors flex items-center space-x-1"
                        >
                          <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                }

                // Rendering Standard Announcement Card
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder p-6 rounded-card shadow-sm hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
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
                      <h3
                        className="font-display font-bold text-navy dark:text-white text-base leading-snug hover:text-crimson cursor-pointer transition-colors mb-2"
                        onClick={() => setSelectedNotice(item)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-textSecondary dark:text-slate-300 text-xs leading-relaxed font-body line-clamp-3 mb-4">
                        {item.body}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-darkBg text-slate-600 dark:text-slate-400 rounded text-3xs font-body">
                            #{tag}
                          </span>
                        ))}
                      </div>

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
                            title="Download attachment"
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20 border border-dashed border-border dark:border-darkBorder rounded-card select-none"
            >
              {/* Illustrated icon */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-darkSurface flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-crimson/10 dark:bg-crimson/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <svg className="w-3 h-3 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="font-display font-bold text-navy dark:text-white text-lg mb-2">No Updates Found</h3>
              <p className="text-textSecondary dark:text-slate-400 text-sm font-body max-w-xs mx-auto mb-6 leading-relaxed">
                No results match your current filters. Try a different category or clear the search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button border border-crimson text-crimson text-sm font-semibold hover:bg-crimson hover:text-white transition-all duration-200 font-body"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Load More Button */}
          {feedUpdates.length > visibleLimit && (
            <div className="flex justify-center pt-6 select-none">
              <Button
                variant="outline"
                onClick={() => setVisibleLimit((prev) => prev + 6)}
              >
                Load More Updates
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Announcement Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy bg-opacity-70 dark:bg-opacity-90">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-darkCard rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-xl border border-border dark:border-darkBorder"
            >
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-darkBg text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                aria-label="Close details"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 select-none">
                  <span className={`px-2.5 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${getCategoryStyles(selectedNotice.category).bg}`}>
                    {getCategoryStyles(selectedNotice.category).label}
                  </span>
                  <span className="text-xs font-body text-textSecondary dark:text-slate-400">
                    Published: {formatDate(selectedNotice.publishedAt)}
                  </span>
                </div>

                <h3 className="font-display font-bold text-navy dark:text-white text-xl sm:text-2xl leading-snug">
                  {selectedNotice.title}
                </h3>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-textSecondary dark:text-slate-300 text-sm sm:text-base leading-relaxed font-body whitespace-pre-line">
                {selectedNotice.body}
              </div>

              {selectedNotice.attachment && (
                <div className="bg-surface dark:bg-darkBg border border-border dark:border-darkBorder p-4 rounded-card flex justify-between items-center select-none">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="font-bold text-xs text-navy dark:text-white truncate max-w-[200px] sm:max-w-[300px]">
                      {selectedNotice.attachment.split('/').pop() || 'Attachment Document'}
                    </span>
                  </div>
                  <Button
                    href={selectedNotice.attachment}
                    variant="outline"
                    size="sm"
                  >
                    Download File
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 select-none">
                {selectedNotice.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-darkBg text-slate-600 dark:text-slate-400 rounded text-xs font-body">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnionUpdates;
