import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE';
const EDIT_SPOT = 'spots/EDIT_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';

// Action creators
export const allSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

export const getSpotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    spot
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const addSpotImage = (data) => ({
    type: ADD_SPOT_IMAGE,
    data
})

export const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

// Thunk action
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    // console.log(response)
    if (response.ok) {
      const loadSpots = await response.json();
      //pass the value from db
      dispatch(allSpots(loadSpots));
      return loadSpots
    }
  };

  export const getSpotDetailsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
      const spot = await response.json();
      dispatch(allSpots(spot));
      return spot
    }
  };

  export const createSpotThunk = (data)  => async (dispatch) => {
    const response = await fetch(`/api/spots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
      const spot = await response.json();
      dispatch(allSpots(spot));
      return spot
    }
  };

  export const addSpotImageThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const response= await response.json();
        dispatch(addSpotImage(response));
        return response;
    }
  };

  export const editSpotThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newData = await response.json();
        dispatch(editSpot(newData));
        return newData;
    }
  };

  export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(spot));
        return spot;
  };
}

//   Reducer
const initialState = {};

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const loadAllSpotsState = {}
            // console.log(action)
            action.spots.Spots.forEach(spot=> {
                loadAllSpotsState[spot.id] = spot
            });
            return {
                ...state,
                ...loadAllSpotsState
            }
        }
        case GET_SPOT_DETAILS: {

        }
        case CREATE_SPOT: {

        }
        case ADD_SPOT_IMAGE: {

        }
        case EDIT_SPOT: {

        }
        case DELETE_SPOT: {

        }
        default:
            return state
    }
}
