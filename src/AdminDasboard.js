import React,{useEffect} from "react";
import "./App.css";
import homeImage from "./assets/home.jpeg";
import roomImage from "./assets/room.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AdminDashboard() {
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

  const editInfo = (roomInfo)=>{
    console.log(roomInfo);
    history.push("/Room?RoomNumber="+roomInfo.RoomNumber+"&&RoomCapacity="+roomInfo.RoomCapacity+"&&FloorNumber="+roomInfo.FloorNumber+"&&CostPerDay="+roomInfo.CostPerDay+"&&RoomType="+roomInfo.RoomType+"&&RoomStatus="+roomInfo.RoomStatus+"&&RoomId="+roomInfo.RoomId);
    //console.log(hotelListData);
  }
  const editHotelInfo = (hotelInfo)=>{
    console.log(hotelInfo);
    history.push("/Hotel?HotelName="+hotelInfo.HotelName+"&&HotelAddress="+hotelInfo.HotelAddress+"&&City="+hotelInfo.City+"&&State="+hotelInfo.State+"&&Pincode="+hotelInfo.PinCode+"&&IsActive="+hotelInfo.IsActive+"&&HotelId="+hotelInfo.HotelId);
    //console.log(hotelListData);
  }


  const deleteRoom = (RoomId)=>{
    console.log(RoomId);
    fetch('https://localhost:44348/api/rooms'+`/${RoomId}`,{method:"DELETE"})
        .then(res => res.json())
        .then(res =>
          { window.location.reload()
      }
    )
        
  };
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
      <div className="mt-1 mb-4" align="center">
      </div>
      <div className="addHotelBtn">
      <Link to = "/Hotel" className="btn btn-primary">Add Hotel</Link>
      </div>
      <div className="c">
        {hotelListData?.isRoom ? (
          <div>
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
                <button className="btn-primary" onClick={()=>deleteRoom(room.RoomId)}>
                  Delete Room
                </button>
                <button onClick={()=>editInfo(room)}>
                      Edit Room
                    </button>
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
                  <button onClick={()=>editHotelInfo(getHotel)}className="btn-primary">
                      Edit Hotel
                    </button>
                    <br></br>
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
                      View Rooms
                    </button>
                    <br></br><Link to={{pathname:"/Room",search: `HotelId=${getHotel.HotelId}`}} className="btn btn-primary">Add Room</Link>                    
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;


