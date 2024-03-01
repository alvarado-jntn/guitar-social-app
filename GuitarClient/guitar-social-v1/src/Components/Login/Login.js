import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import api from '../../API/axiosConfig';

function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [usernameCheck, setUsernameCheck] = useState(true);
    const [passCheck, setPassCheck] = useState(true);
    const [loginSuccess, setLoginSuccess] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const login = async (thisUsername, thisPassword) => {
        try {
            const response = await api.post(`/cred/login`, {
                username: thisUsername,
                password: thisPassword
            });
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("firstName", response.data.firstName);
            localStorage.setItem("lastName", response.data.lastName);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("loggedIn", true);

            navigate("/posts");
            window.location.reload();

        } catch (error) {
            console.log(error);
            setLoginSuccess(false);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "username") {
            if (value === "") {
                setUsernameCheck(false);
            } else {
                setUsernameCheck(true);
            }
        };
        if (name === "password") {
            if (value === "") {
                setPassCheck(false);
            } else {
                setPassCheck(true);
            }
        };

        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        login(inputs.username, inputs.password);


    };

    return (
        <div className="background-div">
            <h1 className="title">
                <span style={{ color: '#DD3704' }}> | </span>
                Sound Lounge Login
            </h1>
            <br />
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Username* &nbsp;
                    <input type="text" name="username" value={inputs.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password* &nbsp;
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </label>
                <br />
                <br />
                <Button variant="warning" type="submit">Submit</Button>
                <br />
                {usernameCheck ? <></> : <p>* Username cannot be blank. It must be at least 4 characters.</p>}
                {passCheck ? <></> : <p>* Password cannot be blank.</p>}
                {loginSuccess ? <></> : <p>*This username and password combination do not match our records. Please try again.</p>}

            </form>
        </div>
    );

}

export default Login;