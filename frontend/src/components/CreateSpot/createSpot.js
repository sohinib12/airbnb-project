import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { addSpotImageThunk, createSpotThunk } from "../../store/spot";
import "./createSpot.css";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errorValidations, setErrorValidations] = useState([]);
  const user = useSelector((state) => state?.session?.user);

  if (!user) {
    alert("log in to create a spot!");
    // history.push("/spots")
  }
  console.log("user", user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = {
      ownerId: user,
      name,
      address,
      city,
      state,
      country,
      price,
      description,
      lat: 112.2378,
      lng: 101.9872,
    };
    let createdSpot = await dispatch(createSpotThunk(newSpot));

    if (createdSpot && imageUrl) {
      const image = {
        url: imageUrl,
        preview: true,
      };

      await dispatch(addSpotImageThunk(image, createdSpot.id));
      const id = createdSpot.id;
      history.push(`/spots/${id}`);
    }
  };
  //write errors
  useEffect(() => {
    const errors = [];
    if (name?.length === 0) errors.push("Please enter a name");
    if (address?.length === 0) errors.push("Please enter an address");
    if (city?.length === 0) errors.push("Please enter a city");
    if (state?.length === 0) errors.push("Please enter a state");
    if (country?.length === 0) errors.push("Please enter a country");
    if (price <= 0) errors.push("Please enter a price");
    if (description?.length === 0) errors.push("Please enter a description");

    setErrorValidations(errors);
  }, [name, address, city, state, country, price, description]);

  const cancel = (e) => {
    e.preventDefault();
    history.push(`/spots`);
  };

  return (
    <div style={{ width: "600px" }}>
      <h1 className="welcome-container">Host your Experience</h1>
      <div className="create-spot-root">
        <div id="host-forms">
          <ul className="error-li">
            {errorValidations.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>

            <form className="spot-form" onSubmit={handleSubmit}>
              <input
                maxLength="25"
                type="text"
                placeholder="Spot Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="create-spot-input"
              />

              <input
                type="text"
                placeholder="Address"
                maxLength="50"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="create-spot-input"
              />

              <input
                type="text"
                placeholder="City"
                maxLength="50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="create-spot-input"
              />

              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="create-spot-input"
              />

              <input
                type="text"
                placeholder="Country"
                maxLength="50"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="create-spot-input"
              />

              <input
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="create-spot-input"
                type="number"
                min="1"
                max="50000"
              />

              <input
                type="url"
                placeholder="Image url"
                value={imageUrl}
                onChange={(e) => {
                  e.preventDefault();
                  setImageUrl(e.target.value);
                }}
                className="create-spot-input"
              />

              <input
                type="text"
                placeholder="Description"
                maxLength="100"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="create-spot-input"
              />
              <div className="form-actions">
                <button
                  className="cancel-edit-button"
                  onClick={(e) => cancel(e)}
                >
                  Cancel
                </button>
                <button
                  className="create-btn"
                  disabled={errorValidations.length > 0}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
