import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetailsThunk, deleteSpotThunk } from "../../store/spot";
import "./GetSpotDetails.css";
import { getAllReviewsThunk } from "../../store/review";
import Reviews from "../Reviews/index";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const user = useSelector((state) => state.session);
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId));
    history.push(`/`);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };

  const handleUpdateReviews = () => {
    dispatch(getSpotDetailsThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  };

  const displayImages = spot.SpotImages && spot.SpotImages.length > 0;

  if (!spot.id) return null;

  return (
    <div className="spot-details">
      <div className="spot-name">{spot.name}</div>
      <div className="address-spot">
        <div className="address-details">
          <div id="rating-above-picture">
            <i className="fas fa-star"></i> {spot.avgStarRating}
          </div>
          <div>{spot.numReviews} reviews</div>
          <div>{spot.reviews}</div>
          <div>{spot.address}</div>
          <div>{spot.city}</div>
          <div>{spot.state}</div>
          <div>{spot.country}</div>
        </div>
        {spot.User.id === user.user?.id && (
          <div className="address-details">
            <button
              onClick={(e) => handleEdit(e)}
              className="spot-edit-delete-button"
            >
              {/* <i className="fas fa-edit"></i> */}
              <i class="fa-solid fa-user-pen"></i>
            </button>
            <button
              onClick={(e) => handleDelete(e)}
              className="spot-edit-delete-button"
            >
              {/* <i className="fas fa-trash"></i> */}
              {/* <i className="fa-solid fa-trash-can-check"></i> */}
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      {displayImages && (
        <div className="spot-images">
          <div>
            <img
              className="image-div-one-spot"
              src={spot.SpotImages[0].url}
              alt=""
            />
          </div>
          <div className="spot-secondary-images-container">
            {spot.SpotImages.map((image, index) => {
              const key = `spot-image-${image.id}`;
              return (
                index !== 0 &&
                index < 5 && (
                  <img
                    key={key}
                    className="spot-secondary-image"
                    src={image.url}
                    alt=""
                  />
                )
              );
            })}
            {/* TODO Add show more button*/}
            {/* {spot.SpotImages.length > 4 && <button>Show more</button>} */}
          </div>
        </div>
      )}
      <br />
      <div className="flex">
        <div style={{ width: "70%" }}>
          <div className="flex">
            <div className="host-details-spot-info">
              <div>{`Entire place hosted by ${spot.User.firstName} ${spot.User.lastName}`}</div>
              <div className="bed-bath-details">
                <span> 4 guests</span>
                <span> 3 bedrooms</span>
                <span> 2 bed</span>
                <span> 2 bath</span>
              </div>
            </div>
            <div className="host-info">
              <div className="owner-pic">
                <i class="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
          <hr />
          <div className="location-container">
            <div className="airbnb-amenities-info-image">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="location-info">
              <div className="location-info-title">
                {`${spot.User.firstName} is a Superhost`}
              </div>
              <div className="location-info-description">
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </div>
            </div>
          </div>

          <div className="checkin-container">
            <div className="airbnb-amenities-info-image">
              <i className="fa-solid fa-door-open fa-xl"></i>
            </div>
            <div className="checkin-info">
              <div className="checkin-title">{"Self check-in"}</div>
              <div className="checkin-info-description">
                {"Check yourself in with the Code"}
              </div>
            </div>
          </div>

          <div className="cancel-container">
            <div className="airbnb-amenities-info-image">
              <i className="fa-regular fa-calendar fa-xl"></i>
            </div>
            <div className="cancel-info">
              <div className="cancel-title">
                {"Free Cancellation for 48 hours"}
              </div>
            </div>
          </div>
          <hr />

          <div className="aircover-title-image">
            <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" />
          </div>

          <div className="aircover-info">
            Every booking includes free protection from Host cancellations,
            listing inaccuracies, and other issues like trouble checking in.
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <div className="price-rating-side-box">
            <div className="spot-description-price">{`$${spot.price} night`}</div>

            <div className="spot-details-rating">
              <i class="fas fa-star rating-color"></i>
              {!spot.avgStarRating ? "" : spot.avgStarRating}
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <div>
        <h3>Reviews</h3>
        <Reviews spotId={spotId} handleUpdateReviews={handleUpdateReviews} />
      </div>
    </div>
  );
}
