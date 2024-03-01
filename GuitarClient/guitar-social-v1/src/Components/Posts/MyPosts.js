import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { addLikeAPI } from '../Likes/AddLike';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';


function MyPosts(props) {
    const [loading, setLoading] = useState(true);
    const [myPosts, setMyPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        myPostsAPI(localStorage.getItem("userId"));
    }, [])

    const myPostsAPI = async (id) => {
        try {
            const response = await api.get(`/posts/findByUserId/${id}`);
            setMyPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const deletePostAPI = async (postId) => {
        try {
            const response = await api.delete(`/posts/delete/${postId}`);
            console.log(response.data);
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

    const editPost = (e) => {
        e.preventDefault();
        // alert("Editing this post.");
        navigate(`/editPost/${e.target.value}`);
    }
    const deletePost = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you wish to delete this post?")) {
            deletePostAPI(e.target.value);
            window.location.reload();
        }
    }


    return (
        <div className="background-div" >
            <h1 className='title' >
                <span style={{ color: '#DD3704' }}> | </span>
                MY POSTS
            </h1>
            <br/>
            <Button variant='warning' size='lg' onClick={newPost} >Add A New Post</Button>
            <Loading loading={loading} />
            <br />
            <br />
            {myPosts.map(post => {
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
                                <ListGroupItem style={{background:"#CCCCCC"}}>
                                    <Button onClick={editPost} type='submit' variant='primary' value={post.postId}>Edit Post</Button>

                                    &nbsp;
                                    <Button onClick={deletePost} type='submit' variant='danger' value={post.postId}>Delete Post</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                        <br />
                    </ul>
                )
            })}

            {myPosts.length === 0 ? <h3>You don't have any posts yet.</h3> : <></>}

        </div>
    )
}
export default MyPosts;