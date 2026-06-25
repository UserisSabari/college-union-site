export const Gallery = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-navy">Gallery</h1>
      <p className="text-textSecondary max-w-xl font-body">
        Browse photographs and video captures of various campus events and achievements.
      </p>
      <div className="mt-8 text-sm text-textSecondary bg-surface border border-border px-4 py-2 rounded-card">
        Coming Soon
      </div>
    </div>
  );
};

export default Gallery;
