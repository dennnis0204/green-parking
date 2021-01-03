import parkingFuture from '../apis/parkingFuture';

export const fetchCities = () => async (dispatch) => {
  const response = await parkingFuture.get('/cities').catch((error) => {
    if (error) {
      return { data: [] };
    }
  });
  dispatch({ type: 'FETCH_CITIES', payload: response.data });
};

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

export const cleanQuery = () => {
  return {
    type: 'CLEAN_QUERY',
  };
};

export const startSearch = (query) => {
  return {
    type: 'START_SEARCH',
    payload: query,
  };
};

export const finishSearch = (results) => {
  return {
    type: 'FINISH_SEARCH',
    payload: results,
  };
};

export const updateSelection = (title) => {
  return {
    type: 'UPDATE_SELECTION',
    payload: title,
  };
};

export const setCurrentMap = (map) => {
  return {
    type: 'SET_CURRENT_MAP',
    payload: map,
  };
};
