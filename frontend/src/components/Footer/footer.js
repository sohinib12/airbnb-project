import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="leftside-footer">Airbnb clone by Sohini Bonthala</div>
      <div className="rightside-footer">
        <a className="link-footer" href="https://www.linkedin.com/in/sohini-bonthala-9373b2111/">
          <i className="fa-brands fa-linkedin fa-xl" href="https://github.com/sohinib12/airbnb-project"/>
        </a>
        <a className="link-footer">
          <i className="fa-brands fa-github fa-xl" />
        </a>
      </div>
    </footer>
  );
}
