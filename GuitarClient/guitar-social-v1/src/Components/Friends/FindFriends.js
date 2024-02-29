import React, { useEffect, useState } from 'react';
import api from '../../API/axiosConfig';
import UserDetails from '../Profile/UserDetails';

import { Button, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

function FindFriends() {
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsersAPI();
    }, [])

    const getAllUsersAPI = async () => {
        try {
            const response = await api.get(`/users/all`);
            setAllUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const viewProfile = (e) =>{
        e.preventDefault();
        navigate(`/otherProfile/${e.target.value}`);
    }

    return (
        <div className='background-div'>
            <h1>Find Friends</h1>
            <br />
            <br />
            <Loading loading={loading}/>
            {allUsers.map(user => {
                return (
                    <ul key={user.userId}>
                        <UserDetails userId={user.userId} name={user.firstName} showEditButton={false} showProfileButton={false} />
                        <Button onClick={viewProfile} value={user.userId}>View Profile</Button>
                    </ul>
                )
            })}
        </div>
    )
}
export default FindFriends;