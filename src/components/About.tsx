import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aboutTexts = [
  "Construo APIs, automações e integrações com IA que resolvem problemas reais de negócios — do protótipo à produção.",

  "Node.js, PostgreSQL, bots de WhatsApp e infraestrutura Linux. Arquiteturas escaláveis, automações inteligentes, sistemas que não caem.",

  "Microsserviços, filas, RAG com LLMs, segurança e infraestrutura como código. Do deploy ao monitoramento, cuido de todo o ciclo."
];

const splitIntoLines = (text: string) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (testLine.length > 45) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lines = useMemo(() => aboutTexts.map(splitIntoLines), []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        containerRefs.current.forEach((container) => {
          if (!container) return;

          const wrappers = container.querySelectorAll('.line-wrapper');

          gsap.fromTo(
            wrappers,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 82%',
                end: 'bottom 55%',
                scrub: 1,
              },
            }
          );
        });

        gsap.fromTo(
          sectionRef.current,
          { y: 80, opacity: 0 },
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
      }, sectionRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sectionRef.current, { y: 0, opacity: 1 });
      containerRefs.current.forEach((container) => {
        if (!container) return;
        gsap.set(container.querySelectorAll('.line-wrapper'), { yPercent: 0, opacity: 1 });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 will-change-transform">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
            Sobre Mim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Quem eu sou
          </h2>
        </div>

        <div className="space-y-40">
          {lines.map((lineGroup, index) => (
            <div
              key={index}
              ref={(el) => (containerRefs.current[index] = el)}
              className="relative"
            >
              <h3 className="text-2xl md:text-3xl lg:text-[2.75rem] font-semibold leading-snug text-foreground/90 text-center">
                {lineGroup.map((line, lineIndex) => (
                  <span key={lineIndex} className="line-mask block overflow-hidden">
                    <span className="line-wrapper block will-change-transform">
                      {line}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="h-24" />
    </section>
  );
};

export default About;
