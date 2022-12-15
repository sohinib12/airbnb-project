import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { editSpotThunk, getSpotDetailsThunk } from "../../store/spot";
import "./editSpot.css";

export default function EditSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errorValidations, setErrorValidations] = useState([]);
  const user = useSelector(state => state.session)
  const spot = useSelector(state => state.spots.singleSpot)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      ownerId: user.id,
      name,
      address,
      city,
      state,
      country,
      price,
      description,
      lat:112.2378,
      lng:101.9872
    };

    let editedSpot = await  dispatch(editSpotThunk(newSpot, spot.id));

    if (editedSpot) {

      history.push(`/spots/${spotId}`);
    }
  };
  // set the form with spot previous details
  useEffect(() => {
    if(Object.keys(spot).length > 0){
      const { name, address, city, state, country, price, description} = spot
      setName(name);
      setAddress(address)
      setCity(city)
      setState(state)
      setCountry(country)
      setPrice(price)
      setDescription(description)
    }
    // add spot dependency here so that whenever data is fetched you can update your form
  },[spot]);

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  //write errors
  useEffect(() => {

    const errors = []
    if(name?.length === 0) errors.push("Please enter a name")
        if(address?.length === 0) errors.push("Please enter an address")
        if(city?.length === 0) errors.push("Please enter a city")
        if(state?.length === 0) errors.push("Please enter a state")
        if(country?.length === 0) errors.push("Please enter a country")
        if(price <= 0) errors.push("Please enter a price")
        if(description?.length === 0) errors.push("Please enter a description")

        setErrorValidations(errors)
  },[name, address, city, state, country, price, description]);

  return (
    <div className="edit-spot-root">
      <div className="welcome-container">
        <h1>Edit your place</h1>
      </div>
      <div id="host-forms">
        <ul>
          {errorValidations.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <form className="spot-form" onSubmit={handleSubmit}>
          <label>
            <input
              maxLength="25"
              type="text"
              placeholder="Spot Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Address"
              maxLength="50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="City"
              maxLength="50"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Country"
              maxLength="50"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Description"
              maxLength="100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button
              className="submit"
              disabled={errorValidations.length > 0}
              type="submit"
            >
              Edit
            </button>
            <Link id="cancel-host-form" exact to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}