"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Handle magnetic pull
      const target = e.target as HTMLElement;
      const isMagnetic = target.closest("a, button, .magnetic");
      
      if (isMagnetic) {
        setIsHovering(true);
        const rect = isMagnetic.getBoundingClientRect();
        // Magnet center
        mouseX = rect.left + rect.width / 2;
        mouseY = rect.top + rect.height / 2;
      } else {
        setIsHovering(false);
      }
    };

    const render = () => {
      // Lerp cursor (instant)
      cursorX = mouseX;
      cursorY = mouseY;
      
      // Lerp follower (snappier)
      followerX += (mouseX - followerX) * 0.25;
      followerY += (mouseY - followerY) * 0.25;

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300 ${
          isHovering ? "scale-[0]" : "scale-100"
        }`}
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${
          isHovering 
            ? "w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20" 
            : "w-8 h-8 border border-white/40"
        }`}
      >
        {isHovering && (
          <span className="text-[8px] uppercase tracking-widest text-white font-mono opacity-80">
            Click
          </span>
        )}
      </div>
    </>
  );
}
