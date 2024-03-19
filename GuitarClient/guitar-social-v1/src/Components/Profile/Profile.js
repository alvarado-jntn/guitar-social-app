import React, {  useEffect } from 'react';
import UserDetails from './UserDetails';
import AccountInfo from './AccountInfo';
import LoginInfo from './LoginInfo';
import { Button } from 'react-bootstrap';


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
            <br />
            <Button variant='danger' href='/deleteProfile' >Delete Profile</Button>

        </div>
    )
}
export default Profile;