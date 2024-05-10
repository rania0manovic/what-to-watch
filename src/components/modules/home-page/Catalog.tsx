import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import MoviesService from "../../../data/services/MoviesService.tsx";
import ShowsService from "../../../data/services/ShowsService.tsx";
import catalogStore from "../../stores/CatalogStore.tsx";
import Spinner from "../../common/Spinner.tsx";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../data/constants/index.ts";
import { IMovie } from "../../../data/models/Movie.tsx";
import { IShow } from "../../../data/models/Show.tsx";

const Catalog = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const delayInputTimeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (catalogStore.cancelFetching) {
      window.scrollTo(0, catalogStore.yScrollPosition);
      catalogStore.updateCancelFetching(false);
      catalogStore.updateYScrollPosition(0);
      return;
    }
    fetchData();
  }, [
    catalogStore.search,
    catalogStore.pageForShows,
    catalogStore.pageForMovies,
    catalogStore.tab,
  ]);

  const fetchData = async () => {
    setIsLoading(true);
    clearTimeout(delayInputTimeoutId.current);
    const getData = async () => {
      try {
        if (catalogStore.search && catalogStore.search.length >= 3) {
          delayInputTimeoutId.current = setTimeout(async () => {
            await getItemsByParams();
            setIsLoading(false);
          }, 1000);
        } else {
          await getTrendingItems();
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    return () => clearTimeout(delayInputTimeoutId.current);
  };

  const getTrendingItems = async () => {
    let response = {};
    if (catalogStore.tab == 0) {
      response = await ShowsService.getTopRanked(catalogStore.pageForShows);
      if (response != null && response["results"] != null)
        catalogStore.setShows(response["results"]);
      catalogStore.updateMessage("Showing trending shows at the moment.");
    } else if (catalogStore.tab == 1) {
      response = await MoviesService.getTopRanked(catalogStore.pageForMovies);
      if (response != null && response["results"] != null)
        catalogStore.setMovies(response["results"]);
      catalogStore.updateMessage("Showing trending movies at the moment.");
    }
  };

  const getItemsByParams = async () => {
    let response = {};
    if (catalogStore.tab === 0) {
      response = await ShowsService.getByParams(catalogStore.search);
      if (response != null && response["results"] != null)
        catalogStore.setShows(response["results"]);
      catalogStore.updateMessage(
        `Showing show results for '${catalogStore.search}'.`,
      );
    } else if (catalogStore.tab === 1) {
      response = await MoviesService.getByParams(catalogStore.search);
      if (response != null && response["results"] != null)
        catalogStore.setMovies(response["results"]);
      catalogStore.updateMessage(
        `Showing movie results for '${catalogStore.search}'.`,
      );
    }
  };

  const fetchMore = async () => {
    if (catalogStore.tab == 0) {
      if (!catalogStore.fetchMoreShows) {
        catalogStore.shows = [...catalogStore.shows, ...catalogStore.tempShows];
        catalogStore.updateFetchMoreShows();
      } else {
        catalogStore.updatePageForShows();
        catalogStore.updateFetchMoreShows();
      }
    } else if (catalogStore.tab == 1) {
      if (!catalogStore.fetchMoreMovies) {
        catalogStore.movies = [
          ...catalogStore.movies,
          ...catalogStore.tempMovies,
        ];
        catalogStore.updateFetchMoreMovies();
      } else {
        catalogStore.updatePageForMovies();
        catalogStore.updateFetchMoreMovies();
      }
    }
  };

  return isLoading ? (
    <div className="d-flex w-100 justify-center p-t-3 m-t-3">
      <Spinner></Spinner>
    </div>
  ) : (
    <>
      <p className="gallery opacity-50">{catalogStore.message}</p>
      {(catalogStore.tab == 0 && catalogStore.shows.length == 0) ||
      (catalogStore.tab == 1 && catalogStore.movies.length == 0) ? (
        <div className=" d-flex h-60vh justify-center align-items-center">
          <p className="gallery opacity-80 p-18 p-r-2">No results found </p>
          <img src="assets/sad-face.svg"></img>
        </div>
      ) : (
        <></>
      )}
      <div className="d-flex catalog-item-wrap flex-wrap border-box">
        {catalogStore.tab == 1
          ? catalogStore.movies.map((movie: IMovie) => (
              <a
                onClick={() => {
                  catalogStore.yScrollPosition = window.scrollY;
                  navigate(`media-details/${catalogStore.tab}/${movie.id}`);
                }}
                key={movie.id}
                className="catalog-item"
              >
                <div className="d-flex flex-column">
                  {movie.poster_path != null ? (
                    <img
                      className="catalog-poster"
                      src={baseUrl + movie.poster_path!}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="catalog-poster d-flex justify-center align-items-center ">
                      <p className="gallery">No poster avaliable</p>
                    </div>
                  )}
                  <div className="catalog-title  d-flex p-2 justify-center align-items-center">
                    <p className="p-20 text-center m-0 fw-700">
                      {movie.title.length > 20
                        ? movie.title.slice(0, 20) + "..."
                        : movie.title}{" "}
                      ({new Date(movie.release_date).getFullYear()})
                    </p>
                  </div>
                </div>
              </a>
            ))
          : catalogStore.shows.map((show: IShow) => (
              <a
                onClick={() => {
                  catalogStore.yScrollPosition = window.scrollY;
                  navigate(`media-details/${catalogStore.tab}/${show.id}`);
                }}
                key={show.id}
                className="catalog-item"
              >
                <div className="d-flex flex-column">
                  {show.poster_path != null ? (
                    <img
                      className="catalog-poster"
                      src={baseUrl + show.poster_path!}
                      alt={show.name}
                    />
                  ) : (
                    <div className="catalog-poster d-flex justify-center align-items-center ">
                      <p className="gallery">No poster avaliable</p>
                    </div>
                  )}
                  <div className="catalog-title  d-flex p-2 justify-center align-items-center">
                    <p className="p-20 text-center m-0 fw-700">
                      {show.name.length > 20
                        ? show.name.slice(0, 20) + "..."
                        : show.name}{" "}
                      ({new Date(show.first_air_date).getFullYear()})
                    </p>
                  </div>
                </div>
              </a>
            ))}
      </div>
      {catalogStore.search.length >= 3 ? (
        <></>
      ) : (
        <button
          onClick={() => fetchMore()}
          className="p-16 fw-600 secondary-button"
        >
          {" "}
          Load more
        </button>
      )}
    </>
  );
});

export default Catalog;
