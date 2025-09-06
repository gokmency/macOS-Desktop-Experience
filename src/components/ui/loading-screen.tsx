import { useState, useEffect } from "react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

interface LoadingScreenProps {
  children: React.ReactNode;
  minLoadingTime?: number; // Minimum loading time in milliseconds
}

const LoadingScreen = ({ children, minLoadingTime = 3000 }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationComplete) {
        setIsLoading(false);
      }
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [animationComplete, minLoadingTime]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-8">
          <AppleHelloEnglishEffect 
            speed={1.2} 
            onAnimationComplete={handleAnimationComplete}
            className="text-white"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingScreen;
