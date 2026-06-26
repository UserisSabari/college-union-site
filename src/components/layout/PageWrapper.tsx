import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-textPrimary">
      {/* Header / Navigation */}
      <Navbar />

      {/* Main Focus Area for Screen Readers & Skip Navigation */}
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        {children}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default PageWrapper;
