import React from "react";

const Header = () => {
  return (
    <div
      className="container-fluid d-flex flex-row justify-content-between h-10 p-3"
      style={{ backgroundColor: "var(--rp-dark-blue)" }}
    >
      <div>
        <h3 style={{ color: "var(--rp-white)" }}>
          Reward<span style={{ color: "var(--rp-grey)" }}>Pay</span>
        </h3>
      </div>
      <div>
        <h3 style={{ color: "var(--rp-white)" }}>Account Statement</h3>
      </div>
    </div>
  );
};

export default Header;
