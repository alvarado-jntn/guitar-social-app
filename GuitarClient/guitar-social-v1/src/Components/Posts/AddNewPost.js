import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';

function AddNewPost(props) {
    const [inputs, setInputs] = useState({
        title: "",
        postDate:"",
        body: "",
        imageLink: "",
        likesCount: 0,
        userId: localStorage.getItem("userId")
    })
    const [titleCheck, setTitleCheck] = useState(true);
    const [bodyCheck, setBodyCheck] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(Date().getFullYear());
    }, []);

    const addNewPostAPI = async () => {
        try {
            // eslint-disable-next-line
            const response = await api.post(`/posts/newPost`, {
                title: inputs.title,
                postDate: inputs.postDate,
                body: inputs.body,
                imageLink: inputs.imageLink,
                likesCount: inputs.likesCount,
                userId: inputs.userId
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const d = new Date();
        // console.log("date", d.toDateString());
        // console.log("date ISO", d.toISOString());
        
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
        

        console.log(inputs);
        if (titleCheck && bodyCheck) {
            addNewPostAPI();
            alert(`Your post has been submitted!`);
            navigate("/posts");

        } else {
            alert(`Make sure to fill out all the required fields.`);
        }
    }

    return (
        <div className='background-div'>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title* &nbsp; <input required type='text' name='title' value={inputs.title} onChange={handleChange} placeholder='Give your post a title' />
                </label> <br />

                <label>
                    Body* &nbsp; <textarea required cols={50} rows={4} name='body' value={inputs.body} onChange={handleChange}
                        placeholder='What is this post about?'
                    />
                </label> <br />

                <label>
                    Image &nbsp; <input type='file' name='imageLink' value={inputs.imageLink} onChange={handleChange} />
                </label> <br />
                <Button type='submit' variant='primary' >Submit</Button>
                {titleCheck ? <></> : <p>* Please include a title.</p>}
                {bodyCheck ? <></> : <p>* Body cannot be empty.</p>}


            </form>
        </div>
    )
}

export default AddNewPost;