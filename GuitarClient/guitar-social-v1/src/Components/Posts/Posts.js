import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { addLikeAPI } from '../Likes/AddLike';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Posts.css';

function Posts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        try {
            const response = await api.get(`/posts/all`);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

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

    return (
        <div className="background-div" >
            <h1 className='title' >
                <span style={{color:'#DD3704'}}> | </span>
                <span>All Posts</span>
                </h1> 
            <br/>
            <Button variant='warning' size='lg' onClick={newPost}  >Add A New Post</Button>
            <Button className='addPost' variant='warning' size='lg' onClick={newPost}  >Add A New Post</Button>
            <br />
            <br />
            <Loading loading={loading} />
            {posts.map(post => {
                return (
                    <ul key={post.postId}>
                        <Card className='post-card'   >
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Subtitle>{post.body}</Card.Subtitle>
                            </Card.Body>
                            <ListGroup >
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
            {/* </>
            } */}
        </div>
    );
}

export default Posts;