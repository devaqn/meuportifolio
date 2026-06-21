import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CursorGlow from '@/components/CursorGlow';

const About = lazy(() => import('@/components/About'));
const Services = lazy(() => import('@/components/Services'));
const Projects = lazy(() => import('@/components/Projects'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <CursorGlow />
      <div id="hero">
        <Hero />
      </div>
      <Suspense fallback={null}>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </Suspense>
    </main>
  );
};

export default Index;
