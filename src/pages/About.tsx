import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { fadeUp, staggerContainer } from '../animations/variants';

const COLLEGE_HISTORY = [
  {
    year: '2001',
    title: 'GEC Palakkad Established',
    description: 'The college was founded by the Government of Kerala, starting its operations in temporary campus facilities in Palakkad.',
  },
  {
    year: '2003',
    title: 'Campus Foundation Laying',
    description: 'The foundation stone was laid for the permanent campus at Sreekrishnapuram, Palakkad, marking the start of institutional development.',
  },
  {
    year: '2007',
    title: 'Shifting to Sreekrishnapuram',
    description: 'The college successfully moved to its sprawling 30-acre permanent campus, housing modern laboratories and academic blocks.',
  },
  {
    year: '2011',
    title: 'First NBA Accreditation',
    description: 'Key undergraduate branches (Computer Science & Engineering, Electronics & Communication Engineering, and Mechanical Engineering) received prestigious NBA accreditation.',
  },
  {
    year: '2015',
    title: 'Affiliation with KTU',
    description: 'The academic programs shifted affiliation to the newly formed APJ Abdul Kalam Technological University (KTU), Kerala.',
  },
  {
    year: '2021',
    title: '20 Years of Academic Excellence',
    description: 'GEC Palakkad celebrated its Vigintennial (20th) anniversary of providing quality engineering education to the student community.',
  },
  {
    year: '2024',
    title: 'New PG Programs & NBA Extension',
    description: 'Launched advanced M.Tech programs in AI & Data Science and Internet of Things (IoT). The Electrical & Electronics Engineering program also secured NBA accreditation.',
  },
];

const ELECTION_STEPS = [
  {
    step: '1',
    title: 'Nomination Filing',
    description: 'Eligible candidates submit nomination papers for executive bearer posts and department representatives.',
  },
  {
    step: '2',
    title: 'Verification & Scrutiny',
    description: 'Nominations are reviewed by the returning officer against KTU academic and attendance eligibility criteria.',
  },
  {
    step: '3',
    title: 'Campaign Period',
    description: 'Candidates introduce their visions, manifestos, and hold debates across departments in a peaceful, secular environment.',
  },
  {
    step: '4',
    title: 'Voting Day',
    description: 'Students cast secret ballots using digital voting or printed ballot papers overseen by faculty polling officers.',
  },
  {
    step: '5',
    title: 'Result Announcement',
    description: 'Votes are counted on the same evening, followed by official result publication by the Principal.',
  },
];

const PAST_UNIONS = [
  { year: '2023–25', chairperson: 'Shahabas Aman', name: 'Advaya Union' },
  { year: '2021–23', chairperson: 'Anjali S.', name: 'Aikya Union' },
  { year: '2019–21', chairperson: 'Gokul Krishna', name: 'Sargam Union' },
];

