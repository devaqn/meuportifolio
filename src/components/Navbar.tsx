import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#footer" },
];

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    },
    [],
  );

  return (
    <nav
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      role="navigation"
      aria-label="Navegação principal"
    >
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
            DEVAQN
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button
                aria-label="Entre em contato via WhatsApp"
                className="px-5 py-2 text-white font-semibold text-sm rounded-full transition-all duration-300 bg-transparent border-2 border-violet-600 hover:scale-105 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Entre Em Contato
              </button>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="md:hidden w-10 h-10 rounded-lg border border-border bg-background/60 backdrop-blur flex items-center justify-center transition-colors hover:bg-background/80"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pt-4 mt-4 border-t border-border/50">
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <button
                aria-label="Entre em contato via WhatsApp"
                className="px-5 py-2 text-white font-semibold text-sm rounded-full transition-all duration-300 bg-transparent border-2 border-violet-600 hover:scale-105 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Entre Em Contato
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
