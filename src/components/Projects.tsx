import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

type CategoryFilter = 'all' | 'backend' | 'ia-automacao' | 'saas' | 'devops' | 'ecommerce';

const categories: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'backend', label: 'Backend / APIs' },
  { id: 'ia-automacao', label: 'IA & Automação' },
  { id: 'saas', label: 'SaaS' },
  { id: 'devops', label: 'DevOps' },
  { id: 'ecommerce', label: 'E-commerce' },
];

const projects = [
  {
    id: 1,
    title: 'AI Sales OS',
    category: ['saas', 'ia-automacao', 'backend'] as CategoryFilter[],
    categoryLabel: 'SaaS / IA',
    description: 'SaaS B2B multi-tenant: CRM + pipeline Kanban + vendedor virtual de IA 24/7 via WhatsApp com RAG, lead scoring e fallback multi-LLM.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'pgvector', 'Redis', 'RabbitMQ', 'Terraform'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gradient: 'from-violet-600/70 to-blue-600/70',
    highlight: true,
  },
  {
    id: 2,
    title: 'AI Customer Support OS',
    category: ['saas', 'ia-automacao', 'backend'] as CategoryFilter[],
    categoryLabel: 'SaaS / IA',
    description: 'Plataforma de atendimento com IA: RAG com citação de fontes, quality score automático, billing Stripe, 45+ tabelas, testes E2E.',
    stack: ['Node.js', 'Prisma', 'Socket.io', 'Playwright', 'Stripe', 'k6'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80',
    gradient: 'from-blue-600/70 to-cyan-500/70',
    highlight: false,
  },
  {
    id: 3,
    title: 'Bot Command Center',
    category: ['devops', 'backend'] as CategoryFilter[],
    categoryLabel: 'DevOps',
    description: 'Painel self-hosted para gerenciar bots via PM2: métricas em tempo real, terminal SSH no navegador, deploy via upload, alertas WhatsApp.',
    stack: ['Node.js', 'WebSocket', 'PM2', 'OWASP ZAP', 'RBAC'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    gradient: 'from-emerald-600/70 to-teal-500/70',
    highlight: false,
  },
  {
    id: 4,
    title: 'Bot Financeiro WhatsApp',
    category: ['ia-automacao', 'backend'] as CategoryFilter[],
    categoryLabel: 'Automação / Bot',
    description: 'Bot de controle financeiro pessoal via WhatsApp em produção: saldo, cartões, parcelamento, relatórios com gráficos e exportação PDF.',
    stack: ['Node.js', 'Baileys', 'PostgreSQL', 'Chart.js', 'PDFKit'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    gradient: 'from-amber-500/70 to-orange-500/70',
    highlight: false,
  },
  {
    id: 5,
    title: 'WhatsApp Lead System',
    category: ['ia-automacao', 'backend'] as CategoryFilter[],
    categoryLabel: 'Backend / IA',
    description: 'Captação de leads via WhatsApp com classificação automática por IA (intenção, sentimento, prioridade), API REST e Clean Architecture.',
    stack: ['Node.js', 'MongoDB', 'OpenAI', 'Gemini', 'REST API'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    gradient: 'from-green-500/70 to-emerald-500/70',
    highlight: false,
  },
  {
    id: 6,
    title: 'R&M Náutica Solutions',
    category: ['ecommerce', 'backend'] as CategoryFilter[],
    categoryLabel: 'E-commerce',
    description: 'E-commerce premium para empresa náutica real: checkout multi-step, Mercado Pago, cálculo de frete, upload Cloudinary, e-mails transacionais.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Mercado Pago'],
    // TODO: substituir por screenshot real
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    gradient: 'from-sky-600/70 to-blue-700/70',
    highlight: false,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeFilters, setActiveFilters] = useState<CategoryFilter[]>(['all']);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = useCallback((id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  const updateFilters = useCallback((filter: CategoryFilter) => {
    const items = itemsRef.current.filter(Boolean) as HTMLElement[];
    const state = Flip.getState(items);

    let newFilters: CategoryFilter[];

    if (filter === 'all') {
      newFilters = ['all'];
    } else {
      const currentFilters = activeFilters.filter(f => f !== 'all');

      if (currentFilters.includes(filter)) {
        newFilters = currentFilters.filter(f => f !== filter);
        if (newFilters.length === 0) {
          newFilters = ['all'];
        }
      } else {
        newFilters = [...currentFilters, filter];
      }
    }

    setActiveFilters(newFilters);

    const showAll = newFilters.includes('all');

    items.forEach((item, index) => {
      const project = projects[index];
      const shouldShow = showAll || newFilters.some(f => project.category.includes(f));
      item.style.display = shouldShow ? 'block' : 'none';
    });

    Flip.from(state, {
      duration: 0.6,
      scale: true,
      ease: 'power2.inOut',
      stagger: 0.04,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3 })
    });
  }, [activeFilters]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.projects-header',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.projects-header',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.filter-button',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.filters-container',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        itemsRef.current.forEach((item, i) => {
          if (!item) return;

          gsap.fromTo(
            item,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const isFilterActive = (filter: CategoryFilter) => {
    if (filter === 'all') return activeFilters.includes('all');
    return activeFilters.includes(filter) && !activeFilters.includes('all');
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="projects-header mb-14">
          <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
            Projetos em Destaque
          </h2>
        </div>

        <div className="filters-container flex flex-wrap justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters(cat.id)}
              className={`filter-button relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${isFilterActive(cat.id)
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group block"
            >
              <div className={`relative overflow-hidden rounded-2xl border bg-card transition-all duration-400 group-hover:shadow-2xl group-hover:shadow-primary/8 group-hover:-translate-y-1.5 ${project.highlight ? 'border-primary/30' : 'border-border'} group-hover:border-primary/40`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 transition-opacity duration-500 group-hover:opacity-30`} />

                  {!loadedImages.has(project.id) && (
                    <div className="absolute inset-0 z-[5] bg-card animate-pulse" />
                  )}

                  <img
                    src={project.image}
                    alt={`${project.title}: ${project.description}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoad(project.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent z-20" />

                  {project.highlight && (
                    <div className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full bg-primary/90 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
                      Destaque
                    </div>
                  )}
                </div>

                <div className="relative z-30 p-5 -mt-8">
                  <span className="inline-block px-2.5 py-1 text-[11px] tracking-wider uppercase font-medium bg-primary/15 text-primary rounded-full mb-3">
                    {project.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
