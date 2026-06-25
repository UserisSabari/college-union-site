import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import initiativesData from '../data/initiatives.json';

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

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'active', label: 'Active (Ongoing)' },
  { id: 'completed', label: 'Completed' },
  { id: 'planned', label: 'Planned' },
] as const;

type FilterType = typeof FILTERS[number]['id'];

export const Initiatives = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const initiatives = initiativesData as InitiativeItem[];

  // Filter list
  const filteredInitiatives = initiatives.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          border: 'border-t-4 border-t-crimson',
          bg: 'bg-crimson/10 text-crimson',
          label: 'Active',
        };
      case 'completed':
        return {
          border: 'border-t-4 border-t-navy',
          bg: 'bg-navy/10 text-navy',
          label: 'Completed',
        };
      case 'planned':
        return {
          border: 'border-t-4 border-t-[#D4AF37]',
          bg: 'bg-[#D4AF37]/10 text-yellow-700',
          label: 'Planned',
        };
      default:
        return {
          border: 'border-t-4 border-t-slate-400',
          bg: 'bg-slate-100 text-slate-600',
          label: 'Planned',
        };
    }
  };

  return (
    <div className="space-y-12 py-8 relative">
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Union Initiatives
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Initiatives</span>
          </nav>
        </div>
      </section>

      {/* Filter Chips Bar */}
      <div className="border-b border-border select-none pb-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setExpandedId(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                activeFilter === f.id
                  ? 'bg-crimson text-white shadow-sm'
                  : 'bg-surface text-textSecondary hover:text-navy hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of cards */}
      <div className="max-w-7xl mx-auto">
        {filteredInitiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredInitiatives.map((item) => {
              const statusCfg = getStatusConfig(item.status);
              const isExpanded = expandedId === item.id;
              
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-card overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300 flex flex-col justify-between p-6 ${statusCfg.border}`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start select-none">
                      <span className={`px-2 py-0.5 rounded text-3xs font-semibold uppercase tracking-wider ${statusCfg.bg}`}>
                        {statusCfg.label}
                      </span>
                      <span className="text-3xs font-medium text-textSecondary">
                        Term: {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-navy text-lg sm:text-xl leading-snug">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-textSecondary text-xs sm:text-sm leading-relaxed font-body">
                      {item.description}
                    </p>

                    {/* Impact Metrics Row */}
                    {item.impactMetrics && item.impactMetrics.length > 0 && (
                      <div className="bg-slate-50 border border-slate-100 rounded-card p-4 select-none">
                        <h4 className="text-4xs font-bold text-navy uppercase tracking-widest mb-2 font-body">
                          Project Impact Metrics
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {item.impactMetrics.map((metric, i) => (
                            <div key={i} className="text-center p-1 border-r last:border-0 border-slate-200">
                              <p className="text-xs font-bold text-crimson font-body">{metric.split(' ')[0]}</p>
                              <p className="text-4xs text-textSecondary font-medium">{metric.split(' ').slice(1).join(' ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden space-y-6 pt-6 mt-6 border-t border-border"
                      >
                        {/* Gallery Thumbnails */}
                        {item.gallery && item.gallery.length > 0 && (
                          <div className="space-y-2 select-none">
                            <h4 className="text-4xs font-bold text-navy uppercase tracking-widest font-body">
                              Progress & Site Gallery
                            </h4>
                            <div className="flex space-x-2">
                              {item.gallery.map((img, index) => (
                                <a
                                  key={index}
                                  href={img}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-20 h-16 rounded overflow-hidden border border-border shadow-3xs"
                                >
                                  <img src={img} alt="Initiative photo" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Documents Download Row */}
                        {item.documents && item.documents.length > 0 && (
                          <div className="space-y-2 select-none">
                            <h4 className="text-4xs font-bold text-navy uppercase tracking-widest font-body">
                              Reference Documents
                            </h4>
                            <div className="space-y-2">
                              {item.documents.map((doc, index) => (
                                <div key={index} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-card text-2xs">
                                  <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-bold text-navy truncate max-w-[200px]">{doc.name}</span>
                                    {doc.size && <span className="text-textSecondary">({doc.size})</span>}
                                  </div>
                                  <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-crimson hover:bg-navy text-white font-bold rounded-button uppercase tracking-wider text-4xs transition-colors"
                                  >
                                    Download
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-border mt-6 flex justify-end select-none">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-xs font-bold text-crimson hover:text-navy transition-colors flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'Collapse View' : 'Read More Details'}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
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
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-card select-none">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-display font-bold text-navy text-base mb-1">No Initiatives Found</h3>
            <p className="text-textSecondary text-xs font-body max-w-xs mx-auto">
              No project records fit the currently active status criteria.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Initiatives;
