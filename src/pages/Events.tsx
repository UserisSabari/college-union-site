import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import eventsData from '../data/events.json';
import type { Event } from '../types';

type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export const Events = () => {
  const [activeTab, setActiveTab] = useState<EventStatus>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Group and sort events
  const allEvents = eventsData as Event[];

  const upcomingEvents = allEvents
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // date ASC

  const ongoingEvents = allEvents
    .filter((e) => e.status === 'ongoing')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // date ASC

  const completedEvents = allEvents
    .filter((e) => e.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // date DESC

  // Get active list
  const activeEvents =
    activeTab === 'upcoming'
      ? upcomingEvents
      : activeTab === 'ongoing'
      ? ongoingEvents
      : completedEvents;

  // Featured event is the first one in the list
  const featuredEvent = activeEvents[0];
  const remainingEvents = activeEvents.slice(1);

  // Click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedEvent &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedEvent(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEvent]);

  // Prevent background scroll
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

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

  // Image Helper Component with colored gradient fallback
  const EventCoverImage = ({
    src,
    alt,
    isCompleted = false,
    className = 'w-full h-full object-cover',
  }: {
    src: string;
    alt: string;
    isCompleted?: boolean;
    className?: string;
  }) => {
    const [imageError, setImageError] = useState(false);
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-navy via-slate-800 to-crimson`}>
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            width={600}
            height={400}
            loading="lazy"
            className={`${className} transition-transform duration-500 hover:scale-105 ${
              isCompleted ? 'filter grayscale brightness-90' : ''
            }`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center select-none bg-gradient-to-br from-navy/90 via-slate-900/95 to-crimson/90">
            <span className="font-display font-extrabold text-white/20 tracking-wider text-xl uppercase">
              {alt.slice(0, 3)}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12 py-8 relative">
      <SEO title="Events & Programs" description="Discover upcoming, ongoing, and completed events, arts festivals, sports meets, and workshops organized by GEC Palakkad College Union." />
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Events & Programs
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Events</span>
          </nav>
        </div>
      </section>

      {/* Tabs Bar */}
      <div className="border-b border-border select-none">
        <div className="max-w-7xl mx-auto flex space-x-6">
          {(['upcoming', 'ongoing', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-4 text-sm font-body font-bold uppercase tracking-wider transition-colors focus:outline-none ${
                activeTab === tab ? 'text-crimson' : 'text-textSecondary hover:text-navy'
              }`}
            >
              {tab} Events
              {activeTab === tab && (
                <motion.div
                  layoutId="activeEventTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {activeEvents.length > 0 ? (
          <>
            {/* Featured Event Card */}
            {featuredEvent && (
              <section className="bg-white border border-border rounded-card overflow-hidden shadow-sm hover:shadow-subtle transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Featured Cover */}
                  <div className="lg:col-span-7 h-64 sm:h-80 md:h-[400px]">
                    <EventCoverImage
                      src={featuredEvent.coverImage}
                      alt={featuredEvent.title}
                      isCompleted={activeTab === 'completed'}
                    />
                  </div>
                  
                  {/* Featured Details */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 select-none">
                        <span className="px-2.5 py-0.5 bg-crimson/10 text-crimson text-3xs font-bold uppercase tracking-wider rounded">
                          Featured {featuredEvent.category}
                        </span>
                        {activeTab === 'ongoing' && (
                          <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-3xs font-bold uppercase tracking-wider rounded animate-pulse">
                            Live Now
                          </span>
                        )}
                        {activeTab === 'completed' && (
                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-3xs font-bold uppercase tracking-wider rounded">
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <h2 className="font-display font-bold text-navy text-xl sm:text-2xl lg:text-3xl leading-tight">
                        {featuredEvent.title}
                      </h2>
                      
                      {/* Date & Venue Details row */}
                      <div className="space-y-2 text-xs text-textSecondary font-body select-none">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(featuredEvent.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{featuredEvent.venue}</span>
                        </div>
                      </div>

                      <p className="text-textSecondary text-xs sm:text-sm leading-relaxed font-body">
                        {featuredEvent.description}
                      </p>
                    </div>

                      <Button
                        onClick={() => setSelectedEvent(featuredEvent)}
                        variant="primary"
                        size="md"
                        fullWidth={true}
                        className="sm:w-auto"
                      >
                        {activeTab === 'completed' ? 'View Gallery & Highlights' : 'Explore Event Details'}
                      </Button>
                  </div>
                </div>
              </section>
            )}

            {/* Remaining Grid list */}
            {remainingEvents.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingEvents.map((event) => {
                  const dateInfo = getDayMonth(event.date);
                  return (
                    <div
                      key={event.id}
                      className="bg-white border border-border rounded-card overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-subtle transition-all duration-300"
                    >
                      <div>
                        {/* Cover image container */}
                        <div className="h-48 relative">
                          <EventCoverImage
                            src={event.coverImage}
                            alt={event.title}
                            isCompleted={activeTab === 'completed'}
                          />
                          
                          {/* Floating Date Badge */}
                          <div className="absolute top-3 left-3 bg-white text-navy font-display font-extrabold flex flex-col items-center justify-center p-2 rounded shadow-sm leading-tight text-center min-w-[50px] select-none">
                            <span className="text-sm font-extrabold">{dateInfo.day}</span>
                            <span className="text-4xs uppercase tracking-wider text-crimson font-bold font-body">{dateInfo.month}</span>
                          </div>
                        </div>

                        {/* Card Details */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center space-x-2 select-none">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-4xs font-bold uppercase tracking-wider rounded">
                              {event.category}
                            </span>
                            {activeTab === 'ongoing' && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-4xs font-bold uppercase tracking-wider rounded">
                                Live
                              </span>
                            )}
                          </div>
                          
                          <h3
                            className="font-display font-bold text-navy text-base leading-snug hover:text-crimson cursor-pointer transition-colors"
                            onClick={() => setSelectedEvent(event)}
                          >
                            {event.title}
                          </h3>
                          
                          <p className="text-textSecondary text-xs leading-relaxed font-body line-clamp-3">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                        <Button
                          onClick={() => setSelectedEvent(event)}
                          variant="outline"
                          size="sm"
                          fullWidth={true}
                          className="border-navy text-navy hover:bg-navy hover:text-white"
                        >
                          {activeTab === 'completed' ? 'View Highlights' : 'Register / Learn More'}
                        </Button>
                    </div>
                  );
                })}
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-card select-none">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-display font-bold text-navy text-base mb-1">No Events Found</h3>
            <p className="text-textSecondary text-xs font-body max-w-xs mx-auto">
              There are no {activeTab} events registered in this term currently.
            </p>
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedEvent && (
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
              className="bg-white max-w-3xl w-full rounded-card overflow-hidden shadow-premium flex flex-col max-h-[90vh]"
            >
              {/* Modal Cover Image banner */}
              <div className="h-48 sm:h-64 relative overflow-hidden select-none">
                <EventCoverImage
                  src={selectedEvent.coverImage}
                  alt={selectedEvent.title}
                  isCompleted={selectedEvent.status === 'completed'}
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors focus:outline-none"
                  aria-label="Close Event Overlay"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <span className="px-2 py-0.5 bg-crimson/10 text-crimson text-3xs font-bold uppercase tracking-wider rounded">
                    {selectedEvent.category} Event
                  </span>
                  <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl mt-2 leading-snug">
                    {selectedEvent.title}
                  </h2>
                </div>

                {/* Logistics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-border py-4 text-xs font-body text-textSecondary select-none bg-slate-50 px-4 rounded-card">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4.5 h-4.5 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-navy">Date & Time</h4>
                      <p>{formatDate(selectedEvent.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4.5 h-4.5 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-navy">Venue Location</h4>
                      <p>{selectedEvent.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Description Body */}
                <div className="space-y-4 font-body text-sm text-textSecondary leading-relaxed">
                  <p>{selectedEvent.description}</p>
                  {(selectedEvent as any).body && (
                    <p className="whitespace-pre-line text-xs font-light text-slate-500">
                      {(selectedEvent as any).body}
                    </p>
                  )}
                </div>

                {/* Thumbnail Gallery for Completed */}
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-display font-bold text-sm text-navy uppercase tracking-wider select-none">
                      Event Photo Highlights
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedEvent.gallery.map((photo, index) => (
                        <a
                          key={index}
                          href={photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-20 sm:h-24 rounded overflow-hidden border border-border shadow-2xs block bg-slate-100 hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={photo}
                            alt={`Gallery highlights ${index + 1}`}
                            width={96}
                            height={96}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action button inside modal */}
                {selectedEvent.status !== 'completed' && selectedEvent.registrationLink && (
                    <Button
                      href={selectedEvent.registrationLink}
                      variant="secondary"
                      size="md"
                      fullWidth={true}
                    >
                      Open Registration Form
                    </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;
