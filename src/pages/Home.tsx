export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-navy">Secular College Union</h1>
      <p className="text-lg md:text-xl text-textSecondary max-w-2xl font-body">
        Government Engineering College, Palakkad. Permanent Institutional Digital Platform.
      </p>
      <div className="mt-8 text-sm text-textSecondary bg-surface border border-border px-4 py-2 rounded-card">
        Coming Soon
      </div>
    </div>
  );
};

export default Home;
