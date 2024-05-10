import React, { useEffect, useState } from "react";
import BackButton from "../../common/BackButton.tsx";
import MoviesService from "../../../data/services/MoviesService.tsx";
import { useParams } from "react-router-dom";
import ShowsService from "../../../data/services/ShowsService.tsx";
import { IMovie } from "../../../data/models/Movie.tsx";
import { IShow } from "../../../data/models/Show.tsx";
import { IMediaVideo } from "../../../data/models/MediaVideo.tsx";
import { baseUrl } from "../../../data/constants/index.ts";
import Spinner from "../../common/Spinner.tsx";
import Carousel from "./Carousel.tsx";
import { CountryStreamingData } from "../../../data/models/CountryStreamingData.tsx";

export default function MediaDetails() {
  const parameters = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [show, setShow] = useState<IShow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [trailer, setTrailer] = useState<IMediaVideo | null>(null);
  const [watchProviders, setWatchProviders] =
    useState<CountryStreamingData | null>(null);
  const tab = parameters.tab;
  const id = parameters.id;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let response: IMovie | IShow | null;
      let videos;
      let providers;
      try {
        if (tab == "0") {
          response = await ShowsService.getById(id);
          videos = await ShowsService.getVideos(id);
          providers = await ShowsService.getWatchProviders(id);
          if (response != null) {
            setShow(response as IShow);
            response["seasons"].forEach((season: { [x: string]: string }) => {
              if (season["poster_path"] != null)
                setPhotos((prevPhotos: string[]) => [
                  ...prevPhotos,
                  baseUrl + season["poster_path"],
                ]);
            });
          }
        } else if (tab == "1") {
          response = await MoviesService.getById(id);
          videos = await MoviesService.getVideos(id);
          providers = await MoviesService.getWatchProviders(id);
          if (response != null) {
            setMovie(response as IMovie);
          }
        }
        if (videos) {
          const trailerVideo = videos.results
            .filter((video: { type: string }) => video.type === "Trailer")
            .sort(
              (
                a: { published_at: string | number | Date },
                b: { published_at: string | number | Date },
              ) =>
                new Date(a.published_at).getTime() -
                new Date(b.published_at).getTime(),
            )[0];
          setTrailer(trailerVideo);
        }
        if (providers) {
          setWatchProviders(providers.results["BA"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-100 d-flex justify-center">
        <div className="d-flex media-info flex-column w-70 py-4">
          <BackButton></BackButton>
          {isLoading ? (
            <div className="d-flex flex-column align-items-center justify-center py-4">
              <Spinner />
            </div>
          ) : tab === "0" ? (
            <div
              data-testid="media-item"
              className="d-flex media-details-item  flex-column m-t-3"
            >
              {trailer != null ? (
                <iframe
                  className="radius-10"
                  height="300"
                  src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : show?.poster_path ? (
                <img
                  className="media-poster"
                  src={baseUrl + show?.poster_path}
                ></img>
              ) : (
                <div className="media-poster d-flex justify-center align-items-center ">
                  <p className="gallery">No poster avaliable.</p>
                </div>
              )}
              <div className="d-flex align-items-center py-2">
                <p className="p-24 p-r-1 text-start p-0 m-0 fw-800">
                  {show!.name} ({new Date(show!.first_air_date).getFullYear()})
                </p>
                {show?.vote_average ? (
                  <div
                    className="stars "
                    style={
                      {
                        "--rating": show?.vote_average / 10,
                      } as unknown
                    }
                  >
                    <div className="bg">⭐⭐⭐⭐⭐</div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className="p-16 text-start my-1 fw-500">
                <b>Overview: </b> {show!.overview}
              </p>
              <p className="p-16 text-start my-1 fw-500">
                <b>Number of seasons:</b> {show!.number_of_seasons}
              </p>
              <ul className="d-flex p-0 genres my-1 fw-500 m-0">
                {show?.genres.map((genre, index) => (
                  <li key={index}>• {genre.name}</li>
                ))}
              </ul>
              <div className="d-flex flex-wrap p-0 my-1 fw-500 m-0">
                {watchProviders?.flatrate?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
                {watchProviders?.rent?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
                {watchProviders?.buy?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
              </div>
              {photos.length != 0 ? <Carousel photos={photos} /> : <></>}
            </div>
          ) : tab === "1" && movie ? (
            <div className="d-flex media-details-item flex-column m-t-3">
              {trailer != null ? (
                <iframe
                  className="radius-10"
                  height="300"
                  src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : movie!.poster_path ? (
                <img
                  className="media-poster"
                  src={baseUrl + movie?.poster_path}
                ></img>
              ) : (
                <div className="media-poster d-flex justify-center align-items-center ">
                  <p className="gallery">No poster avaliable.</p>
                </div>
              )}
              <div className="d-flex align-items-center py-2 ">
                <p className="p-24 p-r-1 text-start p-0 m-0 fw-800">
                  {movie!.title} ({new Date(movie!.release_date).getFullYear()})
                </p>
                {movie?.vote_average ? (
                  <div
                    className="stars "
                    style={
                      {
                        "--rating": movie?.vote_average / 10,
                      } as unknown
                    }
                  >
                    <div className="bg">⭐⭐⭐⭐⭐</div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className="p-16 text-start my-1 fw-600">
                <b>Overview: </b> {movie!.overview}
              </p>
              <ul className="d-flex p-0 genres my-1 fw-500 m-0">
                {movie?.genres.map((genre, index) => (
                  <li key={index}>• {genre.name}</li>
                ))}
              </ul>
              <div className="d-flex flex-wrap p-0 my-1 fw-500 m-0">
                {watchProviders?.flatrate?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
                {watchProviders?.rent?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
                {watchProviders?.buy?.map((provider, index) => (
                  <img
                    key={index}
                    height="64px"
                    width="64px"
                    className="radius-10 provider-icon m-r-3"
                    src={baseUrl + provider.logo_path}
                  ></img>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
