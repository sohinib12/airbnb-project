import React, { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { useSelector, useDispatch } from "react-redux";
import "./spots.css";
import { useHistory } from "react-router-dom";

const AllSpots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const handleSpotClick = (e, id) => {
    e.preventDefault();
    history.push(`/spots/${id}`);
  };

  // if(!spots.length) return null;
  // to show miles in all spots
  function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min) * 100;
  }

  return (
    <div className="spot-container-root">
      {spots.map((spot) => (
        <div
          onClick={(e) => handleSpotClick(e, spot.id)}
          key={spot.id}
          className="spot-container"
        >
          <div className="spot-img">
            <img
              className="image"
              src={spot.previewImage}
              alt={`spot#${spot.id}`}
            />
          </div>
          <div className="spot-info-container">
            <div className="spot-info">
              <div className="title-container">
                <span id="all-spots-name" key={spot.id}>
                  {/* {spot.name} */}
                  {spot.city.length + spot.state.length > 50
                    ? spot.state
                    : `${spot.city}, ${spot.state}`}
                </span>
              </div>
              <div className="address-for-spot" key={spot.id}>
                {`${getRandomInt(spot.id, 1)} miles away`}
              </div>
              <div key={spot.id}>
                <b>${spot.price}</b> night
              </div>
            </div>
            <div className="spot-rating">
              <span id="spot-rating" key={spot.id}>
                <i className="fas fa-star card-rating">{spot.avgRating}</i>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSpots;
