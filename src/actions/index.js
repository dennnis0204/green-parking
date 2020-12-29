// Action creator
export const selectPoint = (point) => {
  // Return an action
  return {
    type: 'POINT_SELECTED',
    payload: point,
  };
};

export const selectCity = (city) => {
  return {
    type: 'CITY_SELECTED',
    payload: city,
  };
};

export const setCurrentMap = (map) => {
  return {
    type: 'SET_CURRENT_MAP',
    payload: map,
  };
};
