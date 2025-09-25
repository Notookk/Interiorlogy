import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/heroimage.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-top bg-cover bg-no-repeat flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/95 via-background/75 to-background/40" />
      {/* Spotlight vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-snug tracking-tight drop-shadow-lg">
            Transform Your Space with
            <span className="block pb-2 bg-gradient-to-r from-[#fde63e] via-[#f8d64e] to-[#fde63e] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(253,230,62,0.35)]">
              Exceptional Design
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            We craft timeless interiors that elevate your lifestyle and reflect your essence. 
            From concept to completion, your vision becomes a living masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden group text-base px-10 py-6 rounded-xl 
              bg-background/20 dark:bg-background/10 backdrop-blur-lg 
              border-[#e6d781]/30 shadow-[inset_0_0_0_1px_rgba(230,215,129,0.2)]
              hover:bg-background/30 hover:shadow-[0_0_32px_rgba(230,215,129,0.25)] 
              ring-1 ring-transparent hover:ring-[#e6d781]/40 
              transition-all duration-500 ease-out hover:-translate-y-1"
              onClick={() =>
                document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 font-medium tracking-wide">
                Explore Our Work
              </span>
              {/* Glass border effect */}
              <span aria-hidden className="absolute inset-0 rounded-xl border border-white/10 opacity-40" />
              {/* Sheen sweep */}
              <span aria-hidden className="absolute top-0 left-[-150%] h-full w-[50%] skew-x-12 
                bg-gradient-to-r from-transparent via-white/20 to-transparent 
                opacity-0 group-hover:opacity-100 transition-transform duration-700 ease-out 
                group-hover:translate-x-[260%]" />
            </Button>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden group text-base px-10 py-6 rounded-xl 
                bg-background/15 dark:bg-background/10 backdrop-blur-lg 
                border-[#e6d781]/30 shadow-[inset_0_0_0_1px_rgba(230,215,129,0.2)] 
                hover:bg-background/25 hover:shadow-[0_0_32px_rgba(230,215,129,0.25)] 
                ring-1 ring-transparent hover:ring-[#e6d781]/40 
                transition-all duration-500 ease-out hover:-translate-y-1"
              >
                <span className="relative z-10 font-medium tracking-wide">
                  Free Consultation
                </span>
                {/* Sheen effect */}
                <span aria-hidden className="absolute top-0 left-[-150%] h-full w-[50%] skew-x-12 
                  bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-transform duration-700 ease-out 
                  group-hover:translate-x-[260%]" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating subtle particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse absolute top-1/3 left-1/4 w-2 h-2 bg-[#fde63e] rounded-full opacity-60 blur-sm" />
        <div className="animate-ping absolute top-2/3 left-2/3 w-3 h-3 bg-[#fde63e] rounded-full opacity-40 blur-md" />
        <div className="animate-pulse absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#fde63e] rounded-full opacity-50 blur" />
      </div>
    </section>
  );
}
