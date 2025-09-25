import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

// Import generated images
import livingRoomImg from "@assets/generated_images/Modern_luxury_living_room_4d7bc6f4.png";
import diningRoomImg from "@assets/generated_images/Contemporary_dining_room_design_d820da78.png";
import bedroomImg from "@assets/generated_images/Luxury_master_bedroom_interior_8426d8ad.png";
import kitchenImg from "@assets/generated_images/Modern_kitchen_design_35e3e730.png";
import officeImg from "@assets/generated_images/Elegant_home_office_design_97146369.png";
import bathroomImg from "@assets/generated_images/Luxury_bathroom_interior_design_1cf1da93.png";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: "Living" | "Dining" | "Bedroom" | "Kitchen" | "Office" | "Bathroom";
};

const galleryImages: GalleryItem[] = [
  { src: livingRoomImg, alt: "Modern luxury living room with elegant furniture", title: "Luxe Living Room", category: "Living" },
  { src: diningRoomImg, alt: "Contemporary dining room design", title: "Contemporary Dining", category: "Dining" },
  { src: bedroomImg, alt: "Luxury master bedroom interior", title: "Master Bedroom", category: "Bedroom" },
  { src: kitchenImg, alt: "Modern kitchen with marble countertops", title: "Modern Kitchen", category: "Kitchen" },
  { src: officeImg, alt: "Elegant home office design", title: "Home Office", category: "Office" },
  { src: bathroomImg, alt: "Luxury bathroom with marble finishes", title: "Luxury Bathroom", category: "Bathroom" },
];

interface GalleryProps {
  showTitle?: boolean;
}

export default function Gallery({ showTitle = true }: GalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Depth scroll transforms
  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yWrap = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateWrap = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);
  const scaleWrap = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  // Card image animation
  const imageVariants = prefersReducedMotion
    ? undefined
    : {
        rest: { scale: 1, rotateX: 0, rotateY: 0 },
        hover: {
          scale: 1.08,
          rotateX: -3,
          rotateY: 3,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)",
          transition: { type: "spring", stiffness: 200, damping: 18 },
        },
      } as const;

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Category filtering
  const [activeCategory, setActiveCategory] = useState<"All" | GalleryItem["category"]>("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(galleryImages.map(g => g.category)))] as const, []);
  const filtered = useMemo(() => activeCategory === "All" ? galleryImages : galleryImages.filter(g => g.category === activeCategory), [activeCategory]);

  // Visual rhythm: vary aspect ratios in a repeating pattern
  const aspectClasses = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[16/10]", "aspect-[1/1]"];

  return (
    <motion.section
      className="relative py-24 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
      id="gallery"
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Aurora Background Glow */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,255,0.12),transparent_60%)] blur-3xl"
          style={{ y: yBg }}
        />
      )}

      {/* Floating Sparkles */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/40 blur-sm"
              initial={{ x: Math.random() * 1000, y: Math.random() * 700, opacity: 0 }}
              animate={{ y: "-=250", opacity: [0, 1, 0] }}
              transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="container mx-auto px-4 relative will-change-transform"
        style={prefersReducedMotion ? undefined : { y: yWrap, rotate: rotateWrap, scale: scaleWrap }}
      >
        {showTitle && (
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[2.5rem] font-serif font-bold text-foreground mb-6 tracking-tight drop-shadow-lg">
              Our Premium Portfolio
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience interiors brought to life with depth, elegance, and timeless craft.
            </p>

            {/* Category Filters */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat as string}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    activeCategory === cat
                      ? "bg-primary/10 border-primary/40 text-foreground"
                      : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery Masonry */}
        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-x-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {filtered.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid mb-6 group relative cursor-default focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background rounded-2xl"
              variants={tileVariants}
              whileHover="hover"
              layout
            >
              {/* Premium Glow Frame */}
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-tr from-primary/50 via-secondary/40 to-accent/30 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.45)]">
                <div className="relative rounded-2xl overflow-hidden bg-card/70 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-[4px]">
                  
                  {/* Prism Light Sweep */}
                  <motion.div
                    className="absolute -inset-y-16 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-30"
                    initial={{ x: "-50%" }}
                    animate={{ x: "150%" }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Image with cinematic motion */}
                  <div className={`${aspectClasses[index % aspectClasses.length]} overflow-hidden`}>
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover will-change-transform"
                      variants={imageVariants}
                      initial="rest"
                      animate={{ scale: [1, 1.05, 1], y: [0, -8, 0], rotate: [0, 0.3, -0.3, 0] }}
                      transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Caption Overlay with title and category */}
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      <p className="text-white text-base md:text-lg font-semibold drop-shadow-xl">{image.title}</p>
                      <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">
                        {image.category}
                      </span>
                    </div>
                    <span className="hidden md:inline-block text-white/90 text-sm">View</span>
                  </motion.div>

                  {/* Subtle Noise Overlay for richness */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-muted/40 hover:bg-muted transition-colors">
            <span className="text-sm font-medium">View More Projects</span>
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
