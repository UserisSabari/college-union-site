import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import downloadsData from '../data/downloads.json';

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  fileSize: string;
  fileType: 'pdf' | 'doc';
  url: string;
}

const CATEGORIES = [
  'Constitution & Regulations',
  'Meeting Minutes',
  'Annual Reports',
  'Election Notifications',
  'Magazine PDFs',
  'Posters & Creatives',
  'Forms',
] as const;

export const Downloads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Constitution & Regulations': true, // default first section open
  });

  const documents = downloadsData as DownloadItem[];

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) => {
    if (searchQuery === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query)
    );
  });

  const toggleSection = (category: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Icon Helper component based on fileType
  const FileIcon = ({ type }: { type: 'pdf' | 'doc' }) => {
    if (type === 'pdf') {
      return (
        <div className="p-2.5 bg-red-50 text-red-600 rounded select-none">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="p-2.5 bg-blue-50 text-blue-600 rounded select-none">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-10 py-8 relative">
      <SEO title="Documents & Downloads" description="Download GEC Palakkad College Union constitution, annual reports, meeting minutes, election notifications, magazines, and forms." />
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Documents & Downloads
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Downloads</span>
          </nav>
        </div>
      </section>

      {/* Search Bar section */}
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search documents by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-button text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all duration-200"
          />
          <svg
            className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 select-none"
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Accordion Categories Container */}
      <div className="max-w-7xl mx-auto space-y-4">
        {CATEGORIES.map((category) => {
          const catDocs = filteredDocuments.filter((doc) => doc.category === category);
          const isExpanded = !!expandedSections[category];

          // Skip rendering category if searching and has no matching documents
          if (searchQuery !== '' && catDocs.length === 0) return null;

          return (
            <div
              key={category}
              className="bg-white border border-border rounded-card overflow-hidden shadow-2xs"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleSection(category)}
                className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 hover:bg-slate-100/75 transition-colors focus:outline-none select-none"
              >
                <div className="flex items-center space-x-3">
                  <h3 className="font-display font-bold text-navy text-sm sm:text-base text-left">
                    {category}
                  </h3>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-3xs font-semibold rounded-full font-body">
                    {catDocs.length} {catDocs.length === 1 ? 'file' : 'files'}
                  </span>
                </div>
                
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Collapsible content area */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 divide-y divide-border">
                      {catDocs.length > 0 ? (
                        catDocs.map((doc) => (
                          <div
                            key={doc.id}
                            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                          >
                            {/* Document Info Card */}
                            <div className="flex items-center space-x-4">
                              <FileIcon type={doc.fileType} />
                              <div>
                                <h4 className="font-body font-bold text-navy text-xs sm:text-sm leading-snug">
                                  {doc.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-3xs text-textSecondary font-body select-none mt-1">
                                  <span>{formatDate(doc.publishedAt)}</span>
                                  <span>•</span>
                                  <span>Size: {doc.fileSize}</span>
                                </div>
                              </div>
                            </div>

                            {/* Document Action triggers */}
                            <div className="flex items-center space-x-2 select-none sm:justify-end">
                              <Button
                                href={doc.url}
                                variant="outline"
                                size="sm"
                              >
                                Preview
                              </Button>
                              <Button
                                href={doc.url}
                                download={true}
                                variant="secondary"
                                size="sm"
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-textSecondary text-xs font-body select-none">
                          No documents uploaded under this category yet.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Global Empty Search State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-card select-none">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-display font-bold text-navy text-base mb-1">No Documents Found</h3>
            <p className="text-textSecondary text-xs font-body max-w-xs mx-auto">
              We couldn't find any documents matching "{searchQuery}".
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Downloads;
