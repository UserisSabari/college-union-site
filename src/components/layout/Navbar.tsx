import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '../../features/search/SearchModal';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/office-bearers', label: 'Office Bearers' },
  { path: '/representatives', label: 'Representatives' },
  { path: '/events', label: 'Events' },
  { path: '/news', label: 'News' },
  { path: '/initiatives', label: 'Initiatives' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/downloads', label: 'Downloads' },
  { path: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Global listener for Ctrl+K / Cmd+K shortcuts
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  // Monitor scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Disable body scroll when mobile menu is open
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

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as const;

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-button focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full bg-white border-b border-border transition-all duration-300 ${
          isScrolled ? 'shadow-subtle h-14 md:h-16' : 'h-14 md:h-16'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
            onClick={() => setIsOpen(false)}
          >
            {/* Navy Monogram Circle Logo */}
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white font-display font-bold text-sm tracking-wider">
              CU
            </div>
            <span className="font-body font-medium text-textPrimary text-sm md:text-base tracking-tight">
              College Union <span className="text-textSecondary font-normal">| GEC Palakkad</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-5 text-sm font-medium transition-colors hover:text-crimson focus:outline-none focus:text-crimson ${
                    isActive ? 'text-crimson' : 'text-textSecondary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-textSecondary hover:text-crimson transition-colors focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
              aria-label="Search website content"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Student Voice CTA Button (Desktop) */}
            <Link
              to="/student-voice"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-crimson hover:bg-opacity-90 text-white font-medium text-sm rounded-button transition-colors focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2"
            >
              Student Voice
            </Link>

            {/* Hamburger Button (Mobile) */}
            <button
              ref={hamburgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-full left-0 w-full bg-white border-b border-border shadow-md z-30 lg:hidden max-h-[calc(100vh-56px)] overflow-y-auto"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 rounded-button text-base font-medium transition-colors focus:outline-none focus:bg-surface focus:text-crimson ${
                        isActive
                          ? 'bg-surface text-crimson'
                          : 'text-textSecondary hover:bg-surface hover:text-textPrimary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {/* Mobile CTA */}
                <div className="pt-4 px-3">
                  <Link
                    to="/student-voice"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-crimson text-white font-medium text-base rounded-button transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
                  >
                    Student Voice
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
