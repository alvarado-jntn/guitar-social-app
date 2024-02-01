import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
        // console.log(posts);
    }, []);

    const getAllPosts = async () => {
        try {
            const response = await api.get(`/posts/all`);
            setPosts(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    function printPosts() {
        console.log(posts);
    }

    return (
        <div className="background-div">
            <h1 >POSTS PAGE</h1>
            <Button >Add A New Post</Button>
            <br/>
            <br/>
            {posts.map((post) => (
                <>
                    <Card key={post.postId} >
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle>{post.postDate}</Card.Subtitle>
                            <Card.Text>{post.body}</Card.Text>
                        </Card.Body>
                        <ListGroup>
                            <ListGroupItem>Likes: {post.likesCount} |&nbsp;
                                <Button >Add Like</Button>
                            </ListGroupItem>
                            <ListGroupItem>Comments: {post.likesCount} |&nbsp;
                                <Button >Add Comment</Button> &nbsp;
                                <Button>View Comments</Button>
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