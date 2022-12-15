import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsThunk, deleteReviewThunk } from "../../store/review";
// import { getSpotDetailsThunk } from "../../store/spot";
import "./reviews.css";
import ReviewUser from "./reviewUser";
import AddReview from "./addReview";

export default function Reviews({ spotId }) {
  const dispatch = useDispatch();
  // const spot = useSelector((state)=>state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spotReviews) || {};
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(1);
  const [errorValidations, setErrorValidations] = useState([]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
    // dispatch(getSpotDetailsThunk(spotId))
    // console.log(spot)
  }, [dispatch, spotId]);

  useEffect(() => {
    const errors = [];
    if (rating > 5 || rating < 1)
      errors.push("rating should be between 1 and 5");
    if (body.length === 0) errors.push("please provide a review ");

    setErrorValidations(errors);
  }, [rating, body]);

  const handleDelete = (e, reviewId) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));
    dispatch(getAllReviewsThunk(spotId));
  };
  const handleEdit = (e) => {
    e.preventDefault();
    // history.push(`/spots/${spotId}/edit`);
  };

  const displayReviews = Object.keys(reviews).length;

  return (
    <div className="review-container">
      <AddReview spotId={spotId} />

      <div>
        {displayReviews &&
          Object.values(reviews).map((review) => (
            <div key={review.id} className="review-box">
              <div className="review-user">
                <ReviewUser user={review.User} />
              </div>
              <div className="review">
                <div>{review.review}</div>
                <div>
                  {Array.from(Array(review.stars).keys()).map((index) => (
                    <i key={index} className="fas fa-star rating-color"></i>
                  ))}
                </div>
              </div>
              <div>
                <button onClick={(e) => handleEdit(e)}>Edit</button>
                <button onClick={(e) => handleDelete(e, review.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
