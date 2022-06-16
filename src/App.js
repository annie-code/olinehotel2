import React,{useEffect} from 'react';  
import './App.css';  
import Reg from './Reg';
import AdminLogin from './AdminLogin';
import AdminDasboard from './AdminDasboard';
import Hotel from './Hotel';
import Room from './Room';
import Home from './Home';
import UserHistory from './UserHistory';
import hotelList from './hotelList';
import UserLogin from './UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import {useHistory} from "react-router-dom"; 

function App() { 
  let history = useHistory();
  console.log(history,"history");
  let id = (sessionStorage.getItem("CustomerId") || sessionStorage.getItem("AdminId"));
  console.log(id,"after login id");
  const onLogout=()=>{
    sessionStorage.clear();
    window.location.reload();
  }
  return ( 
    <Router>    
      <div className="container-lm">
        <nav className="navbar navbar-expand-lg navheader">    
          <div className="collapse navbar-collapse" >    
          <h4><span>Online Hotel Room Reservation System</span></h4>
            <ul className="navbar-nav ms-auto fw-bold"> 
            <li className="nav-item">    
                <Link to={'/UserHistory?CustomerId=1'} className="nav-link text-dark"></Link>    
            </li>
            <li className="nav-item">    
                <Link to={'/Room'} className="nav-link text-dark"><h5>Customer</h5></Link>    
            </li>  
            <li className="nav-item">    
                <Link to={'/'} className="nav-link text-dark"><h5>Home</h5></Link>    
            </li>  
            {!id&&<li className="nav-item">    
                <Link to={'/Reg'} className="nav-link text-dark"><h5>Register</h5></Link>    
            </li>}
            {!id&&<li className="nav-item">    
                <Link to={'/UserLogin'} className="nav-link text-dark"><h5>UserLogin</h5></Link>    
            </li> }
            {!id&&<li className="nav-item">    
                <Link to={'/AdminLogin'} className="nav-link text-dark"><h5>AdminLogin</h5></Link>    
            </li>}
            {id&&<li onClick={onLogout}>
              <Link to={'/'} className="nav-link text-dark"><h5>Logout</h5></Link>
            </li>}
            </ul>    
          </div>    
        </nav> <br />
        </div>
        <Switch>         
        <Route path="/Reg" component={Reg} />  
        </Switch>
        <Switch>         
        <Route path="/UserHistory" component={UserHistory} />  
        </Switch>
        <Switch>         
        <Route path="/UserLogin" component={UserLogin} />  
        </Switch> 
        <Switch>         
        <Route path="/AdminLogin" component={AdminLogin} />  
        </Switch> 
        <Switch>         
        <Route path="/Hotel" component={Hotel} />  
        </Switch> 
        <Switch>         
        <Route path="/Room" component={Room} />  
        </Switch> 
        <Switch>         
        <Route path="/AdminDashboard" component={AdminDasboard} />  
        </Switch>
        <Switch>         
        <Route path="/hotelList" component={hotelList} />  
        </Switch>
        <Switch>         
        <Route exact path="/" component={Home} /> 
        </Switch>   
    </Router>
  );  
}  
  
export default App; 