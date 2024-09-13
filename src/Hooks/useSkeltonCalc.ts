import { useState, useEffect, useRef } from "react";

const useResponsiveSkeleton = (defaultCount: number) => {
  const [count, setCount] = useState(defaultCount);
  const containerRef: any = useRef(null);

  const updateCount = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      if (containerWidth < 480) {
        setCount(1); // For small screens
      } else if (containerWidth < 768) {
        setCount(3); // For medium screens
      } else {
        setCount(defaultCount); // For large screens
      }
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [defaultCount]);

  return [containerRef, count];
};

export default useResponsiveSkeleton;
