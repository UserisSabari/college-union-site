import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

interface Chairperson {
  name: string;
  department: string;
  photo: string;
}

interface StatInfo {
  members: number;
  events: number;
  initiatives: number;
}

interface Member {
  id: string;
  name: string;
  position: string;
  department: string;
  semester: number;
  photo: string;
  bio: string;
}

interface EventInfo {
  id: string;
  title: string;
  date: string;
  venue: string;
}

interface DocumentsInfo {
  report: string;
  magazine: string;
  electionResults: string;
}

interface ArchiveYearData {
  year: string;
  chairperson: Chairperson;
  stats: StatInfo;
  members: Member[];
  events: EventInfo[];
  documents: DocumentsInfo;
  gallery: string[];
}

const DATA_IMPORTERS: Record<string, () => Promise<any>> = {
  '2024-25': () => import('../data/archive/2024-25.json'),
  '2023-24': () => import('../data/archive/2023-24.json'),
  '2022-23': () => import('../data/archive/2022-23.json'),
  '2021-22': () => import('../data/archive/2021-22.json'),
  '2020-21': () => import('../data/archive/2020-21.json'),
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'office-bearers', label: 'Office Bearers' },
  { id: 'events', label: 'Events List' },
  { id: 'gallery', label: 'Gallery Highlights' },
  { id: 'documents', label: 'Documents & Reports' },
] as const;

