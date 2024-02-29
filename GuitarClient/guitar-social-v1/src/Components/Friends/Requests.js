import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

function Requests() {
    const [sentloading, setSentLoading] = useState(true);
    const [rloading, setRLoading] = useState(true);
    const [sent, setSent] = useState([]);
    const [received, setReceived] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        sentRequestsAPI(localStorage.getItem("userId"));
        receivedRequestsAPI(localStorage.getItem("userId"));
    }, [])

    const sentRequestsAPI = async (userId) => {
        try {
            const response = await api.get(`/friends/pendingRequests/${userId}`);
            setSent(response.data);
            setSentLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const receivedRequestsAPI = async (userId) => {
        try {
            const response = await api.get(`/friends/myRequests/${userId}`);
            setReceived(response.data);
            setRLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const acceptAPI = async (sender, receiver) => {
        try {
            const response = await api.put(`/friends/confirm`, {
                senderId: sender,
                receiverId: receiver
            });
        } catch (error) {
            console.log(error);
        }
    }

    const denyAPI = async (sender, receiver) => {
        try {
            const response = await api.delete(`/friends/deleteFriendship/${sender}/${receiver}`);
        } catch (error) {
            console.log(error);
        }
    }

    const accept = (e) => {
        e.preventDefault();
        const sender = e.target.value;
        acceptAPI(sender, localStorage.getItem("userId"));
        navigate(`/myFriends`);
        window.location.reload();

    }

    const deny = (e) => {
        // e.preventDefault();
        const sender = e.target.value;
        if(window.confirm("Are you sure you wish to delete this friend request?")){
            denyAPI(sender, localStorage.getItem("userId"));
            window.location.reload();
        }
    }

    return (
        <div className='background-div'>
            <div>
                <h1>Received Requests</h1>
                <Loading loading={rloading} />
                {received.length === 0 ? <p>You don't have any friend requests at this time.</p> : <></>}
                {received.map(r => {
                    return (
                        <ul key={r.userId}>
                            <Card >
                                <Card.Body>
                                    {r.firstName} sent a friend request. <br />
                                    <Button onClick={accept} value={r.userId} variant='primary'>Accept</Button> &nbsp;
                                    <Button onClick={deny} value={r.userId} variant='danger'>Deny</Button>
                                </Card.Body>
                            </Card>
                        </ul>
                    )
                })}

            </div>
            <hr />

            <div>
                <h1>Sent Requests</h1>
                <Loading loading={sentloading}/>
                {sent.length === 0 ? <p>You have not sent any requests recently.</p> : <></>}
                {sent.map(r => {
                    return (
                        <ul key={r.userId}>
                            <Card >
                                <Card.Body>
                                    {r.firstName} <br />
                                    Status: Pending
                                </Card.Body>
                            </Card>
                        </ul>
                    )
                })}
            </div>
            
        </div>
    )
}
export default Requests;