import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk, getAllReviewsThunk } from "../../store/review";

export default function AddReview({ spotId, handleAddReview }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    if(reviewText === ""){
      setErrors(["Please enter Review"]);
      return;
    }

    if(errors.length > 0)setErrors([])
    const data = { review: reviewText, stars: rating };
    return dispatch(addReviewThunk(data, spotId))
      .then(() => {
        // dispatch(getAllReviewsThunk(spotId));
        setReviewText("");
        setRating(1);
        handleAddReview();
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log(data);
        const { message } = data;
        setErrors([message]);
        // console.log(message)
      });
  };

  return (
    <form className="add-review-form" onSubmit={(e) => handleSubmit(e)}>
      <h4>Enter Your Review</h4>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div className="review-actions">
        <textarea
          rows="3"
          cols="3"
          placeholder="Enter Review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <select onChange={(e) => setRating(e.target.value)}>
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
