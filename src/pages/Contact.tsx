import SEO from '../components/SEO';

export const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <SEO title="Contact Us" description="Get in touch with the Secular College Union office at Government Engineering College Palakkad." />
      <h1 className="text-4xl font-bold mb-4 text-navy">Contact & Location</h1>
      <p className="text-textSecondary max-w-xl font-body">
        Get in touch with the College Union office at GEC Palakkad.
      </p>
      <div className="mt-8 text-sm text-textSecondary bg-surface border border-border px-4 py-2 rounded-card">
        Coming Soon
      </div>
    </div>
  );
};

export default Contact;
