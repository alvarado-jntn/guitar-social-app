import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';

function DeleteProfile(props) {
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const deleteProfileAPI = async (id) => {
        try {
            // eslint-disable-next-line
            const response = await api.delete(`/users/delete/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProfile = (e) => {
        e.preventDefault();
        if (window.confirm("Are you absolutely sure you wish to delete your account? This cannot be reversed. ")) {
            deleteProfileAPI(localStorage.getItem("userId"));
            localStorage.clear();
            navigate("/");
            window.location.reload();
        }

    }

    return (
        <div className='background-div'>
            <h1>Delete Profile</h1>
            <h3>Are you sure you wish to delete your profile? Doing so will delete all of your data such as friends, posts, and other data. </h3>
            <Button variant='danger' onClick={deleteProfile} >Delete Profile</Button>
        </div>
    )
}
export default DeleteProfile;