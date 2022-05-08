import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Chair from "../../assets/chair.png";
import './home.css'


const Home = () => {
  return (
    <div>
      <div className="container">
        <Header />
        <div className="background-img">
          <img className='chair' src={Chair} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
