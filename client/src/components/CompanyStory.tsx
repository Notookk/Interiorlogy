import { CheckCircle, Palette } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import ParallaxSection from "./ParallaxSection";

// Import generated images
import workspaceImg from "@assets/generated_images/designframe.jpg";

export default function CompanyStory() {
  return (
    <ParallaxSection as="section" className="py-20 bg-background relative overflow-hidden">
      {/* Subtle background gradient using theme tokens */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(60%_50%_at_50%_10%,_black,_transparent)]">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[1200px] bg-gradient-to-b from-primary/5 via-primary/0 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Eyebrow */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground tracking-wide">
            OUR STORY
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-6 md:pl-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-5 w-1.5 rounded-full bg-primary/40" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-[#34D399] via-[#10B981] to-[#059669] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(16,185,129,0.25)] pb-1">
                How We Became The Leading Interior Design Firm
              </h2>
            </div>
            <div className="h-1 w-24 bg-primary/30 rounded-full ml-6" />
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                A wise man has said – “Your home should reflect your soul”. Truly said. Isn’t it?
                A beautiful home doesn’t only imply costly furniture and a creative interior. It must
                reflect a style that resonates with your personality. That’s what we are known for – making
                your house a pure reflection of yourself.
              </p>
              <blockquote className="border-l-2 border-primary/30 pl-4 italic text-foreground/90">
                Spaces should whisper your story — not shout someone else’s.
              </blockquote>
              <p>
                Back in 2012, a small team of interior designers came together with a dream – to turn homes into
                a perfect example of beauty and comfort. As the years passed, our reputation grew, and soon people
                started noticing our work. In 2025, we proudly hold the title of the best interior designing company.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="rounded-xl p-[1px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                <Card className="shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 border-transparent">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full ring-1 ring-border">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground">Qualified Planning</h3>
                        <p className="text-sm text-muted-foreground">
                          We have a team of skilled interior designers who know how to create beautiful and
                          functional spaces.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-xl p-[1px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                <Card className="shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 border-transparent">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full ring-1 ring-border">
                        <Palette className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-foreground">Professional Design</h3>
                        <p className="text-sm text-muted-foreground">
                          From design to execution, we take pride in our capacity to turn any area into a work of art.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="md:order-none order-first"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="max-w-xl md:ml-auto">
              {/* Gradient border wrapper */}
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-primary/10 to-transparent">
                <div className="relative rounded-2xl overflow-hidden">
                  <AspectRatio ratio={4/3} className="rounded-2xl overflow-hidden border border-border/60 shadow-sm">
                    <img
                      src={workspaceImg}
                      alt="Interior design workspace"
                      className="w-full h-full object-cover md:object-contain bg-muted/30"
                      data-testid="workspace-aesthetic-image"
                    />
                  </AspectRatio>
                  {/* Soft vignette overlay */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/0 via-background/0 to-background/10" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center md:text-right text-xs text-muted-foreground">
              Crafting character-rich spaces since 2012.
            </div>
          </motion.div>
        </div>

        {/* Subtle divider to end section gracefully */}
        <div className="mt-16">
          <Separator className="opacity-60" />
        </div>
      </div>
    </ParallaxSection>
  );
}