import { Link } from 'react-router-dom';
import type { SearchResultItem } from './useSearch';

interface SearchResultProps {
  item: SearchResultItem;
  query: string;
  onSelect: () => void;
}

export const SearchResult = ({ item, query, onSelect }: SearchResultProps) => {
  // Highlight search term in title
  const renderHighlightedTitle = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="text-crimson font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'member':
        return (
          <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'event':
        return (
          <svg className="w-5 h-5 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'notice':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <Link
      to={item.url}
      onClick={onSelect}
      className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors duration-200 rounded-card group"
    >
      <div className="flex items-center space-x-4">
        {/* Left Icon badge wrapper */}
        <div className="p-2 bg-slate-100 rounded-button flex-shrink-0 select-none">
          {getIcon(item.type)}
        </div>
        
        {/* Texts */}
        <div className="space-y-0.5">
          <h4 className="font-body font-bold text-navy text-xs sm:text-sm truncate max-w-[320px] sm:max-w-[420px]">
            {renderHighlightedTitle(item.title, query)}
          </h4>
          <p className="text-textSecondary text-5xs sm:text-4xs truncate max-w-[320px] sm:max-w-[420px] font-body leading-normal">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Right navigation arrow */}
      <svg className="w-4 h-4 text-slate-400 group-hover:text-crimson group-hover:translate-x-0.5 transition-all select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};
