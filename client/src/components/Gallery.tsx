import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import generated images
import livingRoomImg from "@assets/generated_images/Modern_luxury_living_room_4d7bc6f4.png";
import diningRoomImg from "@assets/generated_images/Contemporary_dining_room_design_d820da78.png";
import bedroomImg from "@assets/generated_images/Luxury_master_bedroom_interior_8426d8ad.png";
import kitchenImg from "@assets/generated_images/Modern_kitchen_design_35e3e730.png";
import officeImg from "@assets/generated_images/Elegant_home_office_design_97146369.png";
import bathroomImg from "@assets/generated_images/Luxury_bathroom_interior_design_1cf1da93.png";

const galleryImages = [
  { src: livingRoomImg, alt: "Modern luxury living room with elegant furniture" },
  { src: diningRoomImg, alt: "Contemporary dining room design" },
  { src: bedroomImg, alt: "Luxury master bedroom interior" },
  { src: kitchenImg, alt: "Modern kitchen with marble countertops" },
  { src: officeImg, alt: "Elegant home office design" },
  { src: bathroomImg, alt: "Luxury bathroom with marble finishes" },
];

interface GalleryProps {
  showTitle?: boolean;
}

export default function Gallery({ showTitle = true }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    console.log(`Opened lightbox for image ${index + 1}`);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    console.log('Closed lightbox');
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      const newIndex = selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1;
      setSelectedImage(newIndex);
      console.log(`Navigated to image ${newIndex + 1}`);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
      console.log(`Navigated to image ${newIndex + 1}`);
    }
  };

  return (
    <section className="py-16 bg-card/30" id="gallery">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our latest interior design projects showcasing innovative spaces that blend functionality with aesthetic excellence.
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-lg overflow-hidden shadow-md hover-elevate cursor-pointer"
              onClick={() => openLightbox(index)}
              data-testid={`gallery-item-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeLightbox}
                data-testid="button-close-lightbox"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToPrevious}
                data-testid="button-previous-image"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToNext}
                data-testid="button-next-image"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Image */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
                data-testid="lightbox-image"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}