export const About = () => {
  return (
    <div className="space-y-0 text-textPrimary dark:text-darkText">
      <SEO title="About Us" description="Learn about GEC Palakkad College Union history, core values, constitution, democratic election process, and previous terms." />
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#17233f] to-slate-900 text-white py-14 md:py-20 select-none border-b border-border/40 dark:border-darkBorder">
        {/* Ambient background glow effects */}
        <div className="absolute -top-12 -left-12 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-4 max-w-3xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-2xs font-semibold uppercase tracking-wider text-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                History & Governance
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight"
              >
                About the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-gold">College Union</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-slate-300 text-xs sm:text-sm font-body leading-relaxed max-w-2xl"
              >
                The secular, democratic student government uniting and empowering students of Government Engineering College, Palakkad since 2001.
              </motion.p>
              {/* Breadcrumb */}
              <motion.nav variants={fadeUp} className="text-xs sm:text-sm font-body font-medium text-slate-400 pt-1">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-slate-200">About</span>
              </motion.nav>
            </div>

            {/* Quick stats floating card */}
            <motion.div variants={fadeUp} className="hidden lg:flex flex-col gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-card shadow-lg min-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center text-crimson">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-body">Founded in 2001</div>
                  <div className="text-4xs text-slate-400">25+ Years of Leadership</div>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-body">KTU Affiliated</div>
                  <div className="text-4xs text-slate-400">Democratic Election System</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: COLLEGE HISTORY TIMELINE */}
      <section className="py-20 bg-white dark:bg-darkBg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Our Legacy</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy dark:text-white">College History & Milestones</h2>
          </div>

          <div className="relative border-l border-slate-200 dark:border-darkBorder ml-4 md:ml-6 space-y-12">
            {COLLEGE_HISTORY.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-10">
                {/* Gold Circle Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gold border-4 border-white dark:border-darkBg shadow-sm" />
                
                <div className="space-y-2">
                  <span className="font-display font-extrabold text-lg md:text-xl text-gold tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="font-body font-bold text-base md:text-lg text-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VISION, MISSION, OBJECTIVES */}
      <section className="py-20 bg-surface dark:bg-darkSurface border-y border-border dark:border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Vision - Navy Border */}
            <div className="bg-white dark:bg-darkCard border-t-4 border-navy rounded-card p-8 hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300">
              <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-6">Our Vision</h3>
              <p className="text-textSecondary dark:text-slate-400 text-sm leading-relaxed mb-6">
                To cultivate a democratic, inclusive, and vibrant student community that values secular ethics, intellectual growth, and progressive dialogue at GEC Palakkad.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary dark:text-slate-400 font-body">
                <li className="flex items-start">
                  <span className="text-navy dark:text-navy mr-2">•</span> Fostering secular values in decision-making
                </li>
                <li className="flex items-start">
                  <span className="text-navy dark:text-navy mr-2">•</span> Equal representation across all departments
                </li>
              </ul>
            </div>

            {/* Mission - Crimson Border */}
            <div className="bg-white dark:bg-darkCard border-t-4 border-crimson rounded-card p-8 hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300">
              <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-6">Our Mission</h3>
              <p className="text-textSecondary dark:text-slate-400 text-sm leading-relaxed mb-6">
                To serve as a reliable bridge between students and administration, actively supporting student welfare, academic freedom, co-curricular talents, and infrastructure updates.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary dark:text-slate-400 font-body">
                <li className="flex items-start">
                  <span className="text-crimson mr-2">•</span> Grievance resolution with absolute transparency
                </li>
                <li className="flex items-start">
                  <span className="text-crimson mr-2">•</span> Promoting cultural, sports, and technical workshops
                </li>
              </ul>
            </div>

            {/* Objectives - Gold Border */}
            <div className="bg-white dark:bg-darkCard border-t-4 border-gold rounded-card p-8 hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300">
              <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-6">Our Objectives</h3>
              <p className="text-textSecondary dark:text-slate-400 text-sm leading-relaxed mb-6">
                Ensuring complete student engagement through organized leadership boards, support desks, publication archives, and transparent, scheduled general bodies.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary dark:text-slate-400 font-body">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span> Digital notice dissemination and feedback portals
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span> Organizing annual Arts (Dyuthi) & Sports festivals
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: UNION CONSTITUTION */}
      <section className="py-20 bg-white dark:bg-darkBg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body">Governance Blueprint</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy dark:text-white">Union Constitution & Bylaws</h2>
          <p className="text-textSecondary dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The Secular College Union functions in strict compliance with the bylaws approved by the APJ Abdul Kalam Technological University (KTU) and GEC Palakkad Senate. The constitution safeguards student democracy, defines executive roles, and mandates financial regulations.
          </p>
        </div>
      </section>

      {/* SECTION 5: ELECTION PROCESS */}
      <section className="py-20 bg-surface dark:bg-darkSurface border-t border-border dark:border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Student Democracy</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy dark:text-white">How Elections Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ELECTION_STEPS.map((step) => (
              <div key={step.step} className="bg-white dark:bg-darkCard border border-border dark:border-darkBorder p-6 rounded-card relative hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300">
                <span className="absolute top-4 right-4 font-display font-extrabold text-3xl text-gold/30 dark:text-gold/10">
                  {step.step}
                </span>
                <div className="w-8 h-8 rounded-full bg-navy/10 dark:bg-white/10 flex items-center justify-center text-navy dark:text-white font-body font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-body font-bold text-base text-navy dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-textSecondary dark:text-slate-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: LEADERSHIP MESSAGES */}
      <section className="py-20 bg-white dark:bg-darkBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Principal's Message - Surface Background */}
            <div className="bg-surface dark:bg-darkSurface border border-border dark:border-darkBorder rounded-card p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-3xl font-display text-slate-400">“</span>
                <p className="text-textSecondary dark:text-slate-300 text-sm sm:text-base italic leading-relaxed font-body">
                  Student union activities are central to learning leadership, democracy, and community organization. GEC Palakkad has a proud tradition of secular, peaceful elections and highly productive student initiatives. I congratulate the web team for launching this permanent archive.
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-8 border-t border-slate-200 dark:border-darkBorder mt-8">
                {/* Principal Avatar */}
                <div className="w-12 h-12 rounded-full bg-navy/20 dark:bg-white/10 flex items-center justify-center font-display font-bold text-navy dark:text-white select-none">
                  RB
                </div>
                <div>
                  <h4 className="font-body font-bold text-sm text-navy dark:text-white">Dr. K. R. Remesh Babu</h4>
                  <p className="text-textSecondary dark:text-slate-400 text-xs">Principal, GEC Palakkad</p>
                </div>
              </div>
            </div>

            {/* Chairperson's Message - Crimson Accent */}
            <div className="bg-white dark:bg-darkCard border border-crimson/30 dark:border-crimson/20 rounded-card p-8 md:p-10 flex flex-col justify-between shadow-subtle">
              <div className="space-y-6">
                <span className="text-3xl font-display text-crimson">“</span>
                <p className="text-textSecondary dark:text-slate-300 text-sm sm:text-base italic leading-relaxed font-body">
                  As the representatives of the students, our union is dedicated to representing student welfare and voice. This digital office represents a permanent ledger of GEC student history. Let us unite to support our campus values, secular dialogue, and creative capabilities.
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-8 border-t border-border dark:border-darkBorder mt-8">
                {/* Chairperson Avatar */}
                <div className="w-12 h-12 rounded-full bg-crimson/20 dark:bg-crimson/10 flex items-center justify-center font-display font-bold text-crimson select-none">
                  AV
                </div>
                <div>
                  <h4 className="font-body font-bold text-sm text-navy dark:text-white">Ajmal V. B.</h4>
                  <p className="text-textSecondary dark:text-slate-400 text-xs">Chairperson, Secular College Union (2026-27)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PREVIOUS UNIONS TIMELINE */}
      <section className="py-20 bg-surface dark:bg-darkSurface border-t border-border dark:border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Heritage</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy dark:text-white">Previous Student Unions</h2>
            </div>
            <Link
              to="/archive"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy dark:hover:text-white transition-colors focus:outline-none"
            >
              Explore Full Archive
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="flex space-x-6 min-w-[700px]">
              {PAST_UNIONS.map((union, index) => (
                <div
                  key={index}
                  className="w-56 bg-white dark:bg-darkCard border border-border dark:border-darkBorder rounded-card p-6 flex flex-col justify-between hover:shadow-card hover:-translate-y-0.5 dark:hover:border-slate-700 transition-all duration-300 select-none"
                >
                  <span className="font-display font-extrabold text-gold text-lg">
                    {union.year}
                  </span>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-body font-bold text-navy dark:text-white text-sm">
                      {union.chairperson}
                    </h3>
                    <p className="text-textSecondary dark:text-slate-400 text-xs">
                      Chairperson, {union.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: BOTTOM CTA */}
      <section className="py-16 bg-surface dark:bg-darkSurface border-t border-border dark:border-darkBorder">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson/10 border border-crimson/20 rounded-full text-2xs font-semibold uppercase tracking-wider text-crimson">
            Active Term 2026–27
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy dark:text-white">
            Driven by the Students, For the Students
          </h2>
          <p className="text-textSecondary dark:text-slate-400 text-sm font-body max-w-xl mx-auto leading-relaxed">
            Discover the student leaders serving across executive, arts, sports, and department roles this academic term.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button to="/union-members" variant="primary" size="md">
              Meet Current Union
            </Button>
            <Button to="/student-voice" variant="outline" size="md">
              Share Your Feedback
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
