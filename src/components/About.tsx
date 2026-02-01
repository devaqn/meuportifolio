import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aboutTexts = [
  "Sou um desenvolvedor apaixonado por criar experiências digitais. Combino design e código para transformar ideias em realidade.",
  
  "Com experiência em desenvolvimento web, especializo-me em criar interfaces modernas, responsivas e com animações fluidas",

  "Acredito que cada projeto é uma oportunidade de inovar. Meu objetivo é entregar soluções que não apenas funcionam, mas que inspiram e conectam pessoas."
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      containerRefs.current.forEach((container) => {
        if (!container) return;
        
        const lines = container.querySelectorAll('.line-wrapper');
        
        gsap.fromTo(
          lines,
          { yPercent: 120 },
          {
            yPercent: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitIntoLines = (text: string) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach((word) => {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      
      if (testLine.length > 50) {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top 70%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 will-change-transform">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24">
          <span className="text-primary text-sm tracking-widest uppercase">
            Sobre Mim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Quem sou eu
          </h2>
        </div>

        <div className="space-y-48">
          {aboutTexts.map((text, index) => (
            <div
              key={index}
              ref={(el) => (containerRefs.current[index] = el)}
              className="relative"
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground/90 text-center">
                {splitIntoLines(text).map((line, lineIndex) => (
                  <span key={lineIndex} className="line-mask block overflow-hidden">
                    <span className="line-wrapper block">
                      {line}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-32" />
    </section>
  );
};

export default About;