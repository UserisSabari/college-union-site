import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';

interface YearCardData {
  year: string;
  yearPath: string;
  chairperson: string;
  stats: {
    members: number;
    events: number;
    initiatives: number;
  };
  thumbnails: string[];
}

const ARCHIVE_YEARS: YearCardData[] = [
  {
    year: '2024-25',
    yearPath: '2024-25',
    chairperson: 'Abhinav T.',
    stats: { members: 12, events: 8, initiatives: 5 },
    thumbnails: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=150',
    ],
  },
  {
    year: '2023-24',
    yearPath: '2023-24',
    chairperson: 'Midhun Murali',
    stats: { members: 10, events: 6, initiatives: 3 },
    thumbnails: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=150',
    ],
  },
  {
    year: '2022-23',
    yearPath: '2022-23',
    chairperson: 'Naveen Kumar',
    stats: { members: 14, events: 9, initiatives: 6 },
    thumbnails: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=150',
    ],
  },
  {
    year: '2021-22',
    yearPath: '2021-22',
    chairperson: 'Gopika Mohan',
    stats: { members: 12, events: 7, initiatives: 4 },
    thumbnails: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150',
    ],
  },
  {
    year: '2020-21',
    yearPath: '2020-21',
    chairperson: 'Arjun Swaminathan',
    stats: { members: 11, events: 5, initiatives: 3 },
    thumbnails: [
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=150',
    ],
  },
];

export const Archive = () => {
  return (
    <div className="space-y-12 py-8 relative">
      <SEO title="Union Archive" description="Every year's College Union term is preserved here permanently. Browse past members lists, events, annual reports, magazines, and initiatives history." />
      
      {/* Page Hero */}
      <section className="bg-navy dark:bg-darkSurface text-white py-12 md:py-16 select-none -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Union Archive — A Living History
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-body max-w-xl">
            Every year's College Union of Government Engineering College Palakkad is preserved here permanently.
          </p>
          <nav className="text-xs sm:text-sm font-body font-medium text-slate-400 pt-2">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-200">Archive</span>
          </nav>
        </div>
      </section>

      {/* Grid of Year Cards */}
      <div className="max-w-7xl mx-auto select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARCHIVE_YEARS.map((item) => (
            <div
              key={item.year}
              className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder p-6 rounded-card shadow-sm hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Year Header */}
                <h3 className="font-display font-bold text-navy dark:text-white text-3xl sm:text-4xl border-b border-border dark:border-darkBorder pb-3">
                  {item.year.replace('-', '–')}
                </h3>
                
                {/* Chairperson Info */}
                <div className="text-xs font-body">
                  <span className="text-textSecondary dark:text-slate-400 uppercase tracking-widest text-3xs font-bold block mb-1">
                    Union Chairperson
                  </span>
                  <span className="text-navy dark:text-white font-bold text-sm">
                    {item.chairperson}
                  </span>
                </div>

                {/* Thumbnails strip */}
                <div className="flex space-x-2">
                  {item.thumbnails.map((src, i) => (
                    <div
                      key={i}
                      className="w-16 h-12 rounded overflow-hidden bg-slate-100 dark:bg-darkBg border border-slate-200 dark:border-darkBorder"
                    >
                      <img
                        src={src}
                        alt="Archive highlight"
                        width={64}
                        height={48}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 border-t border-border dark:border-darkBorder pt-4 text-center">
                  <div className="border-r border-slate-200 dark:border-darkBorder last:border-0 p-1">
                    <p className="text-sm font-bold text-crimson font-body">{item.stats.members}</p>
                    <p className="text-4xs text-textSecondary dark:text-slate-400 uppercase font-medium tracking-wider">Members</p>
                  </div>
                  <div className="border-r border-slate-200 dark:border-darkBorder last:border-0 p-1">
                    <p className="text-sm font-bold text-crimson font-body">{item.stats.events}</p>
                    <p className="text-4xs text-textSecondary dark:text-slate-400 uppercase font-medium tracking-wider">Events</p>
                  </div>
                  <div className="last:border-0 p-1">
                    <p className="text-sm font-bold text-crimson font-body">{item.stats.initiatives}</p>
                    <p className="text-4xs text-textSecondary dark:text-slate-400 uppercase font-medium tracking-wider">Projects</p>
                  </div>
                </div>
              </div>

              {/* Action trigger */}
                <Button
                  to={`/archive/${item.yearPath}`}
                  variant="outline"
                  size="sm"
                  fullWidth={true}
                  className="border-navy dark:border-darkBorder text-navy dark:text-darkText hover:bg-navy dark:hover:bg-darkBorder hover:text-white"
                >
                  View Full Year Archive
                </Button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Archive;
