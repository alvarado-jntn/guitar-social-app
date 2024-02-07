import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { addLikeAPI } from '../Likes/AddLike';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        try {
            const response = await api.get(`/posts/all`);
            // console.log(response.data[0].user.firstName);

            setPosts(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const getNameFromIdAPI = async (id) => {
        try {
            const response = await api.get(`/users/firstName/${id}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }


    const newPost = (e) => {
        e.preventDefault();
        navigate("/newPost");
    }

    const newLike = (e) => {
        e.preventDefault();
        console.log(`-----`);
        console.log(`newLike button clicked`);
        addLikeAPI(e.target.value);
        window.location.reload();
    }

    const viewComments = (e) => {
        e.preventDefault();
        navigate(`/viewOnePost/${e.target.value}`);
    }

    const getFirstName = (userId) => {

        return getNameFromIdAPI(userId);

    }

    return (
        <div className="background-div" >
            <h1 >POSTS PAGE</h1>
            <Button onClick={newPost} >Add A New Post</Button>
            <br />
            <br />
            {posts.map(post => {
                return (
                    <ul key={post.postId}>
                        <Card style={{ width: '30rem' }}   >
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Subtitle>{post.body}</Card.Subtitle>
                            </Card.Body>
                            <ListGroup>
                                <ListGroupItem>
                                    <Button
                                        onClick={viewComments}
                                        value={post.postId}
                                    >View Comments</Button> &nbsp;

                                    <Button
                                        onClick={newLike}
                                        type="submit"
                                        value={post.postId}
                                    >Add Like</Button> &nbsp;

                                    Likes: {post.likesCount}
                                    <br />
                                    <Card.Text>
                                        {post.user.firstName} posted on {post.postDate.slice(0, 10)} at {post.postDate.slice(11, 19)}  UTC
                                    </Card.Text>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                        <br />
                    </ul>
                )
            })}
        </div>
    );
}

export default Posts;