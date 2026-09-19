"use client";
// Adapted from bundui / Magnetic Button: https://21st.dev/@bundui/components/magnetic-button
// Local pointer events replace global listeners; touch and reduced motion stay still.
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
export function MagneticButton({
  children,
  distance = 0.16,
}: {
  children: ReactNode;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 250 }),
    springY = useSpring(y, { damping: 25, stiffness: 250 });
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      className="inline-flex"
      style={{ x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * distance);
        y.set((event.clientY - rect.top - rect.height / 2) * distance);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}
