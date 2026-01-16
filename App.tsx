
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CTA from './components/CTA';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import ProjectDetail from './pages/ProjectDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import NotFound from './pages/NotFound';
import Background from './components/Background';
import Preloader from './components/Preloader';
import BackgroundCurves from './components/BackgroundCurves';
import ShootingStars from './components/ShootingStars';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTitleUpdater = () => {
  const location = useLocation();
  React.useEffect(() => {
    const path = location.pathname;
    let title = 'My Portfolio | Harishama';
    if (path === '/') title = 'My Portfolio | Harishama';
    else if (path.startsWith('/about')) title = 'About | Harishama';
    else if (path.startsWith('/skills')) title = 'Skills | Harishama';
    else if (path.startsWith('/works')) title = 'Works | Harishama';
    else if (path.startsWith('/contact')) title = 'Contact | Harishama';
    else if (path.startsWith('/privacy-policy')) title = 'Privacy Policy | Harishama';
    else if (path.startsWith('/terms-of-use')) title = 'Terms of Use | Harishama';
    else title = '404 | Page Not Found';
    document.title = title;
  }, [location]);
  return null;
};

const Layout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <CTA />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Preloader />
      <ScrollToTop />
      <PageTitleUpdater />
      
      <div className="min-h-screen text-textMain selection:bg-accent selection:text-white flex flex-col font-sans relative overflow-x-hidden bg-black">
        {/* Visual Background Layers */}
        <Background />
        <ShootingStars />
        <BackgroundCurves />
        
        {/* Main Application Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
