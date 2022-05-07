import React from "react";
import "./toolbar.css";
import DrawerToggleButton from "./sideDrawer/DrawerToggleButton";

const Toolbar = (props) => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div>
        <DrawerToggleButton />
      </div>
      <div className="toolbar_logo">
        <a href="/">THE LOGO </a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation_items">
        <ul>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/">Users</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
