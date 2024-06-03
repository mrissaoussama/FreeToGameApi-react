import { useEffect, useRef, useState } from 'react';

const useLazyLoadImage = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px 100px 0px', // Adjust as needed
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);

  return [imgRef, isIntersecting];
};

export default useLazyLoadImage;
