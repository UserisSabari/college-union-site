import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  { year: '2024–25', chairperson: 'Siddharth K.', name: 'Secular Union' },
  { year: '2023–24', chairperson: 'Abhinav T.', name: 'Advaya Union' },
  { year: '2022–23', chairperson: 'Niveditha R.', name: 'Navodaya Union' },
  { year: '2021–22', chairperson: 'Gokul Krishna', name: 'Sargam Union' },
  { year: '2020–21', chairperson: 'Anjali S.', name: 'Aikya Union' },
];

export const About = () => {
  return (
    <div className="space-y-0 text-textPrimary">
      
      {/* SECTION 1: HERO */}
      <section className="bg-navy text-white py-12 md:py-16 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4"
          >
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
            >
              About the College Union
            </motion.h1>
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="text-xs sm:text-sm font-body font-medium text-slate-400">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-slate-200">About</span>
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: COLLEGE HISTORY TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Our Legacy</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">College History & Milestones</h2>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-12">
            {COLLEGE_HISTORY.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-10">
                {/* Gold Circle Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gold border-4 border-white shadow-sm" />
                
                <div className="space-y-2">
                  <span className="font-display font-extrabold text-lg md:text-xl text-gold tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="font-body font-bold text-base md:text-lg text-navy">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary text-sm leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VISION, MISSION, OBJECTIVES */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Vision - Navy Border */}
            <div className="bg-white border-t-4 border-navy rounded-card p-8 hover:shadow-subtle transition-all">
              <h3 className="font-display font-bold text-xl text-navy mb-6">Our Vision</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-6">
                To cultivate a democratic, inclusive, and vibrant student community that values secular ethics, intellectual growth, and progressive dialogue at GEC Palakkad.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary font-body">
                <li className="flex items-start">
                  <span className="text-navy mr-2">•</span> Fostering secular values in decision-making
                </li>
                <li className="flex items-start">
                  <span className="text-navy mr-2">•</span> Equal representation across all departments
                </li>
              </ul>
            </div>

            {/* Mission - Crimson Border */}
            <div className="bg-white border-t-4 border-crimson rounded-card p-8 hover:shadow-subtle transition-all">
              <h3 className="font-display font-bold text-xl text-navy mb-6">Our Mission</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-6">
                To serve as a reliable bridge between students and administration, actively supporting student welfare, academic freedom, co-curricular talents, and infrastructure updates.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary font-body">
                <li className="flex items-start">
                  <span className="text-crimson mr-2">•</span> Grievance resolution with absolute transparency
                </li>
                <li className="flex items-start">
                  <span className="text-crimson mr-2">•</span> Promoting cultural, sports, and technical workshops
                </li>
              </ul>
            </div>

            {/* Objectives - Gold Border */}
            <div className="bg-white border-t-4 border-gold rounded-card p-8 hover:shadow-subtle transition-all">
              <h3 className="font-display font-bold text-xl text-navy mb-6">Our Objectives</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-6">
                Ensuring complete student engagement through organized leadership boards, support desks, publication archives, and transparent, scheduled general bodies.
              </p>
              <ul className="space-y-2 text-xs text-textSecondary font-body">
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body">Governance Blueprint</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Union Constitution & Bylaws</h2>
          <p className="text-textSecondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The Secular College Union functions in strict compliance with the bylaws approved by the APJ Abdul Kalam Technological University (KTU) and GEC Palakkad Senate. The constitution safeguards student democracy, defines executive roles, and mandates financial regulations.
          </p>
          <div className="pt-4">
            <a
              href="https://res.cloudinary.com/gec-palakkad/raw/upload/v1/documents/union_constitution.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-navy hover:bg-opacity-95 text-white font-body font-semibold text-sm rounded-button transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Constitution PDF
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: ELECTION PROCESS */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Student Democracy</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">How Elections Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ELECTION_STEPS.map((step) => (
              <div key={step.step} className="bg-white border border-border p-6 rounded-card relative hover:shadow-subtle transition-all">
                <span className="absolute top-4 right-4 font-display font-extrabold text-3xl text-gold/30">
                  {step.step}
                </span>
                <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy font-body font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-body font-bold text-base text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-textSecondary text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: LEADERSHIP MESSAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Principal's Message - Surface Background */}
            <div className="bg-surface border border-border rounded-card p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-3xl font-display text-slate-400">“</span>
                <p className="text-textSecondary text-sm sm:text-base italic leading-relaxed font-body">
                  Student union activities are central to learning leadership, democracy, and community organization. GEC Palakkad has a proud tradition of secular, peaceful elections and highly productive student initiatives. I congratulate the web team for launching this permanent archive.
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-8 border-t border-slate-200 mt-8">
                {/* Principal Avatar */}
                <div className="w-12 h-12 rounded-full bg-navy/20 flex items-center justify-center font-display font-bold text-navy select-none">
                  PJ
                </div>
                <div>
                  <h4 className="font-body font-bold text-sm text-navy">Dr. A. R. Jayan</h4>
                  <p className="text-textSecondary text-xs">Principal, GEC Palakkad</p>
                </div>
              </div>
            </div>

            {/* Chairperson's Message - Crimson Accent */}
            <div className="bg-white border border-crimson/30 rounded-card p-8 md:p-10 flex flex-col justify-between shadow-subtle">
              <div className="space-y-6">
                <span className="text-3xl font-display text-crimson">“</span>
                <p className="text-textSecondary text-sm sm:text-base italic leading-relaxed font-body">
                  As the representatives of the students, our union is dedicated to representing student welfare and voice. This digital office represents a permanent ledger of GEC student history. Let us unite to support our campus values, secular dialogue, and creative capabilities.
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-8 border-t border-border mt-8">
                {/* Chairperson Avatar */}
                <div className="w-12 h-12 rounded-full bg-crimson/20 flex items-center justify-center font-display font-bold text-crimson select-none">
                  SK
                </div>
                <div>
                  <h4 className="font-body font-bold text-sm text-navy">Siddharth K.</h4>
                  <p className="text-textSecondary text-xs">Chairperson, Secular Union (2024-25)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PREVIOUS UNIONS TIMELINE */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson font-bold font-body mb-2">Heritage</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">Previous Student Unions</h2>
            </div>
            <Link
              to="/archive"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-crimson hover:text-navy transition-colors focus:outline-none"
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
                  className="w-56 bg-white border border-border rounded-card p-6 flex flex-col justify-between hover:shadow-subtle hover:border-slate-300 transition-all select-none"
                >
                  <span className="font-display font-extrabold text-gold text-lg">
                    {union.year}
                  </span>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-body font-bold text-navy text-sm">
                      {union.chairperson}
                    </h3>
                    <p className="text-textSecondary text-xs">
                      Chairperson, {union.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
