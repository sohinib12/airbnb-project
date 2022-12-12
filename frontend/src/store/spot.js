import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE = 'spots/LOAD_ONE';
const ADD_SPOT = 'spots/ADD_ONE';
const EDIT_SPOT = 'spots/EDIT_ONE';
const DELETE_SPOT = 'spots/DELETE_ONE';

export const allSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadOneSpot = (spot) => ({
    type: LOAD_ONE,
    spot
})

export const addSpot = (spotId) => ({
    type: ADD_SPOT,
    spotId
})

export const editSpot = (spotId) => ({
    type: EDIT_SPOT,
    spotId
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

// Thunk action
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    console.log(response)
    if (response.ok) {
      const loadSpots = await response.json();
      dispatch(allSpots(loadSpots));
    }
  };

//   Reducer

const initialState = {};

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case LOAD_SPOTS: {
            const loadAllSpotsState = {}
            console.log(action)
            action.spots.Spots.forEach(spot=> {
                loadAllSpotsState[spot.id] = spot
            });
            return {
                ...state,
                ...loadAllSpotsState
            }
        }
        default:
            return state
    }
}
