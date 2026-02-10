import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import Manage from './pages/Manage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Background from './components/Background';
import Preloader from './components/Preloader';
import BackgroundCurves from './components/BackgroundCurves';
import ShootingStars from './components/ShootingStars';
import Meta from './components/Meta'; // Import the new Meta component
import Analytics from './components/Analytics'; // Import Analytics component
import { ProfileProvider, useProfile } from './context/ProfileContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SYSTEM STATUS COMPONENT ---
const SystemStatus = () => {
    const { criticalError, refreshData, loading } = useProfile();

    if (criticalError) {
        return (
            <div className="fixed inset-0 z-[10000] bg-black text-white flex items-center justify-center font-mono p-6">
                <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold uppercase tracking-widest text-red-500">System Load Fail</h1>
                        <p className="text-white/60 text-xs uppercase tracking-wide">Encounter database connection error.</p>
                    </div>
                    
                    <button 
                        onClick={refreshData}
                        disabled={loading}
                        className="px-8 py-3 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Checking...' : 'Recheck..'}
                    </button>
                </div>
            </div>
        );
    }
    return null;
};

// --- ROUTE GUARD COMPONENT ---
const RouteGuard = () => {
    const { loading, settings } = useProfile();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loading) return;

        const path = location.pathname;
        const isAdmin = path.startsWith('/admin');
        const isManage = path.startsWith('/manage');

        if (settings && !settings.isLive) {
            if (!isManage && !isAdmin) {
                navigate('/manage', { replace: true });
            }
            return;
        }
        
    }, [loading, settings, navigate, location]);

    return null;
};

const Layout = () => (
  <>
    {/* Default Global Meta for all pages unless overridden */}
    <Meta /> 
    <Analytics /> {/* Inject Google Analytics if configured */}
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
    <HelmetProvider>
      <ProfileProvider>
        <HashRouter>
          <SystemStatus />
          <Preloader />
          <ScrollToTop />
          <RouteGuard />
          
          <div className="min-h-screen text-textMain selection:bg-accent selection:text-white flex flex-col font-sans relative overflow-x-hidden bg-background transition-colors duration-500">
            <Background />
            <ShootingStars />
            <BackgroundCurves />
            
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
                <Route path="/manage" element={<Manage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </HashRouter>
      </ProfileProvider>
    </HelmetProvider>
  );
};

export default App;