import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      {/* Centered Navy Spinner */}
      <div 
        className="w-12 h-12 border-4 border-navy/20 border-t-navy rounded-full animate-spin"
        role="status"
        aria-label="Loading page content"
      />
      {/* Loading Text in DM Sans */}
      <p className="mt-4 text-textSecondary font-body font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default PageLoader;
