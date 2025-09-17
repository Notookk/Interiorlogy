import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

// Import generated images
import workspaceImg from "@assets/generated_images/Interior_design_workspace_aesthetic_9a5c9985.png";
import transformationImg from "@assets/generated_images/Home_transformation_showcase_454d3b13.png";

export default function CompanyStory() {
  return (
    <section className="py-12 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            How We Became The Leading Interior Design Firm
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-base text-muted-foreground leading-relaxed">
              A wise man has said – "Your home should reflect your soul". Truly said. Isn't it? A beautiful home 
              doesn't only imply costly furniture and a creative interior. It must reflect a style that resonates 
              with your personality. That's what we are known for – making your house a pure reflection of yourself.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Back in 2012, a small team of interior designers came together with a dream – to turn homes into a 
              perfect example of beauty and comfort. As the years passed, our reputation grew, and soon people 
              started noticing our work. In 2025, we proudly hold the title of the best interior designing company.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {/* Content Section */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Qualified Planning
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We have a team of skilled interior designers who know how to create beautiful and 
                    functional spaces that perfectly match your lifestyle and preferences.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={workspaceImg}
                alt="Aesthetic interior design workspace with fabric samples and design tools"
                className="w-full h-32 object-cover"
                data-testid="workspace-aesthetic-image"
              />
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={transformationImg}
                alt="Beautiful home transformation showcase"
                className="w-full h-32 object-cover"
                data-testid="transformation-showcase-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}