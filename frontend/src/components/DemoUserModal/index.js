import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DemoUser.css";

function DemoUserModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("Demo-lition");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="demo-container">
      <h1 style={{ marginBottom: 0 }}>Log In</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-button">
          <button className="login-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default DemoUserModal;
