import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function ProfileButton({ user, handleLogin, handleSignup, demoUser }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const login_user = useSelector((state) => state?.session?.user);

  const openMenu = () => {
    // if (showMenu) return;
    //close the dropdown button
    setShowMenu((prev)=> !prev);
  };
  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="container-profile">
      <button onClick={openMenu} className="profile-btn">
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="list--profile-dropdown">
          {!login_user ? (
            <>
              <li
                className="button--dropdown-item button--dropdown-item-user-data"
                onClick={(e) => {
                  closeMenu();
                  handleLogin(e);
                }}
              >
                Log in
              </li>
              <li
                className="button--dropdown-item button--dropdown-item-user-data"
                onClick={(e) => {
                  closeMenu();
                  handleSignup(e);
                }}
              >
                Sign Up
              </li>
              <li
                className="button--dropdown-item button--dropdown-item-user-data"
                onClick={(e) => {
                  closeMenu();
                  demoUser(e);
                }}
              >
                Demo User
              </li>
            </>
          ) : (
            <div>
              <div className="login-user">Logged in : {login_user.username}</div>
              <li
                className="button--dropdown-item button--dropdown-item-user-data"
                onClick={(e) => {
                  closeMenu();
                  logout(e);
                }}
              >
                Logout
              </li>
            </div>
          )}

          {/* <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Demo User"
              onItemClick={closeMenu}
              modalComponent={<DemoButton />}
            /> */}
        </ul>
      )}

      {/* <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Demo User"
              onItemClick={closeMenu}
              modalComponent={<DemoButton />}
            />
          </>
        )}
      </ul> */}
    </div>
  );
}

export default ProfileButton;
