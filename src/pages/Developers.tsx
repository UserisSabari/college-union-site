import SEO from '../components/SEO';

const DEVELOPERS = [
  {
    name: 'Sabari S',
    role: 'Lead Developer & Webmaster',
    department: 'Computer Science & Engineering',
    photo: 'https://res.cloudinary.com/gec-palakkad/image/upload/v1783513855/union/UGCS.jpg',
    github: 'UserisSabari',
    linkedin: '#',
    email: 'sabari@gecskp.ac.in',
  },
  {
    name: 'Aiswarya P',
    role: 'Co-Developer & Web Administrator',
    department: 'Information Technology',
    photo: 'https://res.cloudinary.com/gec-palakkad/image/upload/v1783513828/union/AISWARYA_P.jpg',
    github: '#',
    linkedin: '#',
    instagram: 'aiswarya.pravii',
    email: 'aiswarya@gecskp.ac.in',
  }
];

export const Developers = () => {
  return (
    <div className="space-y-12 py-8 select-none">
      <SEO title="Web Team & Developers" description="Meet the developers and creators of the GEC Palakkad College Union digital office portal." />

      <section className="border-l-4 border-crimson pl-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy dark:text-white">
          Union Web Team
        </h1>
        <p className="text-textSecondary dark:text-slate-400 text-sm sm:text-base font-body mt-2 max-w-2xl leading-relaxed">
          The developers, designers, and administrators behind the official Secular College Union portal of Government Engineering College, Palakkad.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
        {DEVELOPERS.map((dev, idx) => (
          <div key={idx} className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder rounded-card p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-100 dark:bg-darkBg border-2 border-crimson mb-6">
              <img src={dev.photo} alt={dev.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-body font-bold text-lg text-navy dark:text-white">{dev.name}</h3>
            <p className="text-crimson text-xs font-semibold uppercase tracking-wider mt-1">{dev.role}</p>
            <p className="text-textSecondary dark:text-slate-400 text-2xs mt-1">{dev.department} Dept.</p>
            
            <div className="flex items-center space-x-3 mt-6">
              {dev.github !== '#' && (
                <a href={`https://github.com/${dev.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors" aria-label="GitHub Profile">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                </a>
              )}
              {dev.instagram && (
                <a href={`https://instagram.com/${dev.instagram}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors" aria-label="Instagram Profile">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {dev.linkedin !== '#' && (
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors" aria-label="LinkedIn Profile">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              )}
              <a href={`mailto:${dev.email}`} className="text-slate-400 hover:text-navy dark:hover:text-white transition-colors" aria-label="Email Developer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
