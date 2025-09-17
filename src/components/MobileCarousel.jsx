"use client";

import { useState, useRef } from "react";

const MobileCarousel = ({ className, productImages }) => {
  const containerRef = useRef(null);
  const [isFirstImage, setIsFirstImage] = useState(true);
  const [isLastImage, setIsLastImage] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    setIsFirstImage(container.scrollLeft === 0);
    setIsLastImage(
      container.scrollLeft === container.scrollWidth - container.offsetWidth,
    );
  };

  const scrollToNextImage = () => {
    if (!containerRef.current || isLastImage) return;
    const imageWidth = containerRef.current.offsetWidth; // Width of each image container
    const gapWidth = 8; // Width of the gap (adjust as needed)
    const totalWidth = imageWidth + gapWidth; // Total width including the gap
    const maxScrollLeft =
      containerRef.current.scrollWidth - containerRef.current.offsetWidth; // Maximum scrollable distance
    const remainingScroll = maxScrollLeft - containerRef.current.scrollLeft; // Remaining distance to scroll
    const scrollAmount = Math.min(totalWidth, remainingScroll); // Ensure not to scroll beyond the last image
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToPrevImage = () => {
    if (!containerRef.current || isFirstImage) return;
    const imageWidth = containerRef.current.offsetWidth; // Width of each image container
    const gapWidth = 8; // Width of the gap (adjust as needed)
    const totalWidth = imageWidth + gapWidth; // Total width including the gap
    const scrollAmount = Math.min(totalWidth, containerRef.current.scrollLeft); // Ensure not to scroll beyond the first image
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={className} aria-label="Product Images Carousel">
      <div
        className="scrollbar-hidden relative grid snap-x snap-mandatory auto-cols-max grid-flow-col grid-rows-1 gap-2 overflow-hidden overflow-x-auto overscroll-x-contain aspect-square"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {productImages.map((image, index) => (
          <div key={index} className="w-svw snap-center overflow-hidden ">
            <img
              key={index}
              src={image}
              width={375}
              height={300}
              alt={`Product image ${index + 1}`}
              className={` h-full w-svw overflow-hidden object-cover `}
            />
          </div>
        ))}
      </div>
      <button
        className={`absolute left-4 flex size-10 cursor-pointer items-center justify-center place-self-center rounded-full bg-white ${isFirstImage ? "opacity-75" : ""}`}
        onClick={scrollToPrevImage}
        disabled={isFirstImage}
      />
      <button
        className={`absolute right-4 flex size-10 cursor-pointer items-center justify-center place-self-center rounded-full bg-white ${isLastImage ? "opacity-75" : ""}`}
        onClick={scrollToNextImage}
        disabled={isLastImage}
      />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-2  rounded">
  {productImages.map((img)=>{
    return(
      <div key={img} className="w-2 rounded-full bg-black"></div>
    )
  })}
</div>
    </section>
  );
};

export default MobileCarousel;