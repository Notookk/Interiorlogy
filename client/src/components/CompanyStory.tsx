import { CheckCircle, Palette, Clock } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Import generated images
import workspaceImg from "@assets/generated_images/Interior_design_workspace_aesthetic_9a5c9985.png";

export default function CompanyStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-16">
          <AspectRatio ratio={4/3} className="rounded-xl overflow-hidden">
            <img
              src={workspaceImg}
              alt="Interior design workspace"
              className="w-full h-full object-cover"
              data-testid="workspace-aesthetic-image"
            />
          </AspectRatio>
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Spaces that feel like you
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto">
              Timeless interiors crafted with care, comfort, and character since 2012.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Qualified Planning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Thoughtful Materials</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">On-Time Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}