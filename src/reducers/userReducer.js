const initialState = {
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
      typeOfCurrent: null,
    },
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_OR_UPDATE_USER_POINT':
      return { ...state, point: action.payload };
    default:
      return state;
  }
};

export default userReducer;
