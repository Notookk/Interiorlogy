import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Testimonial = {
  name: string;
  location?: string;
  rating: number; // 1-5
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Priyanka D",
    location: "Salt Lake, Kolkata",
    rating: 5,
    text:
      "After shifting to our new flat in Salt Lake, I wanted a modern yet cozy vibe, and Interiorlogy just nailed it! From color schemes to lighting, they paid attention to every detail. I still get compliments from guests every time they visit!",
  },
  {
    name: "Arjun Mehta",
    location: "Park Street, Kolkata",
    rating: 5,
    text:
      "I hired Interiorlogy to redesign my restaurant’s interiors and they exceeded expectations. Their team brought in some stunning contemporary ideas while keeping the vintage charm of Park Street alive. Business has seen a boost since the makeover!",
  },
  {
    name: "Shalini Bose",
    location: "Behala, Kolkata",
    rating: 5,
    text:
      "Being a working mom, I didn’t have much time to micromanage things. Interiorlogy handled everything so professionally. They transformed our 3BHK into a beautiful, functional space without blowing the budget. Highly recommend them for busy professionals!",
  },
  {
    name: "Debasis Roy",
    location: "New Town, Kolkata",
    rating: 5,
    text:
      "Interiorlogy designed my home office during the pandemic, and I couldn’t be happier. It’s aesthetic, functional, and super motivating to work in. Loved their creative approach and punctuality!",
  },
  {
    name: "Mrs. Seema Agarwal",
    location: "Ballygunge, Kolkata",
    rating: 5,
    text:
      "We wanted a luxurious yet traditional makeover for our duplex, and Interiorlogy blended both perfectly. Their choice of materials and decor accessories was absolutely top-notch. They treat your home like their own.",
  },
  {
    name: "Tapan Ghosh",
    location: "Dum Dum, Kolkata",
    rating: 5,
    text:
      "As a retired school teacher, I didn’t want anything fancy—just a warm, comfortable living space. Interiorlogy’s team listened patiently and delivered exactly what I envisioned, with thoughtful little touches. Grateful for their kindness and professionalism.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 drop-shadow-[0_0_6px_rgba(253,230,62,0.35)]" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/40"}`} />
      ))}
    </div>
  );
}

