import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#footer" },
];

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" },
      );
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        ref={navRef}
        className={`
          pointer-events-auto
          w-[calc(100%-2rem)]
          max-w-5xl
          px-6 py-4
          rounded-2xl
          border
          transition-all duration-300
          ${
            isScrolled
              ? "bg-background/70 backdrop-blur-xl border-border shadow-lg"
              : "bg-background/40 backdrop-blur-md border-border/40"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold text-gradient">
            DEV MOTTA
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}

            <a href="https://wa.me/5581995250365" target="_blank">
              <button
                aria-label="Start Game"
                className="px-4 py-2 text-white font-bold text-sm rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
                id="startButton"
              >
                Contate-me
              </button>
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-lg border border-border bg-background/60 backdrop-blur flex items-center justify-center"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a href="https://wa.me/5581995250365" target="_blank">
              <button
                aria-label="Start Game"
                className="px-2 py-2 w-full mt-2 text-white font-bold text-sm rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
                id="startButton"
              >
                Contate-me
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
