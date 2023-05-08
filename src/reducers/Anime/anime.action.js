import httpService from '@helpers/httpService';

import animeType from './anime.type';

export default {
  fetchAnimeById: (id) => {
    return async (dispatch) => {
      dispatch({ type: animeType.LOADING });
      try {
        const res = await httpService.get(`/anime/${id}`);
        dispatch({ type: animeType.FETCH_ANIME_BY_ID, payload: res.data, malId: id });
      } catch (error) {
        dispatch({ type: animeType.LOADING });
        return error;
      }
    };
  },
};
