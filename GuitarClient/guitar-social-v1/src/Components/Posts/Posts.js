import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { addLikeAPI } from '../Likes/AddLike';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        try {
            const response = await api.get(`/posts/all`);
            setPosts(response.data);

        } catch (error) {
            console.log(error);
        }
    };


    const newPost =(e)=>{
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

    return (
        <div className="background-div" >
            <h1 >POSTS PAGE</h1>
            <Button onClick={newPost} >Add A New Post</Button>
            <br />
            <br />
            {posts.map((post) => (
                <>
                    <Card style={{ width: '30rem' }} key={post.postId}  >
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle>{post.postDate}</Card.Subtitle>
                            <Card.Text>{post.body}</Card.Text>
                        </Card.Body>
                        <ListGroup>
                            <ListGroupItem>
                                <Button>View Comments</Button> &nbsp;
                                <Button
                                    onClick={newLike}
                                    type="submit"
                                    value={post.postId}
                                >Add Like</Button> &nbsp;


                                Likes: {post.likesCount}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    <br />
                </>
            ))}

        </div>
    );
}

export default Posts;