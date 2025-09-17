import { Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} social link clicked`);
    // //todo: remove mock functionality - replace with actual social links
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              interiology
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Creating beautiful, functional spaces that reflect your personality and enhance your lifestyle. 
              We transform houses into dream homes.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleSocialClick('Instagram')}
                className="bg-muted hover-elevate p-2 rounded-full transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleSocialClick('Facebook')}
                className="bg-muted hover-elevate p-2 rounded-full transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleSocialClick('Twitter')}
                className="bg-muted hover-elevate p-2 rounded-full transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Residential Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Commercial Spaces</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Space Planning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Color Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Furniture Selection</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Project Management</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 72783 85837</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@interiology.com</span>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Mumbai, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Interiology. All rights reserved. | Professional Interior Design Services
          </p>
        </div>
      </div>
    </footer>
  );
}