export const ArchiveYear = () => {
  const { year } = useParams<{ year: string }>();
  const [data, setData] = useState<ArchiveYearData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    if (!year || !DATA_IMPORTERS[year]) {
      setError(`Archive data for the academic year ${year} is not available.`);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    DATA_IMPORTERS[year]()
      .then((module) => {
        setData(module.default || module);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to import archive data', err);
        setError('Failed to load archive data. Please try again.');
        setLoading(false);
      });
  }, [year]);

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // offset for sticky header navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] select-none">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-crimson rounded-full animate-spin" />
        <p className="text-textSecondary text-xs mt-4 font-body">Retrieving historical records...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-6 select-none">
        <div className="w-16 h-16 bg-crimson/5 text-crimson rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-navy text-lg">Archive Not Found</h3>
          <p className="text-textSecondary text-xs font-body leading-relaxed">
            {error || 'The requested year archive does not exist.'}
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/archive"
            className="px-6 py-2.5 bg-navy hover:bg-crimson text-white text-xs font-semibold rounded-button shadow-sm transition-colors uppercase tracking-wider"
          >
            Back to Archives list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8">
      <SEO title={`Union Archive ${year}`} description={`Explore historical records, office bearers list, events, gallery, and annual reports for GEC Palakkad College Union term ${year}.`} />
      
      {/* Page Hero */}
      <section className="bg-navy text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Academic Year {data.year.replace('-', '–')}
          </h1>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/archive" className="hover:text-gold transition-colors">Archive</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">{data.year}</span>
          </nav>
        </div>
      </section>

      {/* Main Grid: Sidebar + Scroll Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky side nav (desktop only) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 select-none">
          <div className="bg-white border border-border rounded-card p-5 space-y-4">
            <h4 className="text-4xs font-bold text-navy uppercase tracking-widest font-body border-b border-slate-100 pb-2">
              Archive Directory
            </h4>
            <ul className="space-y-2 font-body text-xs">
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => handleScrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-1.5 rounded transition-all font-semibold ${
                      activeSection === sec.id
                        ? 'bg-crimson/5 text-crimson border-l-2 border-crimson'
                        : 'text-textSecondary hover:text-navy hover:bg-slate-50'
                    }`}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Scrollable sections */}
        <div className="lg:col-span-9 space-y-16">
          
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-3 select-none">
              <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl">
                Year Overview
              </h2>
            </div>

            {/* Chairperson highlight card */}
            <div className="bg-[#F0F2F8] border-l-4 border-navy rounded-card p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full border-2 border-navy overflow-hidden bg-slate-200 flex-shrink-0">
                <img
                  src={data.chairperson.photo}
                  alt={data.chairperson.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-2 py-0.5 bg-navy text-white text-4xs font-semibold rounded uppercase tracking-wider select-none">
                  Union Chairperson
                </span>
                <h3 className="font-display font-bold text-navy text-lg sm:text-xl">
                  {data.chairperson.name}
                </h3>
                <p className="text-textSecondary text-xs font-body">
                  Department of {data.chairperson.department}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 border border-border p-5 rounded-card text-center bg-white select-none">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-crimson font-body">{data.stats.members}</p>
                <p className="text-4xs text-textSecondary uppercase font-semibold tracking-wider mt-1">Elected Members</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-crimson font-body">{data.stats.events}</p>
                <p className="text-4xs text-textSecondary uppercase font-semibold tracking-wider mt-1">Events Hosted</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-crimson font-body">{data.stats.initiatives}</p>
                <p className="text-4xs text-textSecondary uppercase font-semibold tracking-wider mt-1">Projects Launched</p>
              </div>
            </div>
          </section>

          {/* Office Bearers Section */}
          <section id="office-bearers" className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-3 select-none">
              <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl">
                Office Bearers
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-border p-5 rounded-card flex space-x-4 items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-4xs font-bold text-crimson uppercase tracking-wider block">
                      {member.position}
                    </span>
                    <h4 className="font-body font-bold text-navy text-sm leading-tight">
                      {member.name}
                    </h4>
                    <p className="text-textSecondary text-5xs mt-0.5">
                      Sem {member.semester} • {member.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Events List Section */}
          <section id="events" className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-3 select-none">
              <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl">
                Events List
              </h2>
            </div>

            <div className="bg-white border border-border rounded-card overflow-hidden shadow-3xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-body">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border select-none text-navy font-bold uppercase tracking-wider text-4xs">
                      <th className="px-6 py-3">Event Title</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Venue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.events.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-bold text-navy">{event.title}</td>
                        <td className="px-6 py-4 text-textSecondary">{formatDate(event.date)}</td>
                        <td className="px-6 py-4 text-textSecondary">{event.venue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Gallery Highlights Section */}
          <section id="gallery" className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-3 select-none">
              <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl">
                Gallery Highlights
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 select-none">
              {data.gallery.map((photo, i) => (
                <a
                  key={i}
                  href={photo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-32 sm:h-40 rounded-card overflow-hidden border border-border shadow-3xs block bg-slate-50 group"
                >
                  <img
                    src={photo}
                    alt={`Archive highlight ${i + 1}`}
                    width={224}
                    height={160}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Documents Section */}
          <section id="documents" className="scroll-mt-24 space-y-6">
            <div className="border-b border-border pb-3 select-none">
              <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl">
                Documents & Reports
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 select-none">
              {data.documents.report && (
                <a
                  href={data.documents.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-border p-5 rounded-card flex items-center space-x-3 hover:border-crimson hover:shadow-subtle transition-all"
                >
                  <div className="p-2.5 bg-red-50 text-red-600 rounded">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xs font-extrabold text-navy font-body">Annual Report</h4>
                    <p className="text-5xs text-textSecondary font-body mt-0.5">Download PDF</p>
                  </div>
                </a>
              )}

              {data.documents.magazine && (
                <a
                  href={data.documents.magazine}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-border p-5 rounded-card flex items-center space-x-3 hover:border-crimson hover:shadow-subtle transition-all"
                >
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xs font-extrabold text-navy font-body">Union Magazine</h4>
                    <p className="text-5xs text-textSecondary font-body mt-0.5">Download PDF</p>
                  </div>
                </a>
              )}

              {data.documents.electionResults && (
                <a
                  href={data.documents.electionResults}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-border p-5 rounded-card flex items-center space-x-3 hover:border-crimson hover:shadow-subtle transition-all"
                >
                  <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xs font-extrabold text-navy font-body">Election Results</h4>
                    <p className="text-5xs text-textSecondary font-body mt-0.5">Download PDF</p>
                  </div>
                </a>
              )}
            </div>
          </section>

        </div>
      </div>

    </div>
  );
};

export default ArchiveYear;
