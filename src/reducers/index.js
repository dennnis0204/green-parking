import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';

const pointsReducer = () => {
  return [
    {
      name: 'point1',
      latitude: 53.42,
      longitude: 14.55,
    },
    {
      name: 'point2',
      latitude: 53.4285,
      longitude: 14.5528,
    },
    {
      name: 'point3',
      latitude: 53.4299,
      longitude: 14.5599,
    },
    {
      name: 'point4',
      latitude: 53.4299,
      longitude: 14.5599,
    },
  ];
};

const userReducer = () => {
  return {
    name: null,
    map: {
      lastCenter: {
        latitude: null,
        longitude: null,
      },
    },
    point: {
      hasSaved: false,
      coordinates: {
        latitude: null,
        longitude: null,
      },
      chargingStation: {
        power: null,
        currentType: null,
      },
    },
  };
};

const initialSearchCityState = {
  loading: false,
  results: [],
  value: '',
};

const searchCityReducer = (state, action) => {
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

const selectedPointReducer = (selectedPoint = null, action) => {
  if (action.type === 'POINT_SELECTED') {
    return action.payload;
  }
  return selectedPoint;
};

const selectedCityReducer = (selectedCity = null, action) => {
  if (action.type === 'CITY_SELECTED') {
    return action.payload;
  }
  return selectedCity;
};

const mapReducer = (map = {}, action) => {
  if (action.type === 'SET_CURRENT_MAP') {
    return action.payload;
  }
  return map;
};

export default combineReducers({
  cities: citiesReducer,
  points: pointsReducer,
  user: userReducer,
  searchCity: searchCityReducer,
  selectedPoint: selectedPointReducer,
  selectedCity: selectedCityReducer,
  map: mapReducer,
});
