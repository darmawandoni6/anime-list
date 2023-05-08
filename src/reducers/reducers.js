import { combineReducers } from 'redux';

import anime from './Anime/anime.reducer';
import home from './home/home.reducer';

// COMBINED REDUCERS
const reducers = {
  home,
  anime,
};

export default combineReducers(reducers);
