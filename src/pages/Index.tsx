
import ImageShareDemo from "../components/ImageShareDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-md mx-auto pt-8 pb-16">
        <h1 className="text-2xl font-bold text-center mb-2">Image Sharing Demo</h1>
        <p className="text-muted-foreground text-center mb-8">
          Click the share button below to share multiple images
        </p>
        <ImageShareDemo />
      </div>
    </div>
  );
};

export default Index;
