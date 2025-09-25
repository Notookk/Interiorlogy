import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useMemo, useRef } from "react";

type ElementTag = "section" | "div" | "footer";

interface ParallaxSectionProps {
  as?: ElementTag;
  id?: string;
  className?: string;
  innerClassName?: string;
  y?: [number, number];
  rotate?: [number, number];
  scale?: [number, number];
}

export default function ParallaxSection({
  as = "section",
  id,
  className,
  innerClassName,
  y = [16, -16],
  rotate = [-0.3, 0.3],
  scale = [0.995, 1.005],
  children,
}: PropsWithChildren<ParallaxSectionProps>) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yT = useTransform(scrollYProgress, [0, 1], y);
  const rT = useTransform(scrollYProgress, [0, 1], rotate);
  const sT = useTransform(scrollYProgress, [0, 1], scale);

  const MotionTag = useMemo(() => {
    switch (as) {
      case "footer":
        return motion.footer;
      case "div":
        return motion.div;
      case "section":
      default:
        return motion.section;
    }
  }, [as]);

  return (
    <MotionTag id={id} ref={ref as any} className={className}>
      <motion.div
        className={innerClassName ? innerClassName : undefined}
        style={prefersReducedMotion ? undefined : { y: yT, rotate: rT, scale: sT }}
        transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 40, damping: 20 }}
      >
        {children}
      </motion.div>
    </MotionTag>
  );
}
