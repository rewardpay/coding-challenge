import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div
      className={`${styles.footer} d-flex justify-content-end align-items-center px-3`}
    >
      <a href="https://github.com/diego-scarpati" target="_blank">
        GitHub
      </a>
    </div>
  );
};

export default Footer;
