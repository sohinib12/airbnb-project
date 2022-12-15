import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SPOT_DETAILS = "spots/GET_SPOT_DETAILS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE";
const DELETE_SPOT = "spots/DELETE_SPOT";

// Action creators
export const loadAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

export const getSpotDetails = (spot) => ({
  type: GET_SPOT_DETAILS,
  spot,
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const addSpotImage = (image) => ({
  type: ADD_SPOT_IMAGE,
  image,

});

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

// Thunk action
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  // console.log(response)
  if (response.ok) {
    const loadSpots = await response.json();
    //pass the value from db
    dispatch(loadAllSpots(loadSpots));
    return loadSpots;
  }
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpotDetails(spot));
    return spot;
  }
};

export const createSpotThunk = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
};

export const addSpotImageThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addSpotImage(data));
    return data;
  }
};

export const editSpotThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const editedSpot = await response.json();
    dispatch(createSpot(editedSpot));
    return editedSpot;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(deleteSpot(spot));
    return spot;
  }
};

//   Reducer
const initialState = {
  allSpots: {},
  singleSpot: {},
};

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
      case GET_ALL_SPOTS: {
          const loadAllSpotsState = {};
      // console.log(action)
      action.spots.Spots.forEach((spot) => {
        loadAllSpotsState[spot.id] = spot;
      });
      return {
          ...state,
          allSpots: loadAllSpotsState,
          // singleSpot: {}
        };
    }
    case GET_SPOT_DETAILS:
      return {
        ...state,
        singleSpot: action.spot,
      };
    case CREATE_SPOT:
      console.log("action:", action);
      return {
        ...state,
        [action.spot.id]: action.spot,
      };
    case ADD_SPOT_IMAGE:
    return {
        ...state,
        [action.image.id]: {
            ...action.image,
            previewImage: action.image.url
        }
    }
    case DELETE_SPOT:
    const newState = {
            ...state}
    delete newState.allSpots[action.spotId]
    return newState
    default:
      return state;
  }
}
