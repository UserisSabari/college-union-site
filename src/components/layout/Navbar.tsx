import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '../../features/search/SearchModal';
import useTheme from '../../hooks/useTheme';

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
  const { theme, toggleTheme } = useTheme();
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
        className={`sticky top-0 z-40 w-full bg-white dark:bg-darkBg border-b border-border dark:border-darkBorder transition-all duration-300 ${
          isScrolled ? 'shadow-subtle h-14 md:h-16' : 'h-14 md:h-16'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
            onClick={() => setIsOpen(false)}
          >
            {/* Navy Monogram Circle Logo */}
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white font-display font-bold text-sm tracking-wider flex-shrink-0">
              CU
            </div>
            <div className="flex flex-col">
              <span className="font-body font-bold text-navy dark:text-white text-xs sm:text-sm md:text-base leading-none tracking-tight whitespace-nowrap">
                College Union
              </span>
              <span className="font-body text-textSecondary dark:text-slate-400 text-[9px] sm:text-[10px] md:text-xs leading-none mt-0.5 sm:mt-1 tracking-normal whitespace-nowrap">
                GEC Palakkad
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
            {NAV_LINKS.map((link) => {
              const isActive = link.path === '/'
                ? location.pathname === '/'
                : location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-5 text-xs xl:text-sm font-medium transition-colors hover:text-crimson dark:hover:text-crimson focus:outline-none focus:text-crimson whitespace-nowrap ${
                    isActive ? 'text-crimson' : 'text-textSecondary dark:text-slate-400'
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
              className="p-2 text-textSecondary dark:text-slate-400 hover:text-crimson dark:hover:text-crimson transition-colors focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
              aria-label="Search website content"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-textSecondary dark:text-slate-400 hover:text-crimson dark:hover:text-crimson transition-colors focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Student Voice CTA Button (Desktop) */}
            <Link
              to="/student-voice"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center justify-center px-4 py-2 bg-crimson hover:bg-opacity-90 text-white font-medium text-sm rounded-button transition-colors focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 whitespace-nowrap"
            >
              Student Voice
            </Link>

            {/* Hamburger Button (Mobile) */}
            <button
              ref={hamburgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-textSecondary dark:text-slate-400 hover:text-textPrimary dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-crimson rounded-button"
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
              className="absolute top-full left-0 w-full bg-white dark:bg-darkSurface border-b border-border dark:border-darkBorder shadow-md z-30 lg:hidden max-h-[calc(100vh-56px)] overflow-y-auto transition-colors duration-200"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 rounded-button text-base font-medium transition-colors focus:outline-none focus:bg-surface dark:focus:bg-darkBg focus:text-crimson ${
                        isActive
                          ? 'bg-surface dark:bg-darkBg text-crimson'
                          : 'text-textSecondary dark:text-slate-400 hover:bg-surface dark:hover:bg-darkBg hover:text-textPrimary dark:hover:text-white'
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
