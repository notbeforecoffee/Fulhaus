import React, { useState } from "react";
import "./header.css";
import SideDrawer from "../sideDrawer/SideDrawer";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTrigger, setDrawerTrigger] = useState("drawerClosed");

  const handleToggle = () => {
    drawerOpen ? setDrawerTrigger("drawerClosed") : setDrawerTrigger("");
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <h3 className="Fulhaus">Fülhaus Shop</h3>
        <button
          className="cart_btn"
          onClick={() => {
            setDrawerOpen(!drawerOpen);
            handleToggle();
            console.log(drawerOpen, drawerTrigger);
          }}
        >
          Cart
        </button>
        <SideDrawer name={drawerTrigger} />
      </div>
    </header>
  );
};

export default Header;
