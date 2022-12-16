import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "review/GET_ALL_REVIEWS";
const ADD_ONE_REVIEW = "review/ADD_ONE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

// actions
export const getAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  reviews,
});

export const addReview = (review) => ({
  type: ADD_ONE_REVIEW,
  review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});

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
    // dispatch(addReview(data));
    return data;
  }
  else{
    return {}
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId))
  }
};

// Reducer
const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const spotReviews = {};
      action.reviews.Reviews.forEach((review) => {
        spotReviews[review.id] = review;
      });
      return {
        spotReviews,
      };
    }
    case ADD_ONE_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review,
      }
    case DELETE_REVIEW: {
      const newState = {
        ...state,
      }
      delete newState.spotReviews[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
}
