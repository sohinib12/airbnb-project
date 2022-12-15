import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "review/GET_ALL_REVIEWS";
const ADD_ONE_REVIEW = "review/ADD_ONE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

// actions
export const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

export const addReview = (review) => ({
    type: ADD_ONE_REVIEW,
    review
})

export const deleteReview = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    reviewId,
    spotId
})

// thunk
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(getAllReviews(reviews));
      return reviews;
    }
};

export const addReviewThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(getAllReviews(data))
      dispatch(addReview(data));
      return data;
    } else {
        const {res} = await response.json();
        return res;
    }
  };


export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteReview(reviewId, spotId))
    }else {
        const {res} = await response.json();
        return res;
    }
};

// Reducer
const initialState = {};

export default function reviewsReducer( state = initialState, action){
    switch(action.type) {
        case GET_ALL_REVIEWS: {
            const loadAllReviews = {};
            action.reviews.Review.forEach(review => {
                loadAllReviews[review.id] = review
            });
            return {
                loadAllReviews
            }
        }
        // case ADD_ONE_REVIEW {

        // }
        // case DELETE_REVIEW {

        // }
        default:
            return state
    }
}
