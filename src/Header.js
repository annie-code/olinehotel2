import { BrowserRouter as Link } from 'react-router-dom'; 

<div className="container-lm">
        <nav className="navbar navbar-expand-lg navheader bg-info">    
          <div className="collapse navbar-collapse" >    
            <ul className="navbar-nav ms-auto fw-bold">   
            {!id&&<li className="nav-item">    
                <Link to={'/Reg'} className="nav-link text-dark">Register</Link>    
            </li>}
            {!id&&<li className="nav-item">    
                <Link to={'/UserLogin'} className="nav-link text-dark">UserLogin</Link>    
            </li> }
            {!id&&<li className="nav-item">    
                <Link to={'/AdminLogin'} className="nav-link text-dark">AdminLogin</Link>    
            </li>}
            {id&&<li onClick={onLogout}>
              <Link to={'/'} className="nav-link text-dark">Logout</Link>
            </li>}
            </ul>    
          </div>    
        </nav> <br />
</div>