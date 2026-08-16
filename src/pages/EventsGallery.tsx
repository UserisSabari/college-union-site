import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import eventsData from '../data/events.json';
import galleryData from '../data/gallery.json';
import type { Event } from '../types';

type EventStatus = 'upcoming' | 'ongoing' | 'completed';

interface PhotoItem {
  id: string;
  src: string;
  eventName: string;
  year: string;
  date: string;
}

export const EventsGallery = () => {
  const location = useLocation();

  // Page Tab Switcher: Schedule vs Gallery (route-aware)
  const [pageTab, setPageTab] = useState<'schedule' | 'gallery'>(
    location.pathname === '/gallery' ? 'gallery' : 'schedule'
  );

  useEffect(() => {
    if (location.pathname === '/gallery') {
      setPageTab('gallery');
    } else if (location.pathname === '/events') {
      setPageTab('schedule');
    }
  }, [location.pathname]);

  // Events State - default to upcoming events
  const [eventTab, setEventTab] = useState<EventStatus>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const eventModalRef = useRef<HTMLDivElement>(null);

  // Gallery State
  const [activeFilterGroup, setActiveFilterGroup] = useState<'all' | 'event' | 'year'>('all');
  const [activeFilterValue, setActiveFilterValue] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Group and sort events
  const allEvents = eventsData as Event[];
  const upcomingEvents = allEvents
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const ongoingEvents = allEvents
    .filter((e) => e.status === 'ongoing')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedEvents = allEvents
    .filter((e) => e.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const activeEvents =
    eventTab === 'upcoming'
      ? upcomingEvents
      : eventTab === 'ongoing'
      ? ongoingEvents
      : completedEvents;

  const featuredEvent = activeEvents[0];
  const remainingEvents = activeEvents.slice(1);

  // Gallery photos
  const photos = galleryData as PhotoItem[];
  const uniqueEvents = Array.from(new Set(photos.map((p) => p.eventName)));
  const uniqueYears = Array.from(new Set(photos.map((p) => p.year)));

  const filteredPhotos = photos.filter((photo) => {
    if (activeFilterValue === 'all') return true;
    if (activeFilterGroup === 'event') return photo.eventName === activeFilterValue;
    if (activeFilterGroup === 'year') return photo.year === activeFilterValue;
    return true;
  });

  // Reset gallery filter values
  useEffect(() => {
    setActiveFilterValue('all');
  }, [activeFilterGroup]);

  // Click outside event modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedEvent &&
        eventModalRef.current &&
        !eventModalRef.current.contains(event.target as Node)
      ) {
        setSelectedEvent(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEvent]);

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') {
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

  // Prevent scroll on modals
  useEffect(() => {
    if (selectedEvent || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent, lightboxIndex]);

  // Date formatting helpers
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDayMonth = (dateString: string) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
  };

  const EventCoverImage = ({
    src,
    alt,
    className = 'w-full h-full object-cover',
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => {
    const [imageError, setImageError] = useState(false);
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-navy via-slate-800 to-crimson">
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={className}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 select-none">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const GalleryImage = ({ photo, onClick }: { photo: PhotoItem; onClick: () => void }) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <div
        onClick={onClick}
        className="relative break-inside-avoid mb-4 rounded-card overflow-hidden group cursor-pointer border border-border dark:border-darkBorder bg-slate-50 dark:bg-darkCard select-none shadow-sm hover:shadow-subtle transition-all duration-300"
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse min-h-[200px]" />
        )}
        <img
          src={photo.src}
          alt={photo.eventName}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0 h-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white text-left">
          <p className="text-2xs font-semibold text-gold tracking-wider uppercase">{photo.year}</p>
          <h4 className="font-display font-bold text-sm truncate mt-0.5">{photo.eventName}</h4>
          <p className="text-slate-300 text-3xs mt-0.5">{photo.date}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 py-8 relative">
      <SEO title="Events & Gallery" description="View campus events, programs calendar schedule, and photos gallery archive of Secular College Union GEC Palakkad." />

      {/* Page Hero */}
      <section className="bg-navy dark:bg-darkSurface text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Events & Gallery
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Events & Gallery</span>
          </nav>
        </div>
      </section>

      {/* Top Tab Switcher */}
      <div className="flex border-b border-border dark:border-darkBorder select-none">
        <button
          onClick={() => setPageTab('schedule')}
          className={`px-6 py-3 font-display font-bold text-sm sm:text-base border-b-2 transition-all ${
            pageTab === 'schedule'
              ? 'border-crimson text-crimson'
              : 'border-transparent text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
          }`}
        >
          Events Schedule
        </button>
        <button
          onClick={() => setPageTab('gallery')}
          className={`px-6 py-3 font-display font-bold text-sm sm:text-base border-b-2 transition-all ${
            pageTab === 'gallery'
              ? 'border-crimson text-crimson'
              : 'border-transparent text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
          }`}
        >
          Photo Gallery
        </button>
      </div>

      {pageTab === 'schedule' ? (
        /* Event Schedule Section */
        <div className="space-y-12">
          {/* Sub Event Tabs Switcher */}
          <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-thin select-none">
            {(['upcoming', 'ongoing', 'completed'] as EventStatus[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setEventTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                  eventTab === tab
                    ? 'bg-crimson text-white shadow-sm'
                    : 'bg-surface dark:bg-darkCard text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-darkSurface'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>

          <div className="max-w-7xl mx-auto space-y-12">
            {/* Featured Event Card */}
            {featuredEvent && (
              <div className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder rounded-card overflow-hidden shadow-sm flex flex-col lg:flex-row hover:shadow-subtle transition-all duration-300">
                <div className="lg:w-1/2 h-64 lg:h-auto min-h-[250px] relative select-none">
                  <EventCoverImage src={featuredEvent.coverImage} alt={featuredEvent.title} />
                  <div className="absolute top-4 left-4 bg-navy text-white px-3.5 py-1.5 rounded flex flex-col items-center shadow font-display font-extrabold select-none">
                    <span className="text-lg leading-none">{getDayMonth(featuredEvent.date).day}</span>
                    <span className="text-[10px] uppercase tracking-wider leading-none mt-1">{getDayMonth(featuredEvent.date).month}</span>
                  </div>
                </div>
                <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 select-none">
                      <span className="px-2.5 py-0.5 bg-crimson/10 dark:bg-crimson/20 text-crimson text-3xs font-semibold rounded-full uppercase tracking-wider">
                        Featured Event
                      </span>
                      <span className="text-3xs text-textSecondary dark:text-slate-400 font-medium">
                        Venue: {featuredEvent.venue}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-navy dark:text-white text-xl sm:text-2xl md:text-3xl leading-snug">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-textSecondary dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-body">
                      {featuredEvent.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border dark:border-darkBorder select-none">
                    <Button onClick={() => setSelectedEvent(featuredEvent)}>
                      Event Details
                    </Button>
                    {featuredEvent.registrationLink && (
                      <Button href={featuredEvent.registrationLink} variant="outline">
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Remaining Events Grid */}
            {remainingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder rounded-card overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="h-44 relative select-none">
                      <EventCoverImage src={event.coverImage} alt={event.title} />
                      <div className="absolute top-4 left-4 bg-navy text-white px-2.5 py-1 rounded flex flex-col items-center shadow font-display font-extrabold select-none">
                        <span className="text-sm leading-none">{getDayMonth(event.date).day}</span>
                        <span className="text-[8px] uppercase tracking-wider leading-none mt-0.5">{getDayMonth(event.date).month}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <p className="text-4xs text-textSecondary dark:text-slate-400 uppercase tracking-widest font-semibold font-body select-none">
                          {event.category} • {event.venue}
                        </p>
                        <h3 className="font-display font-bold text-navy dark:text-white text-base leading-snug line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-textSecondary dark:text-slate-300 text-xs font-body line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 pt-3 border-t border-border dark:border-darkBorder select-none">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="text-xs font-semibold text-crimson hover:text-navy dark:hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                        {event.registrationLink && (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-navy dark:text-white hover:text-crimson transition-colors"
                          >
                            Register
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !featuredEvent && (
                <div className="text-center py-20 border border-dashed border-border dark:border-darkBorder rounded-card select-none">
                  <h3 className="font-display font-bold text-navy dark:text-white text-base mb-1">No Events Listed</h3>
                  <p className="text-textSecondary dark:text-slate-400 text-xs font-body max-w-xs mx-auto">
                    We don't have any {eventTab} events listed at this time.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        /* Media Gallery Section */
        <div className="space-y-8">
          {/* Gallery Filters */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 select-none pb-4 border-b border-border dark:border-darkBorder">
            <div className="flex space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
              <button
                onClick={() => setActiveFilterGroup('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                  activeFilterGroup === 'all'
                    ? 'bg-crimson text-white shadow-sm'
                    : 'bg-surface dark:bg-darkCard text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => setActiveFilterGroup('event')}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                  activeFilterGroup === 'event'
                    ? 'bg-crimson text-white shadow-sm'
                    : 'bg-surface dark:bg-darkCard text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
                }`}
              >
                Filter by Event
              </button>
              <button
                onClick={() => setActiveFilterGroup('year')}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                  activeFilterGroup === 'year'
                    ? 'bg-crimson text-white shadow-sm'
                    : 'bg-surface dark:bg-darkCard text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
                }`}
              >
                Filter by Year
              </button>
            </div>

            {activeFilterGroup !== 'all' && (
              <div className="flex items-center space-x-2">
                <span className="text-2xs font-bold text-textSecondary dark:text-slate-400 uppercase font-body">Select:</span>
                <select
                  value={activeFilterValue}
                  onChange={(e) => setActiveFilterValue(e.target.value)}
                  className="bg-white dark:bg-darkBg border border-border dark:border-darkBorder text-textPrimary dark:text-darkText rounded p-1.5 text-xs font-body focus:outline-none focus:ring-1 focus:ring-crimson"
                >
                  <option value="all">Show All</option>
                  {activeFilterGroup === 'event'
                    ? uniqueEvents.map((e) => <option key={e} value={e}>{e}</option>)
                    : uniqueYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Photo Grid */}
          <div className="max-w-7xl mx-auto">
            {filteredPhotos.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <GalleryImage
                    key={photo.id}
                    photo={photo}
                    onClick={() => setLightboxIndex(index)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border dark:border-darkBorder rounded-card select-none">
                <h3 className="font-display font-bold text-navy dark:text-white text-base mb-1">No Photos Found</h3>
                <p className="text-textSecondary dark:text-slate-400 text-xs font-body">
                  No images fit the active filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy bg-opacity-70 dark:bg-opacity-90">
            <motion.div
              ref={eventModalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-darkCard rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-xl border border-border dark:border-darkBorder"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-darkBg text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 select-none">
                  <span className="px-2.5 py-0.5 bg-crimson/10 dark:bg-crimson/20 text-crimson text-3xs font-semibold rounded-full uppercase tracking-wider">
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs font-body text-textSecondary dark:text-slate-400">
                    Date: {formatDate(selectedEvent.date)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-navy dark:text-white text-xl sm:text-2xl leading-snug">
                  {selectedEvent.title}
                </h3>
              </div>

              {selectedEvent.coverImage && (
                <div className="h-64 rounded overflow-hidden select-none">
                  <EventCoverImage src={selectedEvent.coverImage} alt={selectedEvent.title} />
                </div>
              )}

              <div className="prose prose-slate dark:prose-invert max-w-none text-textSecondary dark:text-slate-300 text-sm leading-relaxed font-body whitespace-pre-line">
                {selectedEvent.body || selectedEvent.description}
              </div>

              <div className="space-y-2 select-none border-t border-border dark:border-darkBorder pt-4">
                <p className="text-xs font-bold text-navy dark:text-white font-body">Venue: {selectedEvent.venue}</p>
              </div>

              {selectedEvent.registrationLink && (
                <div className="pt-4 border-t border-border dark:border-darkBorder select-none flex justify-end">
                  <Button href={selectedEvent.registrationLink}>
                    Go to Registration Portal
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col justify-between p-4">
            {/* Top Toolbar */}
            <div className="flex justify-between items-center text-white select-none">
              <div className="text-xs font-body font-medium">
                {lightboxIndex + 1} / {filteredPhotos.length} — {filteredPhotos[lightboxIndex]?.eventName}
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:text-gold transition-colors focus:outline-none"
                aria-label="Close Lightbox"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Area */}
            <div className="flex-grow flex items-center justify-between relative max-w-5xl mx-auto w-full">
              {/* Prev Button */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
                className="absolute left-0 p-2 text-white hover:text-gold transition-colors focus:outline-none z-10"
                aria-label="Prev Image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image */}
              <div className="w-full h-[70vh] flex items-center justify-center p-4 select-none">
                <img
                  src={filteredPhotos[lightboxIndex]?.src}
                  alt={filteredPhotos[lightboxIndex]?.eventName}
                  className="max-w-full max-h-full object-contain rounded-sm"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
                className="absolute right-0 p-2 text-white hover:text-gold transition-colors focus:outline-none z-10"
                aria-label="Next Image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bottom Details */}
            <div className="text-center text-slate-400 text-xs font-body py-4 select-none border-t border-slate-900">
              <p className="font-bold text-white uppercase text-2xs tracking-wider">{filteredPhotos[lightboxIndex]?.year}</p>
              <p className="mt-1">{filteredPhotos[lightboxIndex]?.date}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsGallery;
