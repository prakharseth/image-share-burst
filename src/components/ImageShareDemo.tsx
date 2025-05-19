
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

// Define array of random image URLs from Unsplash
const imageUrls = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

const ImageShareDemo: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);

  // Function to convert image URLs to File objects
  const convertUrlsToFiles = async () => {
    try {
      const files = await Promise.all(
        imageUrls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          return new File([blob], `image-${index + 1}.jpg`, { type: "image/jpeg" });
        })
      );
      return files;
    } catch (error) {
      console.error("Error converting URLs to files:", error);
      return null;
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      toast.error("Sharing is not supported on this device/browser.");
      return;
    }

    try {
      setIsSharing(true);
      const files = await convertUrlsToFiles();
      
      if (!files) {
        toast.error("Failed to prepare images for sharing.");
        return;
      }

      await navigator.share({
        title: "Check out these images",
        text: "Sharing multiple images from my app",
        files
      });
      
      toast.success("Images shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
      
      // Only show error toast if it's not an AbortError (user canceled)
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Failed to share images.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        {imageUrls.map((url, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img
              src={url}
              alt={`Random image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      <Button 
        onClick={handleShare} 
        disabled={isSharing} 
        className="flex items-center gap-2"
      >
        <Share size={18} />
        {isSharing ? "Preparing..." : "Share Images"}
      </Button>
    </div>
  );
};

export default ImageShareDemo;
