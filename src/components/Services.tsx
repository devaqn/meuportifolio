import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Code, Bot, Server, Database, Globe, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const services = [
  {
    icon: Code,
    title: 'APIs & Back-End',
    description: 'APIs REST e microsserviços escaláveis com Node.js e TypeScript.',
  },
  {
    icon: Bot,
    title: 'Bots & Automação',
    description: 'Bots de WhatsApp, automações de processos e integrações inteligentes.',
  },
  {
    icon: Sparkles,
    title: 'Integração com IA',
    description: 'RAG, classificação, lead scoring e agentes com Claude, GPT e Gemini.',
  },
  {
    icon: Database,
    title: 'Banco de Dados',
    description: 'PostgreSQL, pgvector, MongoDB, Redis — modelagem e otimização.',
  },
  {
    icon: Server,
    title: 'DevOps & Infra',
    description: 'Deploy em VPS/Linux, PM2, Docker, Terraform e monitoramento.',
  },
  {
    icon: Globe,
    title: 'Sistemas Web',
    description: 'Plataformas SaaS completas, e-commerce e painéis de gestão.',
  },
];

const positions = [
  { left: '10%', top: '5%' },
  { right: '15%', top: '20%' },
  { left: '5%', top: '40%' },
  { right: '10%', top: '55%' },
  { left: '15%', top: '75%' },
  { right: '5%', top: '90%' },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const createTimeline = () => {
        const ctx = gsap.context(() => {
          const box = boxRef.current;
          if (!box) return;

          const boxStartRect = box.getBoundingClientRect();
          const containers = containerRefs.current.filter(Boolean);

          const points = containers.map((container) => {
            if (!container) return { x: 0, y: 0 };
            const r = container.getBoundingClientRect();
            return {
              x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
              y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2),
            };
          });

          gsap.to(box, {
            duration: 1,
            ease: 'none',
            motionPath: {
              path: points,
              curviness: 1.5,
            },
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top center',
              endTrigger: sectionRef.current,
              end: 'bottom center',
              scrub: 1,
            },
          });

          containers.forEach((container) => {
            if (!container) return;
            gsap.fromTo(
              container.querySelector('.service-card'),
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: container,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }, sectionRef);

        return ctx;
      };

      let ctx = createTimeline();

      const handleResize = () => {
        ctx.revert();
        ctx = createTimeline();
      };

      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        ctx.revert();
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
          Serviços
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gradient">
          O que eu faço
        </h2>
      </div>

      <div ref={mainRef} className="relative" style={{ height: '300vh' }}>
        <div
          className="absolute flex items-center justify-center"
          style={{ left: '50%', top: '2%', transform: 'translateX(-50%)' }}
        >
          <div
            ref={boxRef}
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-primary glow-primary flex items-center justify-center z-20"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (containerRefs.current[index] = el)}
            className="absolute w-64 md:w-80"
            style={{
              ...positions[index],
              top: positions[index].top,
            }}
          >
            <div className="service-card group p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
