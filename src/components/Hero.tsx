import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<SVGSVGElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (
      !heroSectionRef.current ||
      !heroContainerRef.current ||
      !heroContentRef.current ||
      !heroBgRef.current ||
      !logoPathRef.current
    )
      return;

    let heightRatio = window.innerWidth / window.innerHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      logoPathRef.current,
      {
        scaleX: 0.15,
        scaleY: () => 0.15 * heightRatio,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
      },
      {
        scaleX: 60,
        scaleY: () => 60 * heightRatio,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
        duration: 1,
        ease: "power2.in",
      },
    )

      // pequena pausa visual
      .to({}, { duration: 0.2 })

      // Conteúdo entra DEPOIS
      .fromTo(
        heroContentRef.current,
        { autoAlpha: 0, y: 60, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        },
      )
      .to({}, { duration: 0.25 });

    const handleResize = () => {
      heightRatio = window.innerWidth / window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "bottom bottom",
          end: "+=40%",
          scrub: true,
        },
      });

      tl.to(heroContainerRef.current, {
        scale: 0.96,
        opacity: 0.85,
        ease: "none",
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Hidden SVG for clip path - LETRA P ROXA E CENTRALIZADA */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute top-0 left-0 pointer-events-none z-0"
      >
        <defs>
          {/* Gradiente Roxo */}
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
        </defs>
        
        <clipPath id="clip-path1" clipPathUnits="objectBoundingBox">
          {/* Letra P GROSSA e PERFEITAMENTE CENTRALIZADA */}
          <path
            ref={logoPathRef}
            d="M 0.41,0.12 L 0.41,0.88 L 0.59,0.88 L 0.59,0.58 L 0.73,0.58 Q 0.85,0.58 0.91,0.52 Q 0.97,0.46 0.97,0.35 Q 0.97,0.24 0.91,0.18 Q 0.85,0.12 0.73,0.12 Z M 0.59,0.26 L 0.73,0.26 Q 0.79,0.26 0.82,0.29 Q 0.85,0.32 0.85,0.35 Q 0.85,0.38 0.82,0.41 Q 0.79,0.44 0.73,0.44 L 0.59,0.44 Z"
          />
        </clipPath>
      </svg>

      <section
        ref={heroSectionRef}
        className="hero-section relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden z-[1]"
      >
        <div
          ref={heroContainerRef}
          className="hero-container w-full h-screen relative flex justify-center items-center overflow-hidden"
          style={{ 
            clipPath: "url(#clip-path1)",
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #7c3aed 100%)"
          }}
        >
          {/* Swirl Background SVG */}
          <svg
            ref={heroBgRef}
            className="absolute inset-0 w-full h-full z-0 rounded-bl-3xl rounded-br-3xl shadow-glow"
            viewBox="0 0 1200 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              href="/hero/backgroundHeroContent.jpg"
              x="0"
              y="0"
              width="1200"
              height="900"
              preserveAspectRatio="xMidYMid slice"
            />

            {/* Overlay escuro */}
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.35)" />
          </svg>

          {/* Hero Content */}
          <div
            ref={heroContentRef}
            className="relative z-10 text-center px-4 opacity-0"
          >
           <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-none text-[hsl(215_90%_60%)]">
              Pedro Miguel  
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white font-light tracking-wide">
              Desenvolvedor Full-Stack & Criador de Experiências Digitais
            </p>
            <a href="https://wa.me/5581998191625?text=Ol%C3%A1!%20Conheci%20seu%20trabalho%20atrav%C3%A9s%20do%20portf%C3%B3lio%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os.%20Fico%20no%20aguardo,%20obrigado(a)" target="_blank" rel="noopener noreferrer">
             <button
            aria-label="Start Game"
            className="px-8 py-2 mt-10 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-[rgba(124,58,237,0.7)] hover:scale-105 hover:border-[rgba(124,58,237,1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] focus:outline-none"
            id="startButton"
          >
            Entre Em Contato
          </button>

            </a>
          </div>
        </div>
      </section>

      <div className="hero-transition-overlay absolute bottom-0 left-0 w-full h-64 pointer-events-none z-20" />
    </>
  );
};

export default Hero;
