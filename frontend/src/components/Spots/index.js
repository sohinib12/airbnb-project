import React, { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AllSpots = () => {
    const dispatch = useDispatch()

    const spotsObj = useSelector(state =>state.allSpots)
    const spots = Object.values(spotsObj)
    // console.log(spots)

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

//   if(!allSpots.length) return null;

  return (
    <div>
      {spots.map((spot) => (
        <Link
        key={spot.id}
        to={`/spots/${spot.id}`}>
          <div
            style={{ width: "200px", height: "200px" }}>
            <div>{spot.name}</div>
            <div>{spot.address}</div>
            <div>{spot.city}</div>
            <div>{spot.country}</div>
            <div>{spot.avgRating}</div>
            <div>{spot.price}</div>
            <div>{spot.state}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllSpots;
