import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative pt-32 pb-12">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-footer pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-16 mb-24 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Vamos criar algo{' '}
              <span className="text-gradient">incrível</span> juntos?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Estou sempre aberto a novos projetos e colaborações. 
              Entre em contato e vamos transformar sua ideia em realidade.
            </p>

            <a href="https://wa.me/5581995250365" target="_blank" rel="noopener noreferrer">
              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg transition-all hover:gap-5 glow-primary hover:scale-105">
                Entre em Contato
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </a>
          </div>
        </div>

        {/* Footer content */}
        <div ref={contentRef} className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Gabriel Motta</h3>
            <p className="text-muted-foreground text-sm">
              Criando experiências digitais únicas
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/GabrielVictor07', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/gabriel-victor-a677b9344/', label: 'LinkedIn' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Instagram, href: 'https://www.instagram.com/dev_motta07/', label: 'Instagram' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-border bg-card/50 flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Seu Nome. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
