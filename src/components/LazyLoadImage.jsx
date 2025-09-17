import React, { useState, useEffect } from 'react';

const LazyLoadImage = ({ lowResSrc, highResSrc, srcSetArray = null, alt = '', className = '', ...props }) => {
  const [loaded, setLoaded] = useState(false); // Track if the high-res image has loaded

  // Create the srcSet string from the array if provided
  const srcSet = srcSetArray 
    ? srcSetArray.map(item => `${item.url} ${item.size}w`).join(', ') 
    : null;

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc; // Preload the high-res image
    img.onload = () => setLoaded(true); // Switch to high-res once it's loaded
  }, [highResSrc]);

  return (
    <div className={`relative ${className}`}>
      {/* Low resolution image with blur effect */}
      <img
        src={lowResSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-0' : 'opacity-100 blur-md'}`}
        {...props}
      />
      {/* High resolution image with fade-in effect */}
      <img
        src={highResSrc}
        srcSet={srcSet || undefined} // Use srcSet if provided, else use highResSrc only
        sizes={srcSet ? "(max-width: 400px) 400px, (max-width: 800px) 800px, 100vw" : undefined} // Set sizes if srcSet exists
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100 blur-0' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};

export default LazyLoadImage;
