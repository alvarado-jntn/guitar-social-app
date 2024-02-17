import React, { useState, useEffect } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserDetails from './UserDetails';
import AccountInfo from './AccountInfo';
import LoginInfo from './LoginInfo';


function Profile() {
    const [userDetails, setUserDetails] = useState({
        dob: "",
        description: "",
        guitarCount: 0,
        level: "Beginner"
    });
    const [inputs, setInputs] = useState({
        dob: "",
        description: "",
        guitarCount: 0,
        level: "Beginner"
    });
    
    const userId = localStorage.getItem("userId");

    useEffect(() => {
    }, []);

    return (
        <div className='background-div'>
            <h1>{localStorage.getItem("firstName")}'s Sound Lounge Profile </h1>
            <br />
            <UserDetails userId={userId} showEditButton={true} />
            <br />
            <AccountInfo userId={userId} />
            <br />
            <LoginInfo userId={userId} />
        </div>
    )
}
export default Profile;