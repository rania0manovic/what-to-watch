import React, { useState } from "react";
import PropTypes from "prop-types";
const Carousel = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex: number) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex: number) => (prevIndex - 1 + photos.length) % photos.length,
    );
  };

  const visibles = Array.from(
    { length: Math.min(photos.length, 3) },
    (_, index) => (activeIndex + index - 1 + photos.length) % photos.length,
  );

  return (
    <div className="py-4 d-flex w-100 justify-center align-items-center">
      <button
        className="action-button d-flex justify-center align-items-center m-2"
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <div className="carousel-images">
        {visibles.map((index, idx) => (
          <img
            key={index}
            className={`carousel-image ${index === activeIndex ? "active" : ""}`}
            src={photos[index]}
            alt={`Slide ${index}`}
            style={{
              order:
                idx === 1 ? (photos.length === 2 ? 0 : 1) : idx < 1 ? 1 : 2,
            }}
          />
        ))}
      </div>
      <button
        className="action-button d-flex justify-center align-items-center m-2"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>
    </div>
  );
};
Carousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Carousel;
