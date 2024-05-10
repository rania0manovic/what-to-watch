import React from "react";
import catalogStore from "../stores/CatalogStore.tsx";
import { observer } from "mobx-react";

const SearchBar = observer(() => {
  return (
    <div className="m-t-3 input-wrapper d-flex w-100">
      <input
        onBlur={(e) => {
          e.preventDefault();
          e.target.focus({ preventScroll: true });
        }}
        data-testid="searchBar"
        value={catalogStore.search}
        onChange={(e: { target: { value: string } }) =>
          catalogStore.updateSearch(e.target.value)
        }
        autoFocus
        placeholder="Search..."
        className="searchBar"
      ></input>
      {catalogStore.search != null && catalogStore.search != "" && (
        <a data-testid="clearButton">
          <svg
            onClick={() => {
              catalogStore.updateSearch("");
            }}
            className="clear-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#ccbed8"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </a>
      )}
    </div>
  );
});
export default SearchBar;
