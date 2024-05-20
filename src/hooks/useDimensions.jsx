import { useRef, useState, useEffect, useLayoutEffect } from "react";

const useDimensions = () => {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    const element = divRef.current;

    if (element) {
      // Function to update dimensions
      const updateDimensions = () => {
        setDimensions({
          width: element.offsetWidth,
          height: element.offsetHeight,
        });
        setIsInitialized(true);
      };

      // Initial size set
      updateDimensions();

      // Create a ResizeObserver to watch for size changes
      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });

      // Observe the div
      resizeObserver.observe(element);

      // Clean up observer on component unmount
      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, []);

  return { dimensions, divRef, isInitialized };
};

export default useDimensions;
