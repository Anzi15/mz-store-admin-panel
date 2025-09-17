import { useState } from "react";

const ProgressiveImage = ({ placeholder, src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-square rounded-md overflow-hidden">
      {/* Blurred Placeholder */}
      <img
        src={placeholder}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity skeleton-loading duration-500 ease-out blur-md `}
        loading="eager"
      />
      {/* High-Resolution Image */}
      <img
        src={src}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProgressiveImage;
