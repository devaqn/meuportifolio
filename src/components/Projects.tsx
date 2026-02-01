import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, Flip);

type CategoryFilter = 'all' | 'web' | 'design' | 'mobile' | 'branding';

const categories: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'design', label: 'Design' },
  { id: 'branding', label: 'Branding' },
];

const projects = [
  {
    id: 1,
    title: 'VOID E-commerce',
    category: 'web' as CategoryFilter,
    categoryLabel: 'Web Development',
    description: 'Loja online moderna para produtos de tecnologia e acessórios.',
    image: 'https://i.pinimg.com/736x/69/c3/06/69c306f82a99b0ca27dc10ffe03fdd6a.jpg',
    gradient: 'from-violet-500 to-blue-600',
    link: 'https://elevate-studio-ten.vercel.app/',
  },
  {
    id: 2,
    title: 'Creative Minds Portfolio',
    category: 'design' as CategoryFilter,
    categoryLabel: 'UI/UX Design',
    description: 'Portfólio digital para designer gráfico e ilustrador.',
    image: 'https://i.pinimg.com/736x/cb/b6/a6/cbb6a65bfc57081219ee692466dc0a79.jpg',
    gradient: 'from-blue-500 to-cyan-500',
    link: '#',
  },
  {
    id: 3,
    title: 'Landing Page',
    category: 'web' as CategoryFilter,
    categoryLabel: 'web Development',
    description: 'Landing page criada para filmaker profissional',
    image: 'https://i.pinimg.com/736x/56/57/10/565710943784f5c3b373f65f71dfd7e1.jpg',
    gradient: 'from-pink-500 to-rose-500',
    link: 'https://cinematic-canvas-sigma.vercel.app/',
  },
  {
    id: 4,
    title: 'Pawsitive Care',
    category: 'web' as CategoryFilter,
    categoryLabel: 'web Development',
    description: 'Identidade visual para clínica veterinária.',
    image: 'https://i.pinimg.com/736x/d7/f2/1f/d7f21f6b860d8dd78154fe91e4cadc12.jpg',
    gradient: 'from-green-500 to-green-500',
    link: 'https://pawsitive-care-two.vercel.app/',
  },
  {
    id: 5,
    title: 'Elise Landing Page',
    category: 'web' as CategoryFilter,
    categoryLabel: 'Web Development',
    description: 'Landing page vibrante para loja online.',
    image: 'https://i.pinimg.com/736x/9a/5c/b4/9a5cb4b17eb49ed11ffc062659729ac6.jpg',
    gradient: 'from-pink-500 to-pink-500',
    link: 'https://radiant-bloom.vercel.app/',
  },
  {
    id: 6,
    title: 'Orçamento System',
    category: 'web' as CategoryFilter,
    categoryLabel: 'Web Development',
    description: 'Sistema de orçamento rapido e eficiente',
    image: 'https://i.pinimg.com/736x/c0/f4/ed/c0f4ed9d238df6682325c9cc153130ab.jpg',
    gradient: 'from-blue-500 to-purple-500',
    link: 'https://orcamento-rpido.vercel.app/',
  },
  {
    id: 7,
    title: 'Agenda Perfecta',
    category: 'web' as CategoryFilter,
    categoryLabel: 'Sistema Web',
    description: 'Plataforma completa para barbearias e nail designers. Seus clientes agendam online.',
    image: 'https://i.pinimg.com/736x/72/92/42/729242eb0b500263175398b5483e85cf.jpg',
    gradient: 'from-yellow-500 to-amber-500',
    link: 'https://agenda-perfecta-zeta.vercel.app/',
  },
  {
    id: 8,
    title: 'Restaurant Branding',
    category: 'branding' as CategoryFilter,
    categoryLabel: 'Branding',
    description: 'Identidade visual para restaurante gourmet.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    gradient: 'from-yellow-500 to-amber-500',
    link: '#',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeFilters, setActiveFilters] = useState<CategoryFilter[]>(['all']);

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

    // Determine which items should be visible
    const showAll = newFilters.includes('all');
    
    items.forEach((item, index) => {
      const project = projects[index];
      const shouldShow = showAll || newFilters.includes(project.category);
      item.style.display = shouldShow ? 'block' : 'none';
    });

    // Animate with Flip
    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: 'power1.inOut',
      stagger: 0.05,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 })
    });
  }, [activeFilters]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate filter buttons
      gsap.fromTo(
        '.filter-button',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.filters-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Initial animation for project items
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isFilterActive = (filter: CategoryFilter) => {
    if (filter === 'all') {
      return activeFilters.includes('all');
    }
    return activeFilters.includes(filter) && !activeFilters.includes('all');
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="projects-header mb-12 md:mb-16">
          <span className="text-blue-500 text-sm tracking-widest uppercase">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
            Projetos em Destaque
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="filters-container flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters(cat.id)}
              className={`filter-button relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border overflow-hidden
                ${isFilterActive(cat.id)
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25'
                  : 'bg-transparent text-gray-300 border-gray-700 hover:border-blue-500 hover:text-blue-400'
                }`}
            >
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (itemsRef.current[index] = el)}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10">
                {/* Image with Gradient Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 z-10 transition-opacity duration-500 group-hover:opacity-40`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-20" />
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-30 p-5 -mt-12">
                  <span className="inline-block px-3 py-1 text-xs tracking-wider uppercase font-medium bg-blue-500/20 text-blue-400 rounded-full mb-3">
                    {project.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;