import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../LoginFormModal/LoginForm.css";
import { addReviewThunk } from "../../store/review";

export default function AddReviewModal({ spotId, handleAddReview }) {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

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
        closeModal()
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
    <div className="login-container">
      <h2 style={{ textAlign: "center" }}>Review</h2>
      <div className="border-div"></div>
      <div style={{ margin: " 0 auto", padding: "0 20px" }}>
        <form className="form-container" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
          <div className="login-input-container">
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
          </div>
          <button className="login-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
