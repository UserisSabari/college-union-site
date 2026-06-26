import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import PageLoader from './components/ui/PageLoader';

// Route-based code splitting
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const OfficeBearers = React.lazy(() => import('./pages/OfficeBearers'));
const Representatives = React.lazy(() => import('./pages/Representatives'));
const Events = React.lazy(() => import('./pages/Events'));
const News = React.lazy(() => import('./pages/News'));
const Initiatives = React.lazy(() => import('./pages/Initiatives'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Downloads = React.lazy(() => import('./pages/Downloads'));
const StudentVoice = React.lazy(() => import('./pages/StudentVoice'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Archive = React.lazy(() => import('./pages/Archive'));
const ArchiveYear = React.lazy(() => import('./pages/ArchiveYear'));

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/office-bearers" element={<OfficeBearers />} />
              <Route path="/representatives" element={<Representatives />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/student-voice" element={<StudentVoice />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/archive/:year" element={<ArchiveYear />} />
            </Routes>
          </Suspense>
        </div>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;

