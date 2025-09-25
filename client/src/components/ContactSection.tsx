import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import ParallaxSection from "./ParallaxSection";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!formData.name.trim()) {
      toast({ title: "Please enter your name" });
      return;
    }
    const emailValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(formData.email);
    if (!emailValid) {
      toast({ title: "Please enter a valid email address" });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: "Please include a brief message" });
      return;
    }

    try {
      setIsSubmitting(true);
      // Post to FormBackend endpoint
      const endpoint = 'https://www.formbackend.com/f/8be9e10693a31d42';

      // Build FormData (supports backend's form parsing; if JSON desired, could send application/json)
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      if (formData.phone) payload.append('phone', formData.phone);
      payload.append('message', formData.message);

      const res = await fetch(endpoint, {
        method: 'POST',
        body: payload,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      toast({ title: 'Thanks!', description: 'We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Something went wrong', description: 'Please try again in a moment.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your interior design services.");
    window.open(`https://wa.me/917278385837?text=${message}`, '_blank');
    console.log('WhatsApp clicked');
  };

  const handlePhoneClick = () => {
    window.open('tel:+917278385837');
    console.log('Phone clicked');
  };

  return (
    <ParallaxSection as="section" className="py-16 bg-background" id="contact" innerClassName="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-[#fde63e] via-[#f8d64e] to-[#fde63e] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(253,230,62,0.25)] mb-4 pb-1">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your space? Contact us today for a free consultation and let's bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#fde63e]/40 via-primary/15 to-transparent"
                >
                  <Card
                    className="p-4 hover-elevate cursor-pointer"
                    onClick={handlePhoneClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePhoneClick();
                      }
                    }}
                    data-testid="contact-phone"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-muted-foreground">+91 72783 85837</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#fde63e]/40 via-primary/15 to-transparent"
                >
                  <Card
                    className="p-4 hover-elevate cursor-pointer"
                    onClick={handleWhatsAppClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleWhatsAppClick();
                      }
                    }}
                    data-testid="contact-whatsapp"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                        <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <p className="text-muted-foreground">+91 72783 85837</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#fde63e]/40 via-primary/15 to-transparent"
                >
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-muted-foreground">interiorlogyofficial@gmail.com</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#fde63e]/40 via-primary/15 to-transparent"
                >
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">Muragacha Hospital Road, P.S: Ghola, P.O: Jugberia, Kolkata 700110</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl p-[1.5px] bg-gradient-to-br from-[#fde63e]/40 via-primary/15 to-transparent"
          >
          <Card className="p-6">
            <div className="sr-only" role="status" aria-live="polite">{isSubmitting ? 'Submitting your message…' : ''}</div>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Send us a Message
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    data-testid="input-name"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!formData.name.trim() ? true : undefined}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    data-testid="input-phone"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9()+\-\s]{7,}"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={/[^@\s]+@[^@\s]+\.[^@\s]+/.test(formData.email) ? undefined : true}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project and how we can help..."
                  data-testid="textarea-message"
                  aria-required="true"
                  aria-invalid={!formData.message.trim() ? true : undefined}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
                data-testid="button-submit-form"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </Card>
          </motion.div>
        </div>
    </ParallaxSection>
  );
}