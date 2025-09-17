import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

// Import generated images
import teamMeetingImg from "@assets/generated_images/Interior_design_team_meeting_c063726d.png";
import transformationImg from "@assets/generated_images/Home_transformation_showcase_454d3b13.png";

export default function CompanyStory() {
  return (
    <section className="py-16 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content Section */}
          <div className="space-y-8">
            <Card className="p-6">
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

            {/* Team Image */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={teamMeetingImg}
                alt="Professional interior design team meeting and planning"
                className="w-full h-64 object-cover"
                data-testid="team-meeting-image"
              />
            </div>
          </div>

          {/* Transformation Image */}
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={transformationImg}
                alt="Beautiful home transformation showcase"
                className="w-full h-80 object-cover"
                data-testid="transformation-showcase-image"
              />
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Transforming Dreams Into Reality
              </h4>
              <p className="text-muted-foreground text-sm">
                From concept to completion, we bring your vision to life with exceptional attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}