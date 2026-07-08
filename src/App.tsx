import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import PageLoader from './components/ui/PageLoader';

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

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<PageLoader />}>
            <Routes>
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
        </div>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;

