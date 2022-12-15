import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-root">
      <div className="nav-one">
        {/* <i className="fa-thin fa-mountain-city"></i> */}
        <NavLink exact to="/">
          <img className="nav-home-img"
            src={process.env.PUBLIC_URL + '/cabin.png'}
            alt="Home"
          ></img>
        </NavLink>
        <span className="title">Yawnbnb</span>
      </div>
      <div className="nav-two"></div>
      <div className="nav-three">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
