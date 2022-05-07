import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Store from './Store'
// import Toolbar from "../testComponents/Toolbar";
// import SideDrawer from "../testComponents/sideDrawer/SideDrawer";
// import Backdrop from "../testComponents/backdrop/Backdrop";

const Home = () => {
  return (
    <div>
      <div className="container">
        <Header />
        <div className="background-img">picture goes here</div>
        <Footer />
      </div>
      <Store />
    </div>
  );
};

export default Home;
