import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

// Import generated images
import workspaceImg from "@assets/generated_images/Interior_design_workspace_aesthetic_9a5c9985.png";
import transformationImg from "@assets/generated_images/Home_transformation_showcase_454d3b13.png";

export default function CompanyStory() {
  return (
    <section className="py-14 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            How We Became The Leading Interior Design Firm
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A wise man has said – "Your home should reflect your soul". Truly said. Isn't it? A beautiful home 
              doesn't only imply costly furniture and a creative interior. It must reflect a style that resonates 
              with your personality. That's what we are known for – making your house a pure reflection of yourself.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Back in 2012, a small team of interior designers came together with a dream – to turn homes into a 
              perfect example of beauty and comfort. As the years passed, our reputation grew, and soon people 
              started noticing our work. In 2025, we proudly hold the title of the best interior designing company.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Qualified Planning Card */}
          <div className="mb-8">
            <Card className="p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Qualified Planning
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We have a team of skilled interior designers who know how to create beautiful and 
                    functional spaces that perfectly match your lifestyle and preferences.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Images Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg hover-elevate transition-all duration-300">
              <img
                src={workspaceImg}
                alt="Aesthetic interior design workspace with fabric samples and design tools"
                className="w-full h-64 object-cover"
                data-testid="workspace-aesthetic-image"
              />
              <div className="p-4 bg-card">
                <h4 className="font-semibold text-foreground mb-2">Design Process</h4>
                <p className="text-sm text-muted-foreground">Professional planning and material selection</p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg hover-elevate transition-all duration-300">
              <img
                src={transformationImg}
                alt="Beautiful home transformation showcase"
                className="w-full h-64 object-cover"
                data-testid="transformation-showcase-image"
              />
              <div className="p-4 bg-card">
                <h4 className="font-semibold text-foreground mb-2">Transforming Dreams</h4>
                <p className="text-sm text-muted-foreground">From concept to completion with excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}