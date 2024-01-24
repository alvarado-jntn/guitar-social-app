import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const myStyle = {
        color: "",
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary"  >
            <Container>
                <Navbar.Brand href="/" style={myStyle}> <FontAwesomeIcon icon={faGuitar} style={myStyle} />  Sound Stage Guitars</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" style={myStyle}>Home</Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/myProfile" style={myStyle}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/myPosts" style={myStyle}>My Posts</NavDropdown.Item>
                            <NavDropdown.Item href="/myFriends" style={myStyle}>My Friends</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/findFriends" style={myStyle}>Find Friends</Nav.Link>
                        <Nav.Link href="/login" style={myStyle}>Login</Nav.Link>
                        <Nav.Link href="/logout" style={myStyle}>Logout</Nav.Link>
                        <Nav.Link href="/register" style={myStyle}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;