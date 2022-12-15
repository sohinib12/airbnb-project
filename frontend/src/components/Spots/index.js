import React, { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import "./spots.css";
import { useHistory } from "react-router-dom";

const AllSpots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots.allSpots);

  const spots = Object.values(spotsObj);
  const history = useHistory();
  // console.log(spots)

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);

  const handleSpotClick = (e, id) => {
    e.preventDefault();
    history.push(`/spots/${id}`);
  };

  // if(!spots.length) return null;

  return (
        <div className="spot-container-root">
          {spots.map((spot) => (
            <div onClick={(e)=> handleSpotClick(e, spot.id)} key={spot.id} className="spot-container">
              <div className="spot-img">
                <img className="image" src={spot.previewImage} alt={`spot#${spot.id}`} />
              </div>
              <div className="spot-info-container">
                <div className="spot-info">
                  <div>
                    <div className="title-container">
                      <span id="all-spots-name" key={spot.id}>{spot.name}</span>
                    </div>
                    {/* <div className="title-container" key={spot.id}>{spot.city},{spot.state}</div> */}
                    <p id="address-for-spot" key={spot.id}>{spot.city.length + spot.state.length > 50 ? spot.state : `${spot.city}, ${spot.state}`}</p>
                    <p id="price-per-night" key={spot.id}>${spot.price} night</p>
                  </div>
                </div>
                <div className="spot-rating">
                  <span id="spot-rating" key={spot.id}>
                    <i className="fas fa-star">{spot.avgRating}</i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};

export default AllSpots;

{
  /* <Link key={spot.id} to={`/spots/${spot.id}`}></Link>
</Link> */
}
