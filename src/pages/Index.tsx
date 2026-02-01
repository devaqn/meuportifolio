import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <CursorGlow />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </main>
  );
};

export default Index;
