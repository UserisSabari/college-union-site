import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About the Union' },
  { path: '/office-bearers', label: 'Office Bearers' },
  { path: '/representatives', label: 'Representatives' },
  { path: '/events', label: 'Events' },
  { path: '/news', label: 'News & Notices' },
  { path: '/initiatives', label: 'Initiatives' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/downloads', label: 'Downloads' },
  { path: '/contact', label: 'Contact' },
  { path: '/archive', label: 'Union Archive' },
];

export const Footer = () => {
  return (
    <footer className="bg-navy border-t-2 border-gold text-slate-300 font-body">
      {/* Top 4-Column Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Logo + Tagline + Address */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-navy font-display font-bold text-sm tracking-wider">
                CU
              </div>
              <span className="font-body font-semibold text-white text-base tracking-tight">
                College Union
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Official Digital Office of the Secular College Union, Government Engineering College, Palakkad.
            </p>
            <div className="text-slate-400 text-xs leading-relaxed space-y-1 pt-2">
              <p className="font-semibold text-slate-300">Address:</p>
              <p>Government Engineering College, Palakkad</p>
              <p>Sreekrishnapuram, Palakkad District</p>
              <p>Kerala, India - 678633</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide border-b border-slate-700 pb-2">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-gold transition-colors focus:outline-none focus:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide border-b border-slate-700 pb-2">
              Office Details
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:union@gecpalakkad.ac.in" className="hover:text-gold transition-colors break-all">
                  union@gecpalakkad.ac.in
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Union Office, Amenity Center, GEC Palakkad Campus</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="space-y-0.5">
                  <p>Mon - Fri: 9:00 AM - 4:00 PM</p>
                  <p className="text-xs text-slate-500">During academic semesters</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connections */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide border-b border-slate-700 pb-2">
              Connect With Us
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stay in the loop with active notices, student initiatives, and general union alerts.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Follow us on Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Connect on LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="View on GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="bg-slate-950 border-t border-slate-800 text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs space-y-3 md:space-y-0">
          <div>
            &copy; 2024–25 Secular College Union, GEC Palakkad. All rights reserved.
          </div>
          <div className="flex space-x-1 items-center">
            <span>Built with care by</span>
            <span className="text-slate-400 font-semibold">Union Web Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
