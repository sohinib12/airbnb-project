import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk, getAllReviewsThunk } from "../../store/review";

export default function AddReview({ spotId }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("calling add review");
    const data = { review: reviewText, stars: rating };
    dispatch(addReviewThunk(data, spotId));
    dispatch(getAllReviewsThunk(spotId));
    setReviewText("");
    setRating("");
  };

  return (
    <form className="add-review-form" onSubmit={(e) => handleSubmit(e)}>
      <h4>Enter Your Review</h4>
      <div className="review-actions">
        <textarea
          rows="3"
          cols="3"
          placeholder="Enter Review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <input
          placeholder="Enter Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="add-rating-input"
        ></input>
        <button className="add-review-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
