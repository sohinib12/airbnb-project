import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, useModal } from "../../context/Modal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUserModal from "../DemoUserModal/index";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state?.session?.user);
  const history = useHistory();

  const handleLogin = (e) => {
    setModalContent(<LoginFormModal />);
  };
  const handleSignup = (e) => {
    setModalContent(<SignupFormModal />);
  };
  const demoUser = (e) => {
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password1" })
    );
  };

  const createSpot = (e) => {
    e.preventDefault();
    if (!user) {
      alert("log in to create a spot!");
    } else {
      history.push("/spots/create");
    }
  };


  return (
    <div className="nav-root">
      <div className="nav-one">
        {/* <i className="fa-thin fa-mountain-city"></i> */}
        <NavLink exact to="/">
          <img
            className="nav-home-img"
            src={process.env.PUBLIC_URL + "/cabin.png"}
            alt="Home"
          ></img>
        </NavLink>
        <span className="title">Yawnbnb</span>
      </div>
      <div className="nav-two">
        <button className="button-create-spot" onClick={(e) => createSpot(e)}>
          Enter your listing
        </button>
      </div>

      <div className="nav-three">
        {isLoaded && (
          <ProfileButton
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            demoUser={demoUser}
          />
        )}
        {/* {showModal && (
          <Modal
            onClose={() => {
              reset();
              setShowModal(false);

            }}
          >
            {loginDisplay && (<LoginFormModal />)}
            {signUpDisplay && (<SignupFormModal />)}
            {demoDisplay && (<DemoUserModal />)}
          </Modal>
        )} */}
      </div>
    </div>
  );
}

export default Navigation;
