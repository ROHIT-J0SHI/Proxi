import React, { useMemo } from "react";

const GradientBackground = ({ children }) => {
  // Randomize positions for the gradient spots
  const gradientStyles = useMemo(() => {
    const getRandomPosition = (index) => ({
      top: `${Math.random() * 90}vh`, // Increased range (0-90% of viewport height)
      left: `${Math.random() * 90}vw`, // Increased range (0-90% of viewport width)
      width: `${Math.random() * 150 + 50}px`, // Larger size range (50px - 200px)
      height: `${Math.random() * 150 + 50}px`, // Larger size range (50px - 200px)
      blur: `${Math.random() * 80 + 30}px`, // More blur range (30px - 110px)
      color: index % 2 === 0 ? "bg-main/30" : "bg-secondary/30", // Alternate between main and secondary colors
    });

    return Array.from({ length: 20 }, (_, index) => getRandomPosition(index)); // Increased number of gradients to 10
  }, []); // Runs only once per page load

  return (
    <div className="relative w-full min-h-full overflow-hidden">
      {/* Dynamic Gradient Spots */}
      <div className="absolute inset-0 -z-10">
        {gradientStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute ${style.color} rounded-full`}
            style={{
              top: style.top,
              left: style.left,
              width: style.width,
              height: style.height,
              filter: `blur(${style.blur})`,
            }}
          ></div>
        ))}
      </div>

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
