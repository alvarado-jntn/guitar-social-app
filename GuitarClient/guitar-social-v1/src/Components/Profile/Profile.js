import React, { useState, useEffect } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserDetails from './UserDetails';
import AccountInfo from './AccountInfo';
import LoginInfo from './LoginInfo';


function Profile() {

    const userId = localStorage.getItem("userId");

    useEffect(() => {
    }, []);

    return (
        <div className='background-div'>
            <h1 className='title'>
                <span style={{ color: '#DD3704' }}> | </span>

                {localStorage.getItem("firstName")}'s Profile
            </h1>
            <br />
            <UserDetails userId={userId} showEditButton={true} showProfileButton={false} name={localStorage.getItem("firstName")} />
            <br />
            <AccountInfo userId={userId} />
            <br />
            <LoginInfo userId={userId} />
        </div>
    )
}
export default Profile;