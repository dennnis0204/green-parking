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

export const toogleAddPointPortal = (isAddPointPortalOpen) => {
  return {
    type: 'TOOGLE_ADD_POINT_PORTAL',
    payload: isAddPointPortalOpen,
  };
};

export const saveOrUpdateUserPoint = (point) => {
  return {
    type: 'SAVE_OR_UPDATE_USER_POINT',
    payload: point,
  };
};
