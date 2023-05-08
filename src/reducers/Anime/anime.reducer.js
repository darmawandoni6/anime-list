import animeType from './anime.type';

const initialState = {
  loading: false,
  data: {},
};

function reducer(state = initialState, action) {
  const { type, payload, malId } = action;
  switch (type) {
    case animeType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case animeType.FETCH_ANIME_BY_ID:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [malId]: payload.data,
        },
      };
    default:
      return state;
  }
}
export default reducer;
