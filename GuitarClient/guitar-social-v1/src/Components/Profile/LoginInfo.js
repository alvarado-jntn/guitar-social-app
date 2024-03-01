import React, { useEffect, useState } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { passwordValidation, usernameValidation } from '../Validation/Validations';
import Loading from '../Loading/Loading';

function LoginInfo(props) {
    const [loading, setLoading] = useState(true);
    const [editUsername, setEditUsername] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [apiUsernameBool, setApiUsernameBool] = useState(true);
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [nameInput, setNameInput] = useState({
        username: ""
    })
    const [passInput, setPassInput] = useState({
        password: ""
    })

    useEffect(() => {
        getUsernameAPI();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        checkUsernameAPI(nameInput.username);
        // eslint-disable-next-line
    }, [nameInput.username])

    const getUsernameAPI = async () => {
        try {
            const response = await api.get(`/cred/getDetails/username/${props.userId}`);
            setUsername(response.data);
            setNameInput(values => ({ ...values, username: response.data }));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const checkUsernameAPI = async (newUsername) => {
        try {
            const response = await api.post(`/cred/checkUsername`, {
                username: newUsername
            });

            if (newUsername === username) {
                setApiUsernameBool(true);
                setAllowSubmit(false);
            } else {
                setApiUsernameBool(response.data);
                setAllowSubmit(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const updateUsernameAPI = async (id, newUsername) => {
        try {
            const response = await api.put(`/cred/updateUsername`, {
                userId: id,
                username: newUsername
            });
            setUsername(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updatePasswordAPI = async (id, newPassword) => {
        try {
            const response = await api.put(`/cred/updatePassword`, {
                userId: id,
                password: newPassword
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();

        if (name === "username") {
            setNameInput(values => ({ ...values, [name]: value }));

            if (usernameValidation(value)) {
                setUsernameValid(true);
            } else {
                setUsernameValid(false);
            }
        }

        if (name === "password") {
            setPassInput(values => ({ ...values, [name]: value }));
            if (passwordValidation(value)) {
                setPasswordValid(true);
            } else {
                setPasswordValid(false);
            }
        }
    }

    const handleSubmitUsername = (e) => {
        e.preventDefault();

        if (usernameValid && apiUsernameBool) {
            alert("Success!");
            updateUsernameAPI(props.userId, nameInput.username);
            setEditUsername(false);
            setAllowSubmit(false);
        } else {
            alert("Failed to update username.");
        }
    }
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwordValid) {
            alert("Success!");
            updatePasswordAPI(props.userId, passInput.password);
            setEditPass(false);
        }
    }

    return (
        <div >
            <Loading loading={loading}/>
            <Card className='post-card' >
                <Card.Img></Card.Img>
                <Card.Body>
                    <Card.Title>Login Info</Card.Title>
                    <ListGroup>
                        <ListGroupItem style={{background:"#CCCCCC"}}>
                            Username:&nbsp;&nbsp;&nbsp;&nbsp;{username}
                            <br />
                            <br />
                            <Button variant='warning' onClick={() => { setEditUsername(!editUsername) }}>Change Username</Button>
                        </ListGroupItem>

                        <ListGroupItem style={{background:"#CCCCCC"}}>Password
                            <br />
                            <br />
                            <Button variant='warning' onClick={() => { setEditPass(!editPass) }}>Change Password</Button> </ListGroupItem>
                    </ListGroup>
                    <br />
                    <br />
                    {editUsername ?
                        <ListGroup>
                            <ListGroupItem>
                                <form onSubmit={handleSubmitUsername}>
                                    <label>
                                        Update your Username:
                                        <input required type='text' name='username' value={nameInput.username} onChange={handleChange} />
                                    </label>
                                    <br />
                                    <Button type='submit' variant='primary' disabled={!allowSubmit} >Submit Change</Button>
                                </form>
                                {usernameValid ? <></> : <p style={{ color: 'red' }}>*Username must follow guidelines.</p>}
                                {apiUsernameBool ? <></> : <p style={{ color: 'red' }}>*Username is already taken.</p>}
                            </ListGroupItem>
                        </ListGroup>
                        : <></>}
                    {editPass ?
                        <ListGroup>
                            <ListGroupItem>
                                <form onSubmit={handleSubmitPassword}>
                                    <label>
                                        Update your Password:
                                        <input required type='password' name='password' value={passInput.password} onChange={handleChange} />
                                    </label>
                                    <br />
                                    <Button type='submit' variant='primary'>Submit Change</Button>
                                </form>
                                {passwordValid ? <></> : <p style={{ color: 'red' }}>*Password must be at least 5 characters, contain one uppercase, one lowercase, and a number.</p>}
                            </ListGroupItem>
                        </ListGroup>
                        : <></>}
                </Card.Body>
            </Card>
        </div>
    )
}
export default LoginInfo;