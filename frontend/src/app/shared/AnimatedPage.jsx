import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AnimatedPage({children}) {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={`flex flex-col ${transitionStage} min-h-screen w-full bg-stone-200 h-screen`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedPage