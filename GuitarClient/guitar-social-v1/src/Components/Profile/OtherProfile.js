import React, { useState, useEffect } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import UserDetails from './UserDetails';
import OtherPosts from '../Posts/OtherPosts';

function OtherProfile() {
    const { userId } = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNameAPI(userId);
    }, [])

    const getNameAPI = async (id) => {
        try {
            const response = await api.get(`/users/firstName/${userId}`);
            setName(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addFriendAPI = async (sId, rId) => {
        try {
            const response = await api.post(`/friends/addNew`, {
                senderId: sId,
                receiverId: rId,
                confirmed: 0
            });

        } catch (error) {
            console.log(error);
        }
    }

    const addFriend = (e) => {
        e.preventDefault();
        addFriendAPI(localStorage.getItem("userId"), userId);
        navigate(`/requests`);
        window.location.reload();
    }

    return (
        <div className='background-div'>
            <UserDetails userId={userId} showEditButton={false} showProfileButton={false} name={name} />
            <br />
            <Button size='lg' variant='warning' onClick={addFriend} >Add Friend</Button>
            <br />
            <br />
            <OtherPosts userId={userId} name={name} />
        </div>
    )
}
export default OtherProfile;