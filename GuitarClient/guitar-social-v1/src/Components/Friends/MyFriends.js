import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { addLikeAPI } from '../Likes/AddLike';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../Profile/UserDetails';
import Loading from '../Loading/Loading';

function MyFriends() {
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriendsAPI(localStorage.getItem("userId"))
    }, [])

    const getFriendsAPI = async (userId) => {
        try {
            const response = await api.get(`/friends/findMyFriends/${userId}`);
            setFriends(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='background-div'>
            <h1 className='title'>
                <span style={{ color: '#DD3704' }}> | </span>
                My Friends Page
            </h1>
            <br />
            <Loading loading={loading} />
            {friends.length === 0 ?
                <p>It appears you don't have any friends, checkout this page to find new friends: <a style={{ color: 'red' }} href='/findFriends'>Find Friends</a></p>
                : <></>
            }
            {friends.map(f => {
                return (
                    <ul key={f.userId}>
                        <UserDetails userId={f.userId} showEditButton={false} showProfileButton={true} name={f.firstName} />
                    </ul>
                )
            })}
        </div>
    )
}
export default MyFriends;