import { combineReducers } from 'redux';

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
  points: pointsReducer,
  selectedPoint: selectedPointReducer,
  selectedCity: selectedCityReducer,
  map: mapReducer,
});
