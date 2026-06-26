import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryType = 'suggestion' | 'complaint' | 'idea' | 'feedback';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Is this really anonymous?',
    answer: 'Yes, completely. We do not track IP addresses, log session metadata, or request user identifiers. Your feedback goes straight into our secure storage anonymously.',
  },
  {
    question: 'Who reads these submissions?',
    answer: 'The Chairperson and the General Secretary review all incoming messages on a weekly basis to coordinate department representations and college updates.',
  },
  {
    question: 'How long until I see action?',
    answer: 'We categorize critical campus issues immediately. General suggestions and amenities feedback are discussed during our fortnightly executive council meetings.',
  },
  {
    question: 'Can I follow up?',
    answer: 'Since submissions are entirely anonymous, we cannot reply to you directly. However, we publish official union updates and resolved concerns on the News & Notices page.',
  },
];

export const StudentVoice = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [department, setDepartment] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const minChars = 10;
  const isMessageValid = message.length >= minChars;

  // Calculate SVG progress ring values
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(message.length / minChars, 1);
  const strokeDashoffset = circumference - percentage * circumference;

  // Modern SVG Icons Mapper
  const getCategoryIcon = (category: CategoryType, isActive: boolean) => {
    const strokeColor = isActive ? 'stroke-crimson' : 'stroke-slate-400 group-hover:stroke-navy transition-colors';
    switch (category) {
      case 'suggestion':
        return (
          <svg className={`w-8 h-8 ${strokeColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'complaint':
        return (
          <svg className={`w-8 h-8 ${strokeColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'idea':
        return (
          <svg className={`w-8 h-8 ${strokeColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L11 3z" />
          </svg>
        );
      case 'feedback':
        return (
          <svg className={`w-8 h-8 ${strokeColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !subject || !isMessageValid) return;

    // Create feedback payload
    const feedbackPayload = {
      id: `feedback-${Date.now()}`,
      category: selectedCategory,
      department,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Simulated submission to LocalStorage for Phase 1
    // TODO: Replace with backend API in Phase 2
    try {
      const existing = localStorage.getItem('student_feedback_demo');
      const list = existing ? JSON.parse(existing) : [];
      list.push(feedbackPayload);
      localStorage.setItem('student_feedback_demo', JSON.stringify(list));
    } catch (err) {
      console.warn('LocalStorage error during simulation storage', err);
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setDepartment('General');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="space-y-12 py-8 relative">
      <SEO title="Student Voice" description="Submit ideas, suggestions, complaints, or feedback anonymously to the GEC Palakkad College Union. Your privacy is guaranteed." />
      
      {/* Page Hero with premium mesh gradient design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#1e293b] to-slate-900 text-white py-14 md:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 select-none shadow-md rounded-b-card">
        {/* Background decorative blurry circles */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Your Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-[#f43f5e]">Matters</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-body leading-relaxed">
              Share your ideas, suggestions, or concerns anonymously. The College Union reads every submission.
            </p>
            <nav className="text-xs sm:text-sm font-body font-medium text-slate-400 pt-2">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-slate-200">Student Voice</span>
            </nav>
          </div>

          {/* Floating shield badge graphic */}
          <div className="flex-shrink-0 flex items-center md:justify-end">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-card shadow-lg flex items-center space-x-4 max-w-xs">
              <div className="w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center text-crimson">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Anonymous</h4>
                <p className="text-slate-400 text-4xs mt-0.5 leading-normal">
                  No IP tracking, cookies, or user identifiers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="feedback-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              
              {/* Category selector grid */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-navy uppercase tracking-wider font-body select-none">
                  Select Submission Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(['suggestion', 'complaint', 'idea', 'feedback'] as const).map((cat) => {
                    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-6 border rounded-card flex flex-col items-center justify-center space-y-3 text-center transition-all duration-300 relative overflow-hidden group ${
                          isActive
                            ? 'border-crimson bg-crimson/5 text-crimson shadow-sm scale-102 font-bold'
                            : 'border-border bg-white text-textSecondary hover:border-navy hover:text-navy hover:shadow-xs hover:scale-101'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-0 right-0 w-3 h-3 bg-crimson rounded-bl" />
                        )}
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {getCategoryIcon(cat, isActive)}
                        </span>
                        <span className="text-xs font-body font-extrabold">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form container */}
              <form onSubmit={handleSubmit} className="bg-white border border-border p-6 sm:p-8 rounded-card space-y-6 shadow-sm">
                
                {/* Department Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="dept" className="text-2xs font-bold text-navy uppercase tracking-wider font-body select-none">
                    Target Department
                  </label>
                  <select
                    id="dept"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-button text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all bg-white shadow-2xs"
                  >
                    <option value="General">All Departments / General</option>
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics (ECE)</option>
                    <option value="EEE">Electrical (EEE)</option>
                    <option value="ME">Mechanical (ME)</option>
                    <option value="CE">Civil (CE)</option>
                    <option value="AE">Applied Electronics (AE)</option>
                  </select>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-2xs font-bold text-navy uppercase tracking-wider font-body select-none">
                    Subject Brief
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="E.g., Hostels Wi-Fi disruption / Canteen menu suggestion"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-button text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                {/* Detailed Feedback with circular progress ring */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center select-none">
                    <label htmlFor="msg" className="text-2xs font-bold text-navy uppercase tracking-wider font-body">
                      Detailed Message / Feedback
                    </label>
                    
                    {/* SVG Circular Progress Loader */}
                    <div className="flex items-center space-x-2">
                      <span className={`text-4xs font-bold font-body ${isMessageValid ? 'text-green-600' : 'text-crimson'}`}>
                        {message.length} / {minChars} min chars
                      </span>
                      <svg className="w-5 h-5 -rotate-90">
                        <circle
                          cx="10"
                          cy="10"
                          r={radius}
                          stroke="#E5E5EA"
                          strokeWidth="2"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="10"
                          cy="10"
                          r={radius}
                          stroke={isMessageValid ? '#10B981' : '#C8003A'}
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 0.1 }}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <textarea
                    id="msg"
                    required
                    rows={6}
                    placeholder="Provide as much context as possible. Remember to exclude any personal details if you want to remain 100% anonymous..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-card text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-all resize-y shadow-2xs"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 select-none">
                  <Button
                    type="submit"
                    disabled={!selectedCategory || !subject || !isMessageValid}
                    variant="secondary"
                    fullWidth={true}
                    className={(!selectedCategory || !subject || !isMessageValid) ? 'opacity-40 cursor-not-allowed' : ''}
                  >
                    Submit Anonymously
                  </Button>
                </div>

              </form>

            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-border p-8 rounded-card text-center space-y-6 shadow-sm"
            >
              {/* spring checkmark animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto select-none border border-green-100 shadow-2xs"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-navy text-xl">
                  Feedback Submitted
                </h3>
                <p className="text-textSecondary text-xs sm:text-sm font-body leading-relaxed max-w-md mx-auto">
                  Your voice has been heard. Thank you for helping make GEC Palakkad better.
                </p>
              </div>
              
              <div className="pt-4 select-none">
                <Button
                  onClick={handleReset}
                  variant="primary"
                >
                  Submit Another Feedback
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Redesigned Accordion FAQ */}
      <section className="max-w-3xl mx-auto pt-10 border-t border-border space-y-6">
        <h3 className="font-display font-bold text-lg sm:text-xl text-navy text-center select-none">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-card overflow-hidden shadow-2xs transition-all duration-300 ${
                  isExpanded ? 'border-l-4 border-l-crimson border-y border-r border-border' : 'border-border'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors focus:outline-none select-none text-left"
                >
                  <span className="font-body font-bold text-navy text-xs sm:text-sm">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-crimson' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs sm:text-sm text-textSecondary font-body leading-relaxed pt-2 border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default StudentVoice;
