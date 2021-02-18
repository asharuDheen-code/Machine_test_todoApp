import React from "react";
import { Link, Router } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>
  );
}

export default Header;
