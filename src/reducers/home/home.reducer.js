import homeType from './home.type';

const initialState = {
  loading: false,
  populer: null,
  list: {
    data: {},
  },
  genre: null,
  recomend: {},
};

function reducer(state = initialState, action) {
  const { type, payload, genre, page } = action;
  switch (type) {
    case homeType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case homeType.FETCH_POPULER:
      return {
        ...state,
        loading: false,
        populer: payload.data,
      };
    case homeType.FETCH_ANIME_SEASON_NOW:
      return {
        ...state,
        loading: false,
        list: {
          data: {
            ...state.list.data,
            [page]: payload.data,
          },
          pagination: payload.pagination,
        },
      };
    case homeType.FETCH_GENRE:
      return {
        ...state,
        loading: false,
        genre: payload.data,
      };
    case homeType.FETCH_ANIME_LIST:
      return {
        ...state,
        loading: false,
        recomend: {
          ...state.recomend,
          [genre]: payload.data,
        },
      };

    default:
      return state;
  }
}
export default reducer;
