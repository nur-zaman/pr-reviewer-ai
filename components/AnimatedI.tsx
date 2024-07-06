import React from "react";

const AnimatedI = () => {
  return (
    <div className="relative inline-block">
      {/* Letter i stem */}
      <div className="w-2 h-12 bg-foreground rounded-full"></div>

      {/* Animated dot/symbol */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="w-3 h-3 bg-green-800 rounded-full animate-[morph_4s_infinite]"></div>
      </div>
    </div>
  );
};

export default AnimatedI;
