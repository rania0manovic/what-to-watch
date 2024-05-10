import React, { useEffect, useState } from "react";
import SearchBar from "../../common/SearchBar.tsx";
import Catalog from "./Catalog.tsx";
import Tabs from "./Tabs.tsx";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-100 home d-flex justify-center">
      <button
        className={`scroll-to-top-button ${isVisible ? "visible" : "hidden"}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" />
        </svg>
      </button>
      <div className="d-flex flex-column w-80 py-4">
        <div className="tabs d-flex">
          <Tabs />
        </div>
        <SearchBar />
        <Catalog />
      </div>
    </div>
  );
}
