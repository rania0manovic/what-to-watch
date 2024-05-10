import React from "react";
import { useNavigate } from "react-router-dom";
import catalogStore from "../stores/CatalogStore.tsx";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        if (catalogStore.shows.length != 0 && catalogStore.movies.length != 0)
          catalogStore.updateCancelFetching(true);

        navigate(-1);
      }}
      className="secondary-button w-min d-flex justify-start align-items-center"
    >
      <svg
        className="back-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill="#f0f0f0"
      >
        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
      </svg>
      <span className="fw-600 p-16 ">Back</span>
    </button>
  );
}
