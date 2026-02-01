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
        scaleX: 0.21,
        scaleY: () => 0.21 * heightRatio,
        x: 0,
        transformOrigin: "center center",
      },
      {
        scaleX: 45,
        scaleY: () => 45 * heightRatio,
        x: -1.45,
        transformOrigin: "center center",
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
      {/* Hidden SVG for clip path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute top-0 left-0 pointer-events-none z-0"
      >
        <clipPath id="clip-path1" clipPathUnits="objectBoundingBox">
          <path
            ref={logoPathRef}
            d="M0.984,0.475 C0.995,0.475,1,0.48,1,0.491 V0.781 C1,0.851,0.981,0.905,0.942,0.943 C0.903,0.981,0.846,1,0.773,1 H0.227 C0.155,1,0.099,0.981,0.059,0.943 C0.02,0.905,0,0.851,0,0.781 V0.219 C0,0.148,0.02,0.094,0.059,0.056 C0.099,0.019,0.155,0,0.227,0 H0.773 C0.846,0,0.903,0.019,0.942,0.056 C0.981,0.094,1,0.148,1,0.219 V0.438 C1,0.448,0.995,0.453,0.984,0.453 H0.528 C0.517,0.453,0.511,0.448,0.511,0.438 V0.275 H0.489 V0.725 H0.605 V0.703 H0.526 C0.516,0.703,0.511,0.698,0.511,0.687 V0.491 C0.511,0.48,0.517,0.475,0.528,0.475 H0.984"
          />
        </clipPath>
      </svg>

      <section
        ref={heroSectionRef}
        className="hero-section relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden z-[1]"
      >
        <div
          ref={heroContainerRef}
          className="hero-container w-full h-screen relative flex justify-center items-center overflow-hidden bg-background"
          style={{ clipPath: "url(#clip-path1)" }}
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

            {/* se quiser overlay */}
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.35)" />
          </svg>

          {/* Hero Content */}
          <div
            ref={heroContentRef}
            className="relative z-10 text-center px-4 opacity-0"
          >
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter text-white leading-none">
              Gabriel Motta
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white font-light tracking-wide">
              Desenvolvedor Full-Stack & Criador de Experiências Digitais
            </p>
            <a href="https://wa.me/5581995250365" target="_blank" rel="noopener noreferrer">
              <button
                aria-label="Start Game"
                className="px-8 py-2 mt-10 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
                id="startButton"
              >
                Contate-me
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
