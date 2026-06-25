export const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-navy">About the Union</h1>
      <p className="text-textSecondary max-w-xl font-body">
        Learn about the Secular College Union at Government Engineering College, Palakkad.
      </p>
      <div className="mt-8 text-sm text-textSecondary bg-surface border border-border px-4 py-2 rounded-card">
        Coming Soon
      </div>
    </div>
  );
};

export default About;
