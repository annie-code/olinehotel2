import React,{useEffect} from "react";
import "./App.css";
import homeImage from "./assets/home.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import {Link, useHistory } from "react-router-dom";


function UserHistory() {
  let history = useHistory()
  const [userRoomList, setReservationInfo] = useState([]);
 
  useEffect(()=>{
    let customerId = sessionStorage.getItem("CustomerId");
    fetch('https://localhost:44348/api/reservations/'+customerId)
      .then(res => res.json())
      .then(data => setReservationInfo(data))
   },[]);
  
    const deleteRoom = (RoomId)=>{
      fetch('https://localhost:44348/api/reservations'+`/${RoomId}`,{method:"DELETE"})
          .then(res => res.json())
          .then(res =>
            { window.location.reload()
        }
      )
          
    };
    return (
      <div className="d-flex flex-row">
        <div className="mt-1 mb-4">
        <div className="bookBtn">
          <Link to={"/hotelList"} className="btn btn-primary">Book Room</Link>
        </div>
        { userRoomList.map((user) => {

        return (
          <div className="flex">
            <div class="card">
            <div className="image" ></div>
              <div class="card-body">
              <p>{"RoomId:" +user?.RoomId}</p>
                <p>{"CheckIn: " +user?.CheckIn}</p>
                <p>{"CheckOut: " +user?.CheckOut}</p>
                <button type="button" onClick={()=>deleteRoom(user.ReservationId)} class="btn btn-primary">Cancel Booking</button>
              </div>
            </div>
          </div>
       
        );
      })}
    </div>
  </div>
)};
export default UserHistory;
