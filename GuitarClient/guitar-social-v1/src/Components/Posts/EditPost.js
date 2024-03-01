import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import api from "../../API/axiosConfig";
import { addLikeAPI } from '../Likes/AddLike';
import MakeComment from '../Comments/MakeComment';

function EditPost(props) {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [titleCheck, setTitleCheck] = useState(true);
    const [bodyCheck, setBodyCheck] = useState(true);
    const [inputs, setInputs] = useState({
        postId: 0,
        title: '',
        postDate: '',
        body: '',
        imageLink: '',
        likesCount: 0,
        userId: localStorage.getItem("userId"),
        user: {}
    });


    useEffect(() => {
        findByPostId();
    }, [])

    const findByPostId = async () => {
        try {
            const response = await api.get(`/posts/findByPostId/${postId}`);
            setInputs(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    const updatePostAPI = async (thisTitle, thisDate, thisBody, thisImg, thisLikes, thisUserID) => {
        try {
            // eslint-diasble-next-line
            const response = await api.put(`/posts/update/${postId}`, {
                title: thisTitle,
                postDate: thisDate,
                body: thisBody,
                imageLink: thisImg,
                likesCount: thisLikes,
                userId: thisUserID
            });

        } catch (error) {
            console.log(error);
        }
    }

    const myPosts =(e)=>{
        navigate(`/myPosts/${localStorage.getItem("userId")}`);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const d = new Date();;

        setInputs(values => ({ ...values, "postDate": d.toISOString() }));

        if (name === "title") {
            if (value.trim() === "") {
                setTitleCheck(false);
            } else {
                setTitleCheck(true);
            }
        }
        if (name === "body") {
            if (value.trim() === "") {
                setBodyCheck(false);
            } else {
                setBodyCheck(true);
            }
        }

        setInputs(values => ({ ...values, [name]: value }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inputs: ", inputs);
        //thisTitle, thisDate, thisBody, thisImg, thisLikes, thisUserID
        updatePostAPI(inputs.title, inputs.postDate, inputs.body, inputs.imageLink, inputs.likesCount, inputs.userId);
        navigate(`/myPosts/${localStorage.getItem("userId")}`);
        window.location.reload();
    }

    return (
        <div className='background-div'>
            <form onSubmit={handleSubmit}>
                <label>
                    Edit Title* &nbsp; <input required type='text' name='title' value={inputs.title} onChange={handleChange} placeholder='Give your post a title' />
                </label> <br />

                <label>
                    Edit Body* &nbsp; <textarea required cols={50} rows={4} name='body' value={inputs.body} onChange={handleChange}
                        placeholder='What is this post about?'
                    />
                </label> <br />
                <Button type='submit' variant='primary' >Submit Changes</Button>
                {titleCheck ? <></> : <p>* Please include a title.</p>}
                {bodyCheck ? <></> : <p>* Body cannot be empty.</p>}


            </form>
            <br/>
            <Button onClick={myPosts} variant='danger'>Cancel</Button>
        </div>
    )
}
export default EditPost;