import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import membersData from '../data/members.json';
import type { Member } from '../types';

const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'AE'] as const;
type DeptType = typeof DEPARTMENTS[number];

export const Representatives = () => {
  const [activeTab, setActiveTab] = useState<DeptType>('CSE');

  // Filter representatives by categories
  const representatives = (membersData as Member[]).filter((m) => m.year === '2026-27');
  
  const ugReps = representatives.filter((m) => m.category === 'ugRep');
  const pgReps = representatives.filter((m) => m.category === 'pgRep');
  const ladiesReps = representatives.filter((m) => m.category === 'ladiesRep');
  const scstReps = representatives.filter((m) => m.category === 'scstRep');
  const generalCaptainReps = representatives.filter((m) => m.category === 'generalCaptain');

  // Filter UG reps by active department tab
  const activeUgReps = ugReps.filter((m) => m.department === activeTab);

  // Card component for consistency
  const RepCard = ({ rep }: { rep: Member }) => (
    <div className="bg-white border border-border p-6 rounded-card flex flex-col justify-between hover:shadow-subtle transition-all duration-300">
      <div className="space-y-4">
        {/* Photo and Header */}
        <div className="flex items-center space-x-4 select-none">
          <div className="w-14 h-14 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center font-display font-extrabold text-navy text-lg">
            {rep.photo ? (
              <img
                src={rep.photo}
                alt={rep.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              rep.name.split(' ').map((n) => n[0]).join('')
            )}
          </div>
          <div>
            <h4 className="font-body font-bold text-navy text-sm sm:text-base leading-tight">
              {rep.name}
            </h4>
            <p className="text-textSecondary text-2xs mt-1">
              Semester {rep.semester} <span className="text-slate-300 mx-1">•</span> {rep.department}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-textSecondary text-xs leading-relaxed font-body line-clamp-3">
          {rep.bio}
        </p>
      </div>

      {/* Social / Contact Grid Footer */}
      <div className="pt-4 border-t border-border mt-4 flex justify-between items-center select-none">
        <span className="text-2xs font-semibold text-crimson uppercase tracking-wider">
          {rep.position}
        </span>
        <div className="flex items-center space-x-2.5">
          {rep.contact.email && (
            <a
              href={`mailto:${rep.contact.email}`}
              className="text-slate-400 hover:text-crimson transition-colors"
              aria-label="Email Address"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
          {rep.socials.instagram && (
            <a
              href={`https://instagram.com/${rep.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-crimson transition-colors"
              aria-label="Instagram Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </a>
          )}
          {rep.socials.linkedin && (
            <a
              href={`https://linkedin.com/in/${rep.socials.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-crimson transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {rep.socials.github && (
            <a
              href={`https://github.com/${rep.socials.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-crimson transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-16 py-8">
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Student Representatives — 2026–27
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Representatives</span>
          </nav>
        </div>
      </section>

      {/* UG Department Representatives - Tabbed View */}
      <section className="space-y-8">
        <div className="border-b border-border select-none">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Academic Branches</p>
              <h2 className="text-2xl font-display font-bold text-navy">Undergraduate Representatives</h2>
            </div>
            
            {/* Scrollable Tabs */}
            <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-body font-semibold transition-colors focus:outline-none rounded-button ${
                    activeTab === dept ? 'text-crimson bg-surface' : 'text-textSecondary hover:text-navy'
                  }`}
                >
                  {dept}
                  {activeTab === dept && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeUgReps.length > 0 ? (
                activeUgReps.map((rep) => <RepCard key={rep.id} rep={rep} />)
              ) : (
                <div className="col-span-full py-16 text-center text-textSecondary font-body text-sm select-none border border-dashed border-border rounded-card">
                  No representatives listed for the {activeTab} department yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PG Representatives Section */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display font-bold text-xl text-navy select-none mb-6">
            Postgraduate Representatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pgReps.length > 0 ? (
              pgReps.map((rep) => <RepCard key={rep.id} rep={rep} />)
            ) : (
              <div className="col-span-full py-10 text-center text-textSecondary font-body text-sm select-none border border-dashed border-border rounded-card">
                No postgraduate representatives listed yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ladies Representatives Section */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display font-bold text-xl text-navy select-none mb-6">
            Ladies Representatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ladiesReps.length > 0 ? (
              ladiesReps.map((rep) => <RepCard key={rep.id} rep={rep} />)
            ) : (
              <div className="col-span-full py-10 text-center text-textSecondary font-body text-sm select-none border border-dashed border-border rounded-card">
                No ladies representatives listed yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SC/ST Representatives Section */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display font-bold text-xl text-navy select-none mb-6">
            SC/ST Representative
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scstReps.length > 0 ? (
              scstReps.map((rep) => <RepCard key={rep.id} rep={rep} />)
            ) : (
              <div className="col-span-full py-10 text-center text-textSecondary font-body text-sm select-none border border-dashed border-border rounded-card">
                No SC/ST representatives listed yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* General Captain Section */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display font-bold text-xl text-navy select-none mb-6">
            General Captain
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalCaptainReps.length > 0 ? (
              generalCaptainReps.map((rep) => <RepCard key={rep.id} rep={rep} />)
            ) : (
              <div className="col-span-full py-10 text-center text-textSecondary font-body text-sm select-none border border-dashed border-border rounded-card">
                No General Captain listed yet.
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Representatives;
