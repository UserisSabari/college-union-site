import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/layout/PageWrapper';
import Home from './pages/Home';
import About from './pages/About';
import OfficeBearers from './pages/OfficeBearers';
import Representatives from './pages/Representatives';
import Events from './pages/Events';
import News from './pages/News';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Downloads from './pages/Downloads';
import StudentVoice from './pages/StudentVoice';
import Contact from './pages/Contact';
import Archive from './pages/Archive';
import ArchiveYear from './pages/ArchiveYear';

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </div>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;

