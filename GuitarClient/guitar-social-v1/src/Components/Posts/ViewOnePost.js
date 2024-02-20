import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from "../../API/axiosConfig";
import { addLikeAPI } from '../Likes/AddLike';
import MakeComment from '../Comments/MakeComment';

function ViewOnePost() {
    const [post, setPost] = useState({});
    const [makeComment, setMakeComment] = useState(false);
    const { postId } = useParams();
    const [allComments, setAllComments] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        findByPostId();
        getAllComments();
    }, []);

    const getAllComments = async () => {
        try {
            const response = await api.get(`/comments/getComments/${postId}`);
            console.log(response.data);
            setAllComments(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const findByPostId = async () => {
        try {
            const response = await api.get(`/posts/findByPostId/${postId}`);
            setPost(response.data);
            setFirstName(response.data.user.firstName);
            setDate(response.data.postDate);

        } catch (error) {
            console.log(error);
        }

    };

    const newLike = (e) => {
        e.preventDefault();
        addLikeAPI(e.target.value);
        window.location.reload();
    }

    return (
        <div className="background-div" >
            <h1 >One Post Page</h1>
            <Card style={{ width: '30rem' }} key={post.postId}>
                <Card.Img variant='top' />
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle>{post.body}</Card.Subtitle>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>
                        <Button
                            onClick={() => { setMakeComment(!makeComment) }}
                        >Add Comment</Button> &nbsp;
                        <Button
                            onClick={newLike}
                            value={post.postId}
                            type='submit'
                        >Add Like</Button>  &nbsp;
                        Likes: {post.likesCount}
                        <br />
                        <Card.Text>
                            {firstName} posted on {date.slice(0, 10)} at {date.slice(11, 19)}  UTC
                        </Card.Text>
                    </ListGroupItem>
                </ListGroup>
            </Card>
            &nbsp;
            {makeComment ? <MakeComment postId={post.postId} /> : <></>}

            {allComments.map(comment => {
                return (
                    <ul key={comment.commentId}>
                        <Card style={{ width: '30rem' }}  >
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Subtitle>{comment.user.firstName} commented:</Card.Subtitle>
                                <Card.Title>{comment.commentText}</Card.Title>
                                <Card.Text>Posted on {comment.commentDate.slice(0, 10)} at {comment.commentDate.slice(11, 19)} UTC</Card.Text>
                            </Card.Body>
                        </Card>
                    </ul>
                )
            })}
            {allComments.length === 0? <h3>There are no comments on your post.</h3>:<></>}

        </div>
    )
}

export default ViewOnePost;