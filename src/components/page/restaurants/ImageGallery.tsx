import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        {images.length === 1 ? (
          <div
            className="col-span-4 h-[400px] cursor-pointer overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <Image
              height={400}
              width={400}
              src={images[0]}
              alt="Restaurant"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : images.length === 2 ? (
          images.map((img, i) => (
            <div
              key={i}
              className="col-span-2 h-[300px] cursor-pointer overflow-hidden"
              onClick={() => openLightbox(i)}
            >
              <Image
                height={400}
                width={400}
                src={img}
                alt={`Restaurant ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))
        ) : (
          <>
            <div
              className="col-span-2 row-span-2 h-[400px] cursor-pointer overflow-hidden"
              onClick={() => openLightbox(0)}
            >
              <Image
                height={400}
                width={400}
                src={images[0]}
                alt="Restaurant main"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2">
              {images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className={`h-[196px] cursor-pointer overflow-hidden relative ${
                    i === 3 && images.length > 5 ? "group" : ""
                  }`}
                  onClick={() => openLightbox(i + 1)}
                >
                  <Image
                    height={400}
                    width={400}
                    src={img}
                    alt={`Restaurant ${i + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {i === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        +{images.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            {selectedIndex !== null && (
              <Image
                height={500}
                width={500}
                src={images[selectedIndex]}
                alt={`Restaurant ${selectedIndex + 1}`}
                className="w-full h-[80vh] object-contain"
              />
            )}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goPrev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === selectedIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
