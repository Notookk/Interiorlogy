import { Shield, PenTool, Layout, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Flat 5 Years Warranty",
    description: "Complete peace of mind with our comprehensive 5-year warranty on all interior work."
  },
  {
    icon: PenTool,
    title: "Free 2D/3D Design",
    description: "Visualize your dream space with complimentary 2D and 3D design renderings."
  },
  {
    icon: Layout,
    title: "Space Saving Interior Design",
    description: "Maximize functionality with intelligent space-saving design solutions."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Reliable project completion within agreed timelines, every single time."
  },
  {
    icon: Users,
    title: "1000+ Happy Customers",
    description: "Join our growing family of satisfied clients who trusted us with their homes."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Why Choose Interiorlogy For Interior Decoration
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Designing your home is a magical and lifetime experience, don't let it be an ordinary journey. 
            Shake hands with the interior design company and discover how we can give shape to your best dreams –
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-4 text-center hover-elevate transition-all duration-300"
              data-testid={`feature-card-${index}`}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}