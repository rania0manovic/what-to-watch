import { httpSmartClient } from "./BaseService.tsx";

const baseName = "movie";

const MoviesService = {
  getTopRanked: async (page) => {
    const respone = await httpSmartClient.get(
      `/${baseName}/top_rated?page=${page}`,
    );
    return respone;
  },
  getByParams: async (params) => {
    const respone = await httpSmartClient.get(
      `/search/${baseName}?query=${params}`,
    );
    return respone;
  },
  getById: async (id) => {
    const respone = await httpSmartClient.get(`/${baseName}/${id}`);
    return respone;
  },
  getVideos: async (id) => {
    const respone = await httpSmartClient.get(`/${baseName}/${id}/videos`);
    return respone;
  },
  getWatchProviders: async (id) => {
    const respone = await httpSmartClient.get(
      `/${baseName}/${id}/watch/providers`,
    );
    return respone;
  },
};

export default MoviesService;
