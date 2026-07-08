import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import membersData from '../data/members.json';
import type { Member } from '../types';

const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT'] as const;
type DeptType = typeof DEPARTMENTS[number];

export const UnionMembers = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState<DeptType>('CSE');
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter members for the active term 2026-27
  const activeMembers = (membersData as Member[]).filter((m) => m.year === '2026-27');

  // Executive Committee members: officeBearer, generalCaptain, ladiesRep, scstRep
  const executiveCommittee = activeMembers.filter(
    (m) =>
      m.category === 'officeBearer' ||
      m.category === 'generalCaptain' ||
      m.category === 'ladiesRep' ||
      m.category === 'scstRep'
  );

  // Chairperson featured separately
  const chairperson = executiveCommittee.find(
    (m) => m.position.toLowerCase() === 'chairperson'
  );

  // Other executive committee members
  const otherExecutives = executiveCommittee.filter(
    (m) => m.position.toLowerCase() !== 'chairperson'
  );

  // Department & PG representatives
  const ugReps = activeMembers.filter((m) => m.category === 'ugRep');
  const pgReps = activeMembers.filter((m) => m.category === 'pgRep');

  // Active UG reps in tab
  const activeUgReps = ugReps.filter((m) => m.department === activeTab);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedMember &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedMember(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedMember]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  // Member Card Component (Reusable for Executives & Reps)
  const MemberCard = ({ member }: { member: Member }) => (
    <div
      className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder rounded-card p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Photo & Basic Details */}
        <div className="flex items-center space-x-4 select-none">
          <div className="w-16 h-16 rounded-full border border-slate-200 dark:border-darkBorder overflow-hidden bg-slate-100 dark:bg-darkBg flex-shrink-0 flex items-center justify-center font-display font-extrabold text-navy dark:text-white text-xl">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                width={64}
                height={64}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              member.name.split(' ').map((n) => n[0]).join('')
            )}
          </div>
          <div>
            <span className="text-2xs font-bold text-crimson uppercase tracking-wider">
              {member.position === 'SC/ST Representative' ? 'Executive Member' : member.position}
            </span>
            <h4 className="font-body font-bold text-navy dark:text-white text-base leading-tight mt-0.5">
              {member.name}
            </h4>
            <p className="text-textSecondary dark:text-slate-400 text-2xs mt-0.5">
              {member.department} Dept. <span className="text-slate-300 dark:text-slate-600 mx-1">•</span> Sem {member.semester}
            </p>
          </div>
        </div>

        <p className="text-textSecondary dark:text-slate-300 text-xs leading-relaxed font-body line-clamp-2">
          {member.bio}
        </p>
      </div>

      <div className="pt-6 border-t border-border dark:border-darkBorder mt-6 flex justify-between items-center select-none">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedMember(member)}
        >
          View Profile
        </Button>
        {/* Mini Socials */}
        <div className="flex items-center space-x-2">
          {member.socials.instagram && (
            <a
              href={`https://instagram.com/${member.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
              aria-label="Instagram Link"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </a>
          )}
          {member.socials.linkedin && (
            <a
              href={`https://linkedin.com/in/${member.socials.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
              aria-label="LinkedIn Link"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {member.socials.github && (
            <a
              href={`https://github.com/${member.socials.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
              aria-label="GitHub Link"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
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
      <SEO title="Union Members" description="Meet the executive committee and representatives of the Secular College Union at GEC Palakkad." />

      {/* Page Hero */}
      <section className="border-l-4 border-crimson pl-6 select-none">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy dark:text-white">
          Union Members — 2026–27
        </h1>
        <p className="text-textSecondary dark:text-slate-400 text-sm sm:text-base font-body mt-2 max-w-2xl leading-relaxed">
          The general executive council and student representatives of the Secular College Union, Government Engineering College, Palakkad.
        </p>
      </section>

      {/* Chairperson Feature Card */}
      {chairperson && (
        <section className="bg-[#F0F2F8] dark:bg-darkCard border-l-4 border-navy dark:border-crimson rounded-card p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm select-none">
          <div className="w-40 h-40 rounded-full border-4 border-navy dark:border-crimson overflow-hidden bg-slate-200 dark:bg-darkBg flex-shrink-0 flex items-center justify-center font-display font-extrabold text-navy dark:text-white text-5xl">
            {chairperson.photo ? (
              <img
                src={chairperson.photo}
                alt={chairperson.name}
                width={160}
                height={160}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              chairperson.name.split(' ').map((n) => n[0]).join('')
            )}
          </div>

          <div className="space-y-4 flex-grow text-center md:text-left">
            <div>
              <span className="px-3 py-1 bg-navy dark:bg-crimson text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                {chairperson.position}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy dark:text-white mt-2">
                {chairperson.name}
              </h2>
              <p className="text-textSecondary dark:text-slate-400 text-xs sm:text-sm font-medium mt-1">
                Department of {chairperson.department} <span className="text-slate-300 dark:text-slate-600 mx-1.5">|</span> Semester {chairperson.semester}
              </p>
            </div>

            <p className="text-textSecondary dark:text-slate-300 text-sm sm:text-base italic leading-relaxed font-body border-l-2 border-slate-300 dark:border-darkBorder pl-4 py-1 max-w-2xl mx-auto md:mx-0">
              "{chairperson.vision}"
            </p>

            <div className="space-y-2">
              <h3 className="font-body font-bold text-xs uppercase tracking-wider text-navy dark:text-white">
                Key Responsibilities:
              </h3>
              <ul className="space-y-1.5 text-xs text-textSecondary dark:text-slate-400 list-disc list-inside md:list-outside md:pl-4 max-w-2xl">
                {chairperson.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            {/* Social and Contact Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-slate-200 dark:border-darkBorder">
              {chairperson.contact.email && (
                <a
                  href={`mailto:${chairperson.contact.email}`}
                  className="text-xs text-textSecondary dark:text-slate-400 hover:text-crimson transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {chairperson.contact.email}
                </a>
              )}
              {chairperson.contact.phone && (
                <a
                  href={`tel:${chairperson.contact.phone}`}
                  className="text-xs text-textSecondary dark:text-slate-400 hover:text-crimson transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {chairperson.contact.phone}
                </a>
              )}
              <div className="flex items-center space-x-3">
                {chairperson.socials.instagram && (
                  <a
                    href={`https://instagram.com/${chairperson.socials.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                    </svg>
                  </a>
                )}
                {chairperson.socials.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${chairperson.socials.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Executive Committee Grid */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-xl text-navy dark:text-white select-none">
          Executive Committee
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherExecutives.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* UG Department Representatives - Tabbed View */}
      <section className="space-y-8 pt-8 border-t border-border dark:border-darkBorder">
        <div className="border-b border-border dark:border-darkBorder select-none">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Academic Branches</p>
              <h2 className="text-2xl font-display font-bold text-navy dark:text-white">Undergraduate Representatives</h2>
            </div>
            {/* Scrollable Tabs */}
            <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-body font-semibold transition-colors focus:outline-none rounded-button ${
                    activeTab === dept ? 'text-crimson bg-surface dark:bg-darkCard' : 'text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white'
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
              activeUgReps.map((rep) => <MemberCard key={rep.id} member={rep} />)
            ) : (
              <div className="col-span-full py-16 text-center text-textSecondary dark:text-slate-400 font-body text-sm select-none border border-dashed border-border dark:border-darkBorder rounded-card">
                No representatives listed for the {activeTab} department yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PG Representatives Section */}
      <section className="space-y-6 pt-8 border-t border-border dark:border-darkBorder">
        <h3 className="font-display font-bold text-xl text-navy dark:text-white select-none mb-6">
          Postgraduate Representatives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgReps.length > 0 ? (
            pgReps.map((rep) => <MemberCard key={rep.id} member={rep} />)
          ) : (
            <div className="col-span-full py-10 text-center text-textSecondary dark:text-slate-400 font-body text-sm select-none border border-dashed border-border dark:border-darkBorder rounded-card">
              No postgraduate representatives listed yet (CSE, EEE, IT, ME).
            </div>
          )}
        </div>
      </section>

      {/* Profile Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy bg-opacity-70 dark:bg-opacity-90">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-darkCard rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-xl border border-border dark:border-darkBorder"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-darkBg text-textSecondary dark:text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header profile info */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start select-none">
                <div className="w-24 h-24 rounded-full border-2 border-crimson overflow-hidden bg-slate-100 dark:bg-darkBg flex-shrink-0 flex items-center justify-center font-display font-extrabold text-navy dark:text-white text-3xl">
                  {selectedMember.photo ? (
                    <img
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    selectedMember.name.split(' ').map((n) => n[0]).join('')
                  )}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="px-2.5 py-0.5 bg-crimson text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                    {selectedMember.position === 'SC/ST Representative' ? 'Executive Member' : selectedMember.position}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-navy dark:text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="text-textSecondary dark:text-slate-400 text-xs sm:text-sm font-medium">
                    Department of {selectedMember.department} <span className="text-slate-300 dark:text-slate-600 mx-1">•</span> Semester {selectedMember.semester}
                  </p>
                </div>
              </div>

              {/* Bio Statement */}
              {selectedMember.bio && (
                <div className="space-y-2">
                  <h4 className="font-body font-bold text-xs uppercase tracking-wider text-navy dark:text-white">About:</h4>
                  <p className="text-textSecondary dark:text-slate-300 text-sm leading-relaxed font-body">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {/* Vision Statement */}
              {selectedMember.vision && (
                <div className="bg-surface dark:bg-darkBg rounded-card p-4 border-l-2 border-crimson italic text-textSecondary dark:text-slate-300 text-sm leading-relaxed font-body">
                  "{selectedMember.vision}"
                </div>
              )}

              {/* Responsibilities list */}
              {selectedMember.responsibilities && selectedMember.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-body font-bold text-xs uppercase tracking-wider text-navy dark:text-white">Responsibilities:</h4>
                  <ul className="space-y-1 text-xs text-textSecondary dark:text-slate-400 list-disc list-inside">
                    {selectedMember.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social and Contact Info */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 border-t border-border dark:border-darkBorder">
                {selectedMember.contact.email && (
                  <a
                    href={`mailto:${selectedMember.contact.email}`}
                    className="text-xs text-textSecondary dark:text-slate-400 hover:text-crimson transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {selectedMember.contact.email}
                  </a>
                )}
                {selectedMember.contact.phone && (
                  <a
                    href={`tel:${selectedMember.contact.phone}`}
                    className="text-xs text-textSecondary dark:text-slate-400 hover:text-crimson transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {selectedMember.contact.phone}
                  </a>
                )}
                <div className="flex items-center space-x-3">
                  {selectedMember.socials.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMember.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
                      aria-label="Instagram Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                      </svg>
                    </a>
                  )}
                  {selectedMember.socials.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${selectedMember.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {selectedMember.socials.github && (
                    <a
                      href={`https://github.com/${selectedMember.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-500 hover:text-crimson transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnionMembers;
