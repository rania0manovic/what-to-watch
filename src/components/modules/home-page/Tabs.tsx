import React, { useState } from "react";
import catalogStore from "../../stores/CatalogStore.tsx";

export default function Tabs() {
  const [tab, setTab] = useState<number>(catalogStore.tab);

  const changeTab = (selectedTab: number) => {
    if (catalogStore.tab == selectedTab) return;
    setTab(selectedTab);
    if (
      catalogStore.search.length < 3 &&
      catalogStore.movies.length > 0 &&
      catalogStore.shows.length > 0
    ) {
      catalogStore.updateCancelFetching(true);
    }
    if (catalogStore.search.length >= 3) {
      if (selectedTab == 1) catalogStore.setMovies([]);
      else if (selectedTab == 0) catalogStore.setShows([]);
    }
    catalogStore.updateTabs(selectedTab);
  };

  return (
    <>
      <a
        data-testid="tab_0"
        onClick={() => changeTab(0)}
        className={`tab w-100 text-center ${tab === 0 ? "active" : ""}`}
      >
        <p>TV Shows</p>
      </a>
      <div className="w-10"></div>
      <a
        data-testid="tab_1"
        onClick={() => changeTab(1)}
        className={`tab w-100 text-center ${tab === 1 ? "active" : ""}`}
      >
        <p>Movies</p>
      </a>
    </>
  );
}
