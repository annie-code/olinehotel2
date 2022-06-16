import React,{useEffect} from "react";
import "./App.css";
import homeImage from "./assets/home.jpeg";
import roomImage from "./assets/room.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

function Home() {
    const [hotelInfo, setHotelInfo] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);
    let history = useHistory();
    useEffect(()=>{
    fetch('https://localhost:44348/api/hotels')
      .then(res => res.json())
      .then(data => setHotelInfo(data));
    fetch('https://localhost:44348/api/rooms')
      .then(res => res.json())
      .then(data => setRoomInfo(data));
   },[]);

  const initialData = {
    isRoom: false,
    roomId: "",
    showMsg: false,
  };

  const [hotelListData, SetHotelListData] = useState(initialData);
 
  let selectedRoom=[];
  for(let rooms of roomInfo){
      for(let roo of rooms.Hotel){
          if(roo.HotelId===hotelListData?.roomId){
              selectedRoom.push(rooms);
          }
      }
  }

  const bookRoom = (RoomId)=>{

    fetch('https://localhost:44348/api/reservations', {  
      method: 'post',  
      headers: { 
        'Accept': 'application/jsnpm on',  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({    
      CheckIn:hotelListData.startDate,
      CheckOut:hotelListData.endDate,
      CustomerId:sessionStorage.getItem("CustomerId"),
      RoomId:RoomId
      })  
    }).then((response) =>{
        if (response.status === 201)  
          alert("Successfully Booked Room");
        });
  } 
  const setData = (event) => {
    console.log("value", event.target.value);
    const updatedData = {
      ...hotelListData,
      [event.target.name]: event.target.value,
    };
    SetHotelListData(updatedData);
  };

  return (  
    <div className="container-lm ">     
      <div className="c">        
        {hotelListData?.isRoom ? (
          <div>
            <div className="mt-1 mb-4">
            <Link to={"/userHistory"} className="btn btn-primary">Booking History</Link>
            <br></br><br></br>
             <TextField
                type="date"
                id="start"
                name="startDate"
                label ="Select CheckIn Date :"
                min="2022-02-16"
                value={hotelListData["startDate"]}
                onChange={setData}
                InputLabelProps = {{
                  shrink: true,
                  
                }}
                
              />
              <TextField
                type="date"
                id="start"
                name="endDate"
                label ="Select CheckOut Date :"
                min="2022-02-16"
                value={hotelListData["endDate"]}
                onChange={setData}
                InputLabelProps = {{
                  shrink: true,
                }}
              />
            </div>
            
            {selectedRoom.map((room)=>{
              return (
                <div className="flex">
              <div className="imageStyle">
                <div className="roomImage fw-bold"></div>
                <p>{"Room Number  : " + room.RoomNumber}</p>
                <p>{"Floor Number  : " + room.FloorNumber}</p>
                <p>{"Room Capacity  : " + room.RoomCapacity}</p>
                <p>{"Room Type  : " + room.RoomType}</p>
                <p>{"Cost Per Day  : " + "Rs. "+ room.CostPerDay}</p>
                <p>{"Room Status  : " + room.RoomStatus}</p>
                <button
                disabled={room.RoomStatus === 'Unavailable'}
                  className="btn-primary"
                  onClick={() => {
                   bookRoom(room.RoomId);
                  }}
                >
                  Book Room
                </button>
                {hotelListData?.showMsg && <p> successfully booked the room</p>}
              </div>
            </div>
              )
            })}
          </div>
        ) : (
          hotelInfo?.map((getHotel) => {
            return (
              <div className="flex">
                <div className="card">
                  <div className="image"></div>
                  <p>{"Hotel Name  : " + getHotel.HotelName}</p>
                  <p>{"Hotel Address  : " + getHotel.HotelAddress}</p>
                  <p>{"Hotel State  : " + getHotel.State}</p>
                  <p>{"Hotel City  : " + getHotel.City}</p>
                  <p>{"PinCode  : " + getHotel.PinCode}</p>
                  <p>{"Status  : " + getHotel.IsActive}</p>
                    <button
                    disabled={getHotel.IsActive === 'Unavailable'}
                      className="btn-primary"
                      onClick={() => {
                        console.log("is id", hotelListData);
                        SetHotelListData({
                          ...hotelListData,
                          ["isRoom"]: true,
                          ["roomId"]: getHotel.HotelId,
                        });
                      }}
                    >
                      Book Room
                    </button>
                    
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
