import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk, getAllReviewsThunk } from "../../store/review";

export default function AddReview({ spotId }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { review: reviewText, stars: rating };
    dispatch(addReviewThunk(data, spotId));
    dispatch(getAllReviewsThunk(spotId));
    setReviewText("");
    setRating(1);
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
        <select  onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {/* <input
          placeholder="Enter Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="add-rating-input"
        ></input> */}
        <button className="add-review-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
