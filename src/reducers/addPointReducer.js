const initialState = {
  isAddPointPortalOpen: false,
  selectedPoint: {},
};

const addPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOOGLE_ADD_POINT_PORTAL':
      return { ...state, isAddPointPortalOpen: action.payload };
    case 'POINT_SELECTED':
      return { ...state, selectedPoint: action.payload };
    default:
      return state;
  }
};

export default addPointReducer;
