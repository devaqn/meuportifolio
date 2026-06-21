import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<SVGSVGElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroSectionRef.current ||
      !heroContainerRef.current ||
      !heroContentRef.current ||
      !heroBgRef.current ||
      !logoPathRef.current
    )
      return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
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
          transformOrigin: "50% 50%",
        },
        {
          scaleX: 60,
          scaleY: () => 60 * heightRatio,
          transformOrigin: "50% 50%",
          duration: 1,
          ease: "power2.inOut",
        },
      )
        .to({}, { duration: 0.2 })
        .fromTo(
          heroContentRef.current,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
        )
        .to({}, { duration: 0.05 });

      const handleResize = () => {
        heightRatio = window.innerWidth / window.innerHeight;
      };

      window.addEventListener("resize", handleResize, { passive: true });

      const ctx2 = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "bottom bottom",
            end: "+=40%",
            scrub: true,
          },
        }).to(heroContainerRef.current, {
          scale: 0.96,
          opacity: 0.85,
          ease: "none",
        });
      });

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        });
      }

      return () => {
        tl.kill();
        ctx2.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        window.removeEventListener("resize", handleResize);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(heroContentRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(logoPathRef.current, {
        scaleX: 60,
        scaleY: 60,
        transformOrigin: "50% 50%",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute top-0 left-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        <clipPath id="clip-path1" clipPathUnits="objectBoundingBox">
          <path
            ref={logoPathRef}
            d="M 0.23,0.10 L 0.23,0.90 L 0.43,0.90 L 0.43,0.58 L 0.59,0.58 Q 0.72,0.58 0.79,0.51 Q 0.86,0.44 0.86,0.34 Q 0.86,0.24 0.79,0.17 Q 0.72,0.10 0.59,0.10 Z M 0.43,0.25 L 0.59,0.25 Q 0.66,0.25 0.69,0.28 Q 0.72,0.31 0.72,0.34 Q 0.72,0.37 0.69,0.40 Q 0.66,0.43 0.59,0.43 L 0.43,0.43 Z"
          />
        </clipPath>
      </svg>

      <section
        ref={heroSectionRef}
        className="hero-section relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden z-[1]"
      >
        <div
          ref={heroContainerRef}
          className="hero-container w-full h-screen relative flex justify-center items-center overflow-hidden will-change-transform"
          style={{
            clipPath: "url(#clip-path1)",
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #7c3aed 100%)",
          }}
        >
          <svg
            ref={heroBgRef}
            className="absolute inset-0 w-full h-full z-0"
            viewBox="0 0 1200 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <image
              href="/hero/backgroundHeroContent.jpg"
              x="0"
              y="0"
              width="1200"
              height="900"
              preserveAspectRatio="xMidYMid slice"
            />
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.4)" />
          </svg>

          <div
            ref={heroContentRef}
            className="relative z-10 text-center px-6 opacity-0 max-w-5xl"
          >
            <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-white/60 mb-4 font-medium">
              Back-End Developer
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tighter leading-[0.85] text-[hsl(215_90%_60%)]">
              Pedro
              <br />
              Miguel
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 font-light tracking-wide max-w-xl mx-auto text-balance">
              APIs, Automação e Sistemas com Inteligência Artificial
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button
                aria-label="Entre em contato via WhatsApp"
                className="px-8 py-3 mt-10 text-white font-semibold text-base rounded-full transition-all duration-300 bg-transparent border-2 border-white/20 hover:border-violet-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background backdrop-blur-sm"
              >
                Entre Em Contato
              </button>
            </a>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      <div className="hero-transition-overlay absolute bottom-0 left-0 w-full h-64 pointer-events-none z-20" />
    </>
  );
};

export default Hero;
