import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className="header">
      <div className={classes["header-center"]}>
        <h2>Home</h2>
      </div>
    </header>
  );
};

export default Header;
