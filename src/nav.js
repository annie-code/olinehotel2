import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand
} from 'reactstrap';
  
function NavBar() {
  
    // Collapse isOpen State
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
        <div>
            <h5>ReactJS Reactstrap Navbar Component</h5>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Brand</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Register</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}
  
export default NavBar;