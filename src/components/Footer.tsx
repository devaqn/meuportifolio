import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: 'https://github.com/devaqn', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/pedro-miguel-5b66a72b5', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:pedromiguelaqn@gmail.com', label: 'E-mail' },
  { icon: Instagram, href: 'https://www.instagram.com/pedromiguel.aqn/', label: 'Instagram' },
];

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative pt-24 md:pt-32 pb-12">
      <div className="absolute inset-0 bg-gradient-footer pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          ref={ctaRef}
          className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-16 mb-20 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/15 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Vamos construir algo{' '}
              <span className="text-gradient">robusto</span> juntos?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Se precisa de APIs, automações ou sistemas com IA, entre em contato.
            </p>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-base transition-all duration-300 hover:gap-5 glow-primary hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Entre em Contato
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </a>
          </div>
        </div>

        <div ref={contentRef} className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-1">Pedro Miguel</h3>
            <p className="text-muted-foreground text-sm">
              Back-End Developer &mdash; APIs, Automação e IA
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="w-11 h-11 rounded-full border border-border bg-card/50 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:scale-110"
              >
                <social.icon className="w-[18px] h-[18px] text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-muted-foreground/60 text-xs">
            &copy; {new Date().getFullYear()} devaqn. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
