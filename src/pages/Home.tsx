import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import membersData from '../data/members.json';
import eventsData from '../data/events.json';
import announcementsData from '../data/announcements.json';
import initiativesData from '../data/initiatives.json';
import type { Member, Event, Announcement, Initiative } from '../types';

// Animated Count-Up component for impact numbers
const CountUp = ({ value, duration = 1500 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const incrementTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

export const Home = () => {
  // Pull structured data
  const chairperson = membersData.find((m) => m.position === 'Chairperson') as Member | undefined;
  const announcements = announcementsData as Announcement[];
  const events = eventsData as Event[];
  const initiatives = initiativesData as unknown as Initiative[];

  // Sort announcements: pinned first, then by date descending
  const sortedAnnouncements = [...announcements]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 4);

  // Up to 3 upcoming/ongoing events
  const upcomingEvents = events
    .filter((e) => e.status === 'upcoming' || e.status === 'ongoing')
    .slice(0, 3);

  // Quick Links Schema
  const QUICK_LINKS = [
    {
      label: 'Office Bearers',
      path: '/office-bearers',
      description: 'Meet the executive union team',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Representatives',
      path: '/representatives',
      description: 'Departmental representatives',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: 'Downloads & Forms',
      path: '/downloads',
      description: 'Access academic notices & formats',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
    {
      label: 'Student Voice',
      path: '/student-voice',
      description: 'Submit anonymous suggestions',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      label: 'Union Gallery',
      path: '/gallery',
      description: 'Browse photos from arts & sports',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Contact Details',
      path: '/contact',
      description: 'Union location and helpline details',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-0 text-textPrimary">
      <SEO />

      {/* SECTION 1: HERO */}
      <section
        className="relative min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 text-center select-none"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(to right, rgba(26, 39, 68, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 39, 68, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl flex flex-col items-center space-y-6"
        >
          {/* Display Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-navy tracking-tight leading-tight"
          >
            The Official Voice of <br />
            <span className="text-crimson">GEC Palakkad Students</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-textSecondary font-body font-medium tracking-wide max-w-2xl"
          >
            Secular College Union <span className="text-gold mx-1.5">•</span> 2026–27 <span className="text-gold mx-1.5">•</span> Government Engineering College, Palakkad
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            <Button
              to="/office-bearers"
              variant="primary"
              size="lg"
            >
              Meet the Team
            </Button>
            <Button
              to="/student-voice"
              variant="secondary"
              size="lg"
            >
              Student Voice
            </Button>
          </motion.div>

          {/* Stat Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 pt-10"
          >
            <div className="px-4 py-2 bg-surface border border-border text-xs font-semibold text-navy rounded-full uppercase tracking-wider">
              12 Office Bearers
            </div>
            <div className="px-4 py-2 bg-surface border border-border text-xs font-semibold text-navy rounded-full uppercase tracking-wider">
              6 Departments
            </div>
            <div className="px-4 py-2 bg-surface border border-border text-xs font-semibold text-navy rounded-full uppercase tracking-wider">
              Est. Every Year Since 2001
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-textSecondary"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CURRENT UNION BANNER */}
      <section className="bg-navy text-white py-4 border-y border-gold/20 select-none">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm md:text-base font-body tracking-wide font-medium">
          2026–27 Secular College Union — Currently Serving{' '}
          <span className="text-gold mx-2">|</span>{' '}
          <span className="text-gold font-semibold">
            {chairperson?.name || 'Ajmal V B'}
          </span>
          , Chairperson
        </div>
      </section>

      {/* SECTION 3: LATEST ANNOUNCEMENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Bulletin Board</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Notices & Announcements</h2>
            </div>
            <Link
              to="/news"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy transition-colors focus:outline-none"
            >
              View All Notices
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {sortedAnnouncements.map((ann) => (
              <motion.article
                key={ann.id}
                variants={fadeUp}
                className="bg-white border border-border rounded-card p-6 hover:shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-tag text-2xs uppercase tracking-wider font-semibold border ${ann.category === 'notice' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                      ann.category === 'event' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        ann.category === 'achievement' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-800 border-slate-200'
                      }`}>
                      {ann.category}
                    </span>
                    {ann.isPinned && (
                      <span className="flex items-center text-xs font-semibold text-gold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-tag">
                        <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                        </svg>
                        Pinned
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-navy mb-2 line-clamp-2">
                    {ann.title}
                  </h3>
                  <p className="text-textSecondary text-sm leading-relaxed mb-6 line-clamp-3">
                    {ann.body}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-textSecondary pt-4 border-t border-border">
                  <span>{new Date(ann.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <Link to="/news" className="font-semibold text-crimson hover:underline">
                    Read More &rarr;
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: UPCOMING EVENTS */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Campus Activities</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Upcoming Events</h2>
            </div>
            <Link
              to="/events"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy transition-colors focus:outline-none"
            >
              View All Events
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Horizontal scroll container on mobile, grid on desktop */}
          <div className="overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="flex md:grid md:grid-cols-3 gap-6 min-w-[850px] md:min-w-0"
            >
              {upcomingEvents.map((evt) => (
                <motion.div
                  key={evt.id}
                  variants={fadeUp}
                  className="w-80 md:w-auto bg-white border border-border rounded-card overflow-hidden hover:shadow-subtle hover:border-slate-300 transition-all flex flex-col h-full"
                >
                  {/* Decorative Gradient Top Header */}
                  <div className="h-40 bg-gradient-to-br from-navy via-slate-800 to-crimson flex items-center justify-center text-white font-display font-semibold text-lg p-6 text-center select-none">
                    {evt.title}
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-crimson/10 border border-crimson/20 text-crimson rounded-tag text-2xs uppercase tracking-wider font-semibold">
                          {evt.category}
                        </span>
                        <span className="text-2xs font-semibold text-slate-500 uppercase tracking-widest flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                          {evt.status}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-body font-bold text-navy mb-2 line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="text-textSecondary text-xs leading-relaxed mb-6 line-clamp-2">
                        {evt.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-textSecondary border-t border-border pt-4">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(evt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: QUICK LINKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Student Portal</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Quick Access Tiles</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {QUICK_LINKS.map((tile) => (
              <motion.div key={tile.path} variants={fadeUp}>
                <Link
                  to={tile.path}
                  className="group flex items-start space-x-4 bg-white border border-border p-6 rounded-card hover:border-crimson/50 hover:shadow-subtle transition-all duration-300"
                >
                  <div className="p-3 bg-surface text-navy rounded-button group-hover:bg-crimson group-hover:text-white transition-colors duration-300">
                    {tile.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-base text-navy group-hover:text-crimson transition-colors duration-300">
                      {tile.label}
                    </h3>
                    <p className="text-xs text-textSecondary mt-1">
                      {tile.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: RECENT INITIATIVES */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Welfare Projects</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Union Initiatives</h2>
            </div>
            <Link
              to="/initiatives"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy transition-colors focus:outline-none"
            >
              View All Initiatives
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {initiatives.slice(0, 2).map((init) => (
              <motion.div
                key={init.id}
                variants={fadeUp}
                className="bg-white border border-border p-6 rounded-card flex flex-col justify-between hover:shadow-subtle hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-body font-bold text-lg text-navy line-clamp-1">
                      {init.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-tag text-2xs uppercase tracking-wider font-semibold border ${init.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                      {init.status}
                    </span>
                  </div>
                  <p className="text-textSecondary text-xs md:text-sm leading-relaxed mb-6">
                    {init.description}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <Link to="/initiatives" className="text-xs font-semibold text-crimson hover:underline">
                    Learn More &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: IMPACT NUMBERS */}
      <section className="bg-navy text-white py-20 border-y border-gold/10 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-display font-extrabold text-gold">
                <CountUp value={12} />
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-body">Total Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-display font-extrabold text-gold">
                <CountUp value={events.length || 4} />
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-body">Events Conducted</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-display font-extrabold text-gold">
                <CountUp value={initiatives.length || 2} />
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-body">Active Projects</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-display font-extrabold text-gold">
                <CountUp value={6} />
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-body">Departments Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GALLERY PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Moments & Memories</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Gallery Preview</h2>
            </div>
            <Link
              to="/gallery"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy transition-colors focus:outline-none"
            >
              View Full Gallery
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Masonry CSS Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            {[
              { label: 'Dyuthi Arts Festival Stage', color: 'from-orange-500 to-amber-500' },
              { label: 'KTU Sports Football Champions', color: 'from-blue-600 to-indigo-500' },
              { label: 'World Environment Day Plantation', color: 'from-emerald-500 to-teal-500' },
              { label: 'Coding Workshop & Hackathon', color: 'from-violet-600 to-fuchsia-600' },
              { label: 'Annual College Assembly', color: 'from-slate-600 to-slate-800' },
              { label: 'Department Exhibition Stalls', color: 'from-rose-500 to-pink-500' },
            ].map((img, idx) => (
              <div
                key={idx}
                className={`relative h-56 rounded-card overflow-hidden bg-gradient-to-br ${img.color} shadow-sm group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-all duration-300" />
                <div className="absolute bottom-4 left-4 z-10 text-white">
                  <span className="text-2xs uppercase tracking-widest text-gold font-bold">Photo File</span>
                  <h4 className="font-body font-bold text-sm sm:text-base mt-1 line-clamp-1">{img.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-crimson text-white py-20 text-center select-none">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            Have something to say?
          </h2>
          <p className="text-sm sm:text-base text-red-100 max-w-xl mx-auto font-body">
            Share your ideas, suggestions, or concerns anonymously with the Secular College Union. Your voice shapes GEC Palakkad.
          </p>
          <div className="pt-2">
            <Button
              to="/student-voice"
              variant="primary"
              size="lg"
            >
              Submit Anonymously
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
