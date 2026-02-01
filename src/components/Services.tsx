import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Code, Palette, Rocket, Smartphone, Globe, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const services = [
  {
    icon: Code,
    title: 'Desenvolvimento Web',
    description: 'Sites e aplicações modernas com as melhores tecnologias.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces intuitivas e experiências memoráveis.',
  },
  {
    icon: Smartphone,
    title: 'Design Responsivo',
    description: 'Layouts perfeitos em qualquer dispositivo.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Otimização para velocidade e SEO.',
  },
  {
    icon: Globe,
    title: 'Aplicações Web',
    description: 'PWAs e SPAs com funcionalidades avançadas.',
  },
  {
    icon: Sparkles,
    title: 'Animações',
    description: 'Microinterações e transições fluidas.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

        // Animate service cards appearing
        containers.forEach((container, i) => {
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

    const ctx = createTimeline();
    
    const handleResize = () => {
      ctx.revert();
      createTimeline();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const positions = [
    { left: '10%', top: '5%' },
    { right: '15%', top: '20%' },
    { left: '5%', top: '40%' },
    { right: '10%', top: '55%' },
    { left: '15%', top: '75%' },
    { right: '5%', top: '90%' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <span className="text-primary text-sm tracking-widest uppercase">
          Serviços
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gradient">
          O que eu faço
        </h2>
      </div>

      <div ref={mainRef} className="relative" style={{ height: '300vh' }}>
        {/* Initial box position */}
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

        {/* Service containers */}
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
            <div className="service-card group p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:glow-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
