import React, { useState, useEffect } from 'react';
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
                <Navbar.Brand href="/" style={myStyle}> <FontAwesomeIcon icon={faGuitar} style={myStyle} /> Sound Lounge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem("loggedIn") ? <Nav.Link href="/posts" >Posts</Nav.Link> : <></>}
                        {localStorage.getItem("loggedIn") ?
                            <NavDropdown title="Friends" id='basic-nav-dropdown'>
                                <NavDropdown.Item href={`/myFriends`} >My Friends</NavDropdown.Item>
                                <NavDropdown.Item href={`/findFriends`} >Find Friends</NavDropdown.Item>
                                <NavDropdown.Item href={`/requests`} >Requests</NavDropdown.Item>
                            </NavDropdown>
                            : <></>}
                        {localStorage.getItem("loggedIn") ?
                            <NavDropdown title="Profile" id="basic-nav-dropdown" >
                                <NavDropdown.Item href={`/myProfile/${localStorage.getItem("userId")}`} >My Profile</NavDropdown.Item>
                                <NavDropdown.Item href={`/myPosts/${localStorage.getItem("userId")}`} >My Posts</NavDropdown.Item>
                                <NavDropdown.Item href="/myFriends" >My Friends</NavDropdown.Item>
                            </NavDropdown>
                            : <></>}
                        {localStorage.getItem("loggedIn") ? <Nav.Link href="/logout" >Logout</Nav.Link> : <></>}

                        {!localStorage.getItem("loggedIn") ? <Nav.Link href="/" >Home</Nav.Link> : <></>}
                        {!localStorage.getItem("loggedIn") ? <Nav.Link href="/login" >Login</Nav.Link> : <></>}
                        {!localStorage.getItem("loggedIn") ? <Nav.Link href="/register" >Register</Nav.Link> : <></>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;