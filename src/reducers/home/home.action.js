import httpService from '@helpers/httpService';
import home from 'src/constants/home';

import homeType from './home.type';

export default {
  fetchPopulerAnime: () => {
    return async (dispatch) => {
      dispatch({ type: homeType.LOADING });
      try {
        const res = await httpService.get('/top/anime', {
          params: {
            filter: 'airing',
            limit: 6,
          },
        });
        dispatch({ type: homeType.FETCH_POPULER, payload: res.data });
      } catch (error) {
        dispatch({ type: homeType.LOADING });
        return error;
      }
    };
  },
  fetchAnimeSeasonNow: (page) => {
    return async (dispatch) => {
      dispatch({ type: homeType.LOADING });
      try {
        const res = await httpService.get('/seasons/now', {
          params: {
            page,
            limit: 7,
          },
        });
        dispatch({ type: homeType.FETCH_ANIME_SEASON_NOW, payload: res.data, page });
      } catch (error) {
        dispatch({ type: homeType.LOADING });
        return error;
      }
    };
  },
  fetchGenre: () => {
    return async (dispatch) => {
      dispatch({ type: homeType.LOADING });
      try {
        const res = await httpService.get('/genres/anime', {
          params: {
            filter: 'genres',
          },
        });
        dispatch({ type: homeType.FETCH_GENRE, payload: res.data });
      } catch (error) {
        dispatch({ type: homeType.LOADING });
        return error;
      }
    };
  },
  fetchAnimeList: ({ params, genre }) => {
    return async (dispatch) => {
      dispatch({ type: homeType.LOADING });
      try {
        const res = await httpService.get('/anime', {
          params: {
            ...params,
            ...home.paramsRecomend,
          },
        });
        dispatch({ type: homeType.FETCH_ANIME_LIST, payload: res.data, genre });
      } catch (error) {
        dispatch({ type: homeType.LOADING });
        return error;
      }
    };
  },
};
