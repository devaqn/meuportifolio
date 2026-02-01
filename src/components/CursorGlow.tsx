import { useEffect } from "react";
import gsap from "gsap";

const CursorGlow = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor-glow");
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const mouse = { ...pos };

    let rafId: number;

    const move = () => {
      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
      });

      rafId = requestAnimationFrame(move);
    };

    move();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div id="cursor-glow" />;
};

export default CursorGlow;
