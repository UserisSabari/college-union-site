import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/gallery.json';

interface PhotoItem {
  id: string;
  src: string;
  eventName: string;
  year: string;
  date: string;
}

export const Gallery = () => {
  const [activeFilterGroup, setActiveFilterGroup] = useState<'all' | 'event' | 'year'>('all');
  const [activeFilterValue, setActiveFilterValue] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = galleryData as PhotoItem[];

  // Get unique events and years for filters
  const uniqueEvents = Array.from(new Set(photos.map((p) => p.eventName)));
  const uniqueYears = Array.from(new Set(photos.map((p) => p.year)));

  // Generate albums: group by eventName
  const albums = uniqueEvents.map((eventName) => {
    const eventPhotos = photos.filter((p) => p.eventName === eventName);
    return {
      eventName,
      cover: eventPhotos[0]?.src || '',
      count: eventPhotos.length,
    };
  });

  // Filter photos
  const filteredPhotos = photos.filter((photo) => {
    if (activeFilterValue === 'all') return true;
    if (activeFilterGroup === 'event') {
      return photo.eventName === activeFilterValue;
    }
    if (activeFilterGroup === 'year') {
      return photo.year === activeFilterValue;
    }
    return true;
  });

  // Reset filter values when group changes
  useEffect(() => {
    setActiveFilterValue('all');
  }, [activeFilterGroup]);

  // Handle keyboard events in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  // Prevent background scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Image component with shimmer effect and lazy load
  const GalleryImage = ({ photo, onClick }: { photo: PhotoItem; onClick: () => void }) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <div
        onClick={onClick}
        className="relative break-inside-avoid mb-4 rounded-card overflow-hidden group cursor-pointer border border-border bg-slate-50 select-none shadow-sm hover:shadow-subtle transition-all duration-300"
      >
        {/* Shimmer Placeholder */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse min-h-[200px]" />
        )}
        
        <img
          src={photo.src}
          alt={photo.eventName}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover rounded-card transition-all duration-500 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <div className="p-2 bg-white/10 text-white rounded-full backdrop-blur-2xs">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-3xs font-semibold text-gold uppercase tracking-wider">
              {photo.year}
            </span>
            <h4 className="font-display font-bold text-white text-sm leading-tight mt-1">
              {photo.eventName}
            </h4>
            <p className="text-slate-300 text-3xs font-body mt-0.5">{photo.date}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 py-8 relative">
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Photo Gallery
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Double Decker Filter Bar */}
      <div className="bg-white border-y border-border py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto space-y-3.5">
          {/* Main Filter Group Selection */}
          <div className="flex space-x-1.5 border-b border-slate-100 pb-3">
            <button
              onClick={() => {
                setActiveFilterGroup('all');
                setActiveFilterValue('all');
              }}
              className={`px-4 py-1 rounded-full text-xs font-body font-bold transition-all ${
                activeFilterGroup === 'all'
                  ? 'bg-navy text-white'
                  : 'bg-surface text-textSecondary hover:text-navy hover:bg-slate-100'
              }`}
            >
              All Images
            </button>
            <button
              onClick={() => setActiveFilterGroup('event')}
              className={`px-4 py-1 rounded-full text-xs font-body font-bold transition-all ${
                activeFilterGroup === 'event'
                  ? 'bg-navy text-white'
                  : 'bg-surface text-textSecondary hover:text-navy hover:bg-slate-100'
              }`}
            >
              Filter By Event
            </button>
            <button
              onClick={() => setActiveFilterGroup('year')}
              className={`px-4 py-1 rounded-full text-xs font-body font-bold transition-all ${
                activeFilterGroup === 'year'
                  ? 'bg-navy text-white'
                  : 'bg-surface text-textSecondary hover:text-navy hover:bg-slate-100'
              }`}
            >
              Filter By Year
            </button>
          </div>

          {/* Sub chips based on group selection */}
          {activeFilterGroup !== 'all' && (
            <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setActiveFilterValue('all')}
                className={`px-3 py-1 rounded text-2xs font-body font-semibold transition-all ${
                  activeFilterValue === 'all'
                    ? 'bg-crimson text-white'
                    : 'bg-slate-50 text-textSecondary hover:text-navy hover:bg-slate-100'
                }`}
              >
                Show All {activeFilterGroup === 'event' ? 'Events' : 'Years'}
              </button>

              {activeFilterGroup === 'event' &&
                uniqueEvents.map((ev) => (
                  <button
                    key={ev}
                    onClick={() => setActiveFilterValue(ev)}
                    className={`px-3 py-1 rounded text-2xs font-body font-semibold whitespace-nowrap transition-all ${
                      activeFilterValue === ev
                        ? 'bg-crimson text-white'
                        : 'bg-slate-50 text-textSecondary hover:text-navy hover:bg-slate-100'
                    }`}
                  >
                    {ev}
                  </button>
                ))}

              {activeFilterGroup === 'year' &&
                uniqueYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setActiveFilterValue(yr)}
                    className={`px-3 py-1 rounded text-2xs font-body font-semibold whitespace-nowrap transition-all ${
                      activeFilterValue === yr
                        ? 'bg-crimson text-white'
                        : 'bg-slate-50 text-textSecondary hover:text-navy hover:bg-slate-100'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CSS Masonry Grid */}
        <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <GalleryImage
                key={photo.id}
                photo={photo}
                onClick={() => setLightboxIndex(index)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-textSecondary border border-dashed border-border rounded-card select-none">
              No photos found matching the selected filter query.
            </div>
          )}
        </section>

        {/* Horizontal scroll albums section */}
        <section className="space-y-6 pt-10 border-t border-border">
          <div className="select-none">
            <h2 className="font-display font-bold text-lg sm:text-xl text-navy">
              Campus Event Albums
            </h2>
            <p className="text-textSecondary text-xs font-body mt-1">
              Select an album to see categorized photo collections.
            </p>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin select-none">
            {albums.map((album) => (
              <div
                key={album.eventName}
                onClick={() => {
                  setActiveFilterGroup('event');
                  setActiveFilterValue(album.eventName);
                }}
                className="w-48 sm:w-56 flex-shrink-0 bg-white border border-border rounded-card overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300 cursor-pointer group"
              >
                {/* Album Cover */}
                <div className="h-32 overflow-hidden bg-slate-100 relative">
                  <img
                    src={album.cover}
                    alt={album.eventName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-navy/95 text-white px-2 py-0.5 rounded text-4xs font-bold font-body">
                    {album.count} Photos
                  </div>
                </div>

                {/* Album Details */}
                <div className="p-4">
                  <h4 className="font-display font-bold text-navy text-xs sm:text-sm truncate group-hover:text-crimson transition-colors">
                    {album.eventName}
                  </h4>
                  <p className="text-textSecondary text-4xs font-body mt-1">View collection</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4"
          >
            {/* Lightbox Header Controls */}
            <div className="flex justify-between items-center text-white select-none py-2 px-4">
              <span className="text-xs font-body text-slate-400">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                aria-label="Close Lightbox Dialog"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Lightbox Center Content with Arrows */}
            <div className="flex-grow flex items-center justify-between relative max-w-5xl mx-auto w-full px-2 sm:px-6">
              
              {/* Left Arrow */}
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                  )
                }
                className="absolute left-0 z-10 p-2 sm:p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
                aria-label="Previous Image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Central Image with spring animation */}
              <div className="w-full flex justify-center items-center h-[65vh] sm:h-[75vh]">
                <motion.img
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].eventName}
                  className="max-w-full max-h-full object-contain rounded shadow-premium select-none pointer-events-none"
                />
              </div>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-0 z-10 p-2 sm:p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none"
                aria-label="Next Image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Lightbox Footer Captions */}
            <div className="text-center text-white select-none py-4 border-t border-white/10 max-w-xl mx-auto w-full">
              <span className="text-3xs font-semibold text-gold uppercase tracking-wider">
                {filteredPhotos[lightboxIndex].year} Archive
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base mt-1">
                {filteredPhotos[lightboxIndex].eventName}
              </h3>
              <p className="text-slate-400 text-3xs font-body mt-0.5">
                Taken on {filteredPhotos[lightboxIndex].date}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
