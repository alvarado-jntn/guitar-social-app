import React, { useState } from 'react';
import api from '../../API/axiosConfig';
import { Button } from 'react-bootstrap';

function MakeComment(props) {
    const [comment, setComment] = useState({
        postId: "",
        userId: "",
        commentText: "",
        commentDate: ""
    });
    const [textCheck, setTextCheck] = useState(true);

    const addCommentAPI = async () => {
        try {
            const response = await api.post(`/comments/addComment`, {
                postId: comment.postId,
                userId: comment.userId,
                commentText: comment.commentText,
                commentDate: comment.commentDate
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const date = new Date();

        if (name === "commentText") {
            if (value.trim() === "") {
                setTextCheck(false);
            } else {
                setTextCheck(true);
            }
        }


        setComment(values => ({ ...values, "postId": props.postId }));
        setComment(values => ({ ...values, "userId": localStorage.getItem("userId") }));
        setComment(values => ({ ...values, "commentDate": date.toISOString() }));
        setComment(values => ({ ...values, [name]: value }));


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textCheck) {
            addCommentAPI();
            setComment(values => ({ ...values, "commentText": "" }));
            window.location.reload();
        } else {
            alert(`Please make sure the text field is filled out before submitting your comment.`);
            setComment(values => ({ ...values, "commentText": "" }));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id='commentForm'>
                <label>
                    Comment* &nbsp; <textarea required cols={50} rows={4} name='commentText' value={comment.commentText} onChange={handleChange}
                        placeholder='Make a comment here.'
                    />
                    <br />
                    <Button type='submit'  >Submit Comment</Button>
                </label> <br />


            </form>
        </div>
    )


}
export default MakeComment;