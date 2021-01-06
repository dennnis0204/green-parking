import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import addPointReducer from './addPointReducer';
import userReducer from './userReducer';

const initialSearchCityState = {
  loading: false,
  results: [],
  value: '',
};

const searchCityReducer = (state = initialSearchCityState, action) => {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialSearchCityState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.payload };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.payload };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.payload };
    default:
      return initialSearchCityState;
  }
};

const selectedCityReducer = (selectedCity = {}, action) => {
  if (action.type === 'CITY_SELECTED') {
    return action.payload;
  }
  return selectedCity;
};

export default combineReducers({
  cities: citiesReducer,
  addPoint: addPointReducer,
  user: userReducer,
  searchCity: searchCityReducer,
  selectedCity: selectedCityReducer,
});