export default function HappyClients() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const autoplayMs = 4000; // slightly faster autoplay for a premium feel
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const yWrap = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rotateWrap = useTransform(scrollYProgress, [0, 1], [-0.3, 0.3]);
  const scaleWrap = useTransform(scrollYProgress, [0, 1], [0.995, 1.005]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const xOrb1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const xOrb2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  // Track which slides have just entered view on each snap to retrigger animations
  const prevVisibleRef = useRef<Set<number>>(new Set());
  const [enterCounts, setEnterCounts] = useState<number[]>(() => testimonials.map(() => 0));

  // Pause/resume helpers
  const pause = () => {
    isPausedRef.current = true;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  const resume = () => {
    isPausedRef.current = false;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!isPausedRef.current) api?.scrollNext();
    }, autoplayMs);
  };

  useEffect(() => {
    if (!api) return;
    // Sync pagination dots and visible slide animations
    const sync = () => {
      setActiveIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);

      // Determine currently visible slide indices
      let visible: number[] = [];
      try {
        // Embla API: slidesInView may exist; pass true to get target snaps during animation
        // @ts-expect-error - slidesInView might not be typed on our wrapper but exists in Embla runtime
        visible = api.slidesInView ? api.slidesInView(true) : [];
      } catch {
        visible = [];
      }

      // Fallback if slidesInView is not available: at least animate the selected index
      if (!visible || visible.length === 0) {
        visible = [api.selectedScrollSnap()];
      }

      const prevSet = prevVisibleRef.current;
      const currSet = new Set<number>(visible);
      // Newly entered are those in curr but not in prev
      const newlyEntered: number[] = visible.filter((i) => !prevSet.has(i));
      if (newlyEntered.length) {
        setEnterCounts((counts) => {
          const next = counts.slice();
          newlyEntered.forEach((i) => {
            if (i >= 0 && i < next.length) next[i] = (next[i] ?? 0) + 1;
          });
          return next;
        });
      }
      prevVisibleRef.current = currSet;
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    // Start autoplay
    resume();
    // Pause on pointer interaction
    const onPointerDown = () => pause();
    const onPointerUp = () => {
      // Give a small delay before resuming after interaction
      window.setTimeout(() => resume(), 1200);
    };
    api.on("pointerDown", onPointerDown);
    api.on("pointerUp", onPointerUp);
    // Pause on document visibility change
    const onVisibility = () => {
      if (document.hidden) pause();
      else resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
      api.off("pointerDown", onPointerDown);
      api.off("pointerUp", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [api]);

  useEffect(() => () => { if (intervalRef.current) window.clearInterval(intervalRef.current); }, []);

  const initials = useMemo(() => (name: string) => {
    const parts = name.trim().split(" ");
    const [a, b] = [parts[0]?.[0] ?? "?", parts[1]?.[0] ?? ""];
    return (a + b).toUpperCase();
  }, []);

  return (
    <motion.section ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle moving background gradient for premium feel */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"
          style={{ y: yBg }}
        />
      )}
      {/* Ambient bokeh orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl bg-[#fde63e]/10 mix-blend-screen"
            style={{ x: xOrb1, y: yOrb1 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full blur-3xl bg-primary/15 mix-blend-screen"
            style={{ x: xOrb2, y: yOrb2 }}
          />
        </>
      )}
      <motion.div className="container mx-auto px-4 relative will-change-transform" style={prefersReducedMotion ? undefined : { y: yWrap, rotate: rotateWrap, scale: scaleWrap }}>
        <motion.div className="text-center max-w-2xl mx-auto will-change-transform" style={prefersReducedMotion ? undefined : { y: yHeader }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-background/60 px-3 py-1 text-xs uppercase tracking-wider text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-[#fde63e]/90 shadow-[0_0_10px_#fde63e]" />
            Clients Love Us
          </div>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#fde63e]">Happy Clients</span> <span role="img" aria-label="smile and house"></span>
          </motion.h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#fde63e] to-transparent opacity-70" />
          <motion.p
            className="mt-3 text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            Witness the joy of our happy and satisfied customers as they discuss their journeys of working with us. Explore their stories today!
          </motion.p>
  </motion.div>

        <div
          className="mt-10"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true, duration: 25 }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="basis-full sm:basis-1/2">
                  {/* Remount this motion wrapper when the slide newly appears to replay entrance animation */}
                  <motion.div
                    key={`${idx}-${enterCounts[idx] ?? 0}`}
                    initial={{ opacity: 0, x: 24, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group h-full"
                  >
                    <div className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-[#fde63e]/30 via-primary/10 to-transparent shadow-[0_0_24px_rgba(0,0,0,0.08)]">
                      {/* Shimmer sweep (continuous, subtle; intensifies on hover) */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
                        {!prefersReducedMotion && (
                          <motion.div
                            className="absolute -inset-y-8 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-10 group-hover:opacity-30"
                            initial={{ x: "-30%" }}
                            animate={{ x: "130%" }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </div>
                      <Card className="relative h-full bg-background/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-border/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl cursor-pointer select-none" onCopy={(e) => e.preventDefault()}>
                        <CardHeader className="flex-row items-center gap-4 p-5">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {initials(t.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-base md:text-lg">
                              {t.name}{t.location ? <span className="text-muted-foreground"> — {t.location}</span> : null}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              <Stars count={t.rating} />
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                          {/* decorative quote icon */}
                          <svg aria-hidden className="mb-2 h-5 w-5 text-[#fde63e]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.17 6C5.42 6 4 7.43 4 9.2c0 1.77 1.42 3.2 3.17 3.2.45 0 .88-.09 1.27-.25-.28 1.72-1.7 3.05-3.44 3.05v2.4c3.31 0 6-2.69 6-6V6H7.17zm9.66 0C15.08 6 13.66 7.43 13.66 9.2c0 1.77 1.42 3.2 3.17 3.2.45 0 .88-.09 1.27-.25-.28 1.72-1.7 3.05-3.44 3.05v2.4c3.31 0 6-2.69 6-6V6h-3.83z" />
                          </svg>
                          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                            {t.text}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex" aria-label="Previous testimonials" />
            <CarouselNext className="hidden md:flex" aria-label="Next testimonials" />
          </Carousel>
        </div>
        {snapCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  pause();
                  api?.scrollTo(i);
                  window.setTimeout(() => resume(), 1200);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "w-6 bg-[#fde63e] shadow-[0_0_12px_rgba(253,230,62,0.55)]"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
