import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { ...pos };
    let rafId = 0;
    let isVisible = true;

    const move = () => {
      if (!isVisible) return;

      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        pos.x += dx * 0.12;
        pos.y += dy * 0.12;
        cursor.style.transform = `translate3d(${pos.x - 110}px, ${pos.y - 110}px, 0)`;
      }

      rafId = requestAnimationFrame(move);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onVisChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        rafId = requestAnimationFrame(move);
      }
    };

    rafId = requestAnimationFrame(move);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} id="cursor-glow" />;
};

export default CursorGlow;
