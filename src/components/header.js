import React from "react";
import { Navbar, Dropdown, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const history = useNavigate();
    const logout = () => {
        localStorage.removeItem("user");
        history(0);
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
       <div
            href=""
            ref={ref}
            onClick={e => {
            e.preventDefault();
            onClick(e);
            }}
            className="justify-content-end"
       >
        <Image src={require('../assets/profile.png')} width={50} />
          {/* Render custom icon here */}
          {children}
        </div>
      ));


    return  <div className="topnav">
    <Navbar
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      className="topnav justify-content-between px-2"
    >
      <Navbar.Brand href="">GoForMovies</Navbar.Brand>
      <div>
      <Dropdown drop={'start'}>
      <Dropdown.Toggle as={CustomToggle}>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={'span'} onClick={() => history('/')}>Home</Dropdown.Item>
        <Dropdown.Item as={'span'} onClick={() => history('/watch-list')}>My watchList</Dropdown.Item>
        <Dropdown.Item as={'span'} onClick={() => history('/favorite-list')}>My favorites</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
    </Navbar>
  </div>
}


export default Header;