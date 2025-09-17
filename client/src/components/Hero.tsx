import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-accent/30 to-background flex items-center">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Transform Your Space with
            <span className="block text-primary">Exceptional Design</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            We create beautiful, functional interiors that reflect your personality and enhance your lifestyle. 
            From concept to completion, we bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-base px-8"
              data-testid="button-explore-work"
            >
              Explore Our Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8"
              data-testid="button-consultation"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}