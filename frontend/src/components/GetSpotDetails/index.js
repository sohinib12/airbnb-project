import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetailsThunk, deleteSpotThunk } from "../../store/spot";
import "./GetSpotDetails.css";
import reviewsReducer, { getAllReviewsThunk } from "../../store/review";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId))
    dispatch(getAllReviewsThunk(spotId))
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
  const displayImages = spot.SpotImages && spot.SpotImages.length > 0;

  if(!spot.id) return null;
  return (
    <div className="spot-details">
      <div className="spot-name">{spot.name}</div>
      <div className="address-spot">
        <div className="address-details">
          <div id="rating-above-picture">
            <i class="fas fa-star"></i> {spot.avgRating}
          </div>
          <div>{spot.reviews}</div>
          <div>{spot.address}</div>
          <div>{spot.city}</div>
          <div>{spot.state}</div>
          <div>{spot.country}</div>
        </div>
        <div className="address-details">
          <button onClick={(e) => handleEdit(e)}>
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={(e) => handleDelete(e)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
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
    </div>
  );
}
