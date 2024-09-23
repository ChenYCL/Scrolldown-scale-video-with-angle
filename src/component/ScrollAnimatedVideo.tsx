import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';

interface ScrollAnimatedVideoProps {
  videoSrc: string;
  posterSrc: string;
  initialTiltAngle?: number;
}

const ScrollAnimatedVideo: React.FC<ScrollAnimatedVideoProps> = ({
  videoSrc,
  posterSrc,
  initialTiltAngle = 60, // 默认值为60度，但可以通过props更改
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // 使用 useMemo 来计算 transform，只有在 scrollPercentage 或 initialTiltAngle 改变时才重新计算
  const transform = useMemo(() => {
    const rotateX = initialTiltAngle - scrollPercentage * initialTiltAngle;
    const scale = 0.75 + scrollPercentage * 0.25;
    return `perspective(1200px) translateY(${
      20 - scrollPercentage * 20
    }px) scale(${scale}) rotateX(${rotateX}deg)`;
  }, [scrollPercentage, initialTiltAngle]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newScrollPercentage = Math.max(
          0,
          Math.min(1, 1 - rect.top / window.innerHeight)
        );
        setScrollPercentage(newScrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 立即触发一次滚动事件处理
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Auto-play was prevented:', error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 rounded-md bg-background transform-gpu transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center top',
          transform,
          boxShadow: '0 0 0 6px rgba(129, 87, 255, 0.3)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-md border-2 border-primary/30 hidden md:block"></div>
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          autoPlay
          playsInline
          loop
          muted
          poster={posterSrc}
          className="rounded-md object-cover w-full h-full"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default ScrollAnimatedVideo;
