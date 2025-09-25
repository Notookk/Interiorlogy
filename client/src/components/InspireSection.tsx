import { CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import inspireImg from "@assets/generated_images/interiorimage1.jpg";

const features = [
  "Latest technologies",
  "5 Years Warranty",
  "High-Quality Designs",
  "Residential Design",
];

export default function InspireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  // Enhanced parallax and scale/rotation for background image
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 0.97]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 1]);
  // Layered overlays move at different speeds for depth
  const yOverlay = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yOverlay2 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.65]);
  const overlay2Opacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.2]);
  // Slight opposite parallax + micro tilt for the content card
  const yCard = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rotateCard = useTransform(scrollYProgress, [0, 1], [0.4, -0.4]);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
        <motion.img
          src={inspireImg}
          alt="Inspiring interior background"
          className="w-full h-full object-cover will-change-transform"
          style={prefersReducedMotion ? undefined : { y, scale, rotate }}
        />
        {/* Layered gradient overlays for a premium, airy look (each moving at different speeds) */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent will-change-transform"
          style={prefersReducedMotion ? { opacity: 0.75 } : { y: yOverlay, opacity: overlayOpacity }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent will-change-transform"
          style={prefersReducedMotion ? { opacity: 0.25 } : { y: yOverlay2, opacity: overlay2Opacity }}
        />
        {/* Soft vignette for focus */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 min-h-[50vh] md:min-h-[60vh] flex items-center justify-center">
          <div className="max-w-3xl md:max-w-2xl mx-auto">
            {/* Outer wrapper provides gentle parallax & micro tilt; inner handles reveal */}
            <motion.div
              className="will-change-transform"
              style={prefersReducedMotion ? undefined : { y: yCard, rotate: rotateCard }}
            >
              {/* Gradient border container with subtle animated light sweep */}
              <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-primary/25 via-primary/10 to-transparent shadow-[0_0_40px_rgba(0,0,0,0.12)]">
                <motion.div
                  className="relative z-10 rounded-2xl border border-border/40 bg-background/40 backdrop-blur-md shadow-xl"
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
              <div className="p-5 md:p-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  Where Spaces Inspire, and Design Comes Alive
                </h2>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {features.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground p-1.5 shadow-sm ring-2 ring-primary/40">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                  Whether it’s your home, office, or a commercial project, we are always dedicated to bringing your vision to life.
                  Our numbers speak better than words:
                </p>

                <div className="mt-6">
                  <Button size="lg">Consult with your Interior Designer!</Button>
                </div>
              </div>
                </motion.div>
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 rounded-2xl"
                    initial={{ x: "-30%" }}
                    animate={{ x: "130%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
