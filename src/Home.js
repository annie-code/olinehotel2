import React from "react";
import "./App.css";
import App from "./App"
import homeImage from "./assets/hotel.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
   
    
    <div className="parent bg-dark">
      <div className="im">
        <img src={homeImage}></img>
        <div className="first-text">Welcome To Hotel Room Reservation System</div>
      </div>
      
    </div>
  
  );
}

export default Home;
