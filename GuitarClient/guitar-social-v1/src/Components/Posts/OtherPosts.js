import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { addLikeAPI } from '../Likes/AddLike';

function OtherPosts(props) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPostsAPI(props.userId);
    }, [])

    const getPostsAPI = async (id) => {
        try {
            const response = await api.get(`/posts/findByUserId/${id}`);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const viewComments = (e) => {
        e.preventDefault();
        navigate(`/viewOnePost/${e.target.value}`);
    }

    const newLike = (e) => {
        e.preventDefault();
        console.log(`-----`);
        console.log(`newLike button clicked`);
        addLikeAPI(e.target.value);
        window.location.reload();
    }

    return (
        <div >
            {posts.map(post => {
                return (
                    <ul key={post.postId}>
                        <Card className='post-card'   >
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Subtitle>{post.body}</Card.Subtitle>
                            </Card.Body>
                            <ListGroup>
                                <ListGroupItem style={{background:"#CCCCCC"}}>
                                    <Button
                                        variant='warning'
                                        onClick={viewComments}
                                        value={post.postId}
                                    >View Comments</Button> &nbsp;

                                    <Button
                                        variant='warning'
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
            <br/>
            {posts.length === 0 ? <h3>{props.name} has no posts to show.</h3> : <></>}

        </div>
    )

}
export default OtherPosts;