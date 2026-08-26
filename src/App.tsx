import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/layout/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';

// Route-based code splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const UnionMembers = React.lazy(() => import('./pages/UnionMembers'));
const EventsGallery = React.lazy(() => import('./pages/EventsGallery'));
const UnionUpdates = React.lazy(() => import('./pages/UnionUpdates'));
const StudentVoice = React.lazy(() => import('./pages/StudentVoice'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Archive = React.lazy(() => import('./pages/Archive'));
const ArchiveYear = React.lazy(() => import('./pages/ArchiveYear'));
const Developers = React.lazy(() => import('./pages/Developers'));

// Page transition wrapper — fades each route in from below
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' as const } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/union-members" element={<UnionMembers />} />
            <Route path="/office-bearers" element={<UnionMembers />} />
            <Route path="/updates" element={<UnionUpdates />} />
            <Route path="/news" element={<UnionUpdates />} />
            <Route path="/initiatives" element={<UnionUpdates />} />
            <Route path="/events" element={<EventsGallery />} />
            <Route path="/gallery" element={<EventsGallery />} />
            <Route path="/student-voice" element={<StudentVoice />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:year" element={<ArchiveYear />} />
            <Route path="/developers" element={<Developers />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageWrapper>
        <AnimatedRoutes />
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
