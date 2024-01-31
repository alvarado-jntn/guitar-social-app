import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { usernameValidation } from '../Validation/Validations';

function Login() {
    const [inputs, setInputs] = useState({});
    const [outputs, setOutputs] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameCheck, setUsernameCheck] = useState(true);
    const [passCheck, setPassCheck] = useState(true);
    const [loginSuccess, setLoginSuccess] = useState(true);

    useEffect(() => {

    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "username") {
            if (usernameValidation(value)) {
                setUsernameCheck(true);
                setOutputs(values => ({ ...values, [name]: value }));
            } else {
                setUsernameCheck(false);
            }
        }
        if (name === "password") {
            if (value === "") {
                setPassCheck(false);
            } else {
                setPassCheck(true);
                setOutputs(values => ({ ...values, [name]: value }));
            }
        }

        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="background-div">
            <h1>Sound Stage Guitar Login</h1>
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
                <Button variant="primary" type="submit">Submit</Button>
                <br />
                {usernameCheck ? <></> : <p>Username cannot be blank. It must be at least 4 characters.</p>}
                {passCheck ? <></> : <p>Password cannot be blank.</p>}
                {loginSuccess?<></>:<p>This username and password combination do not match our records. Please try again.</p>}

            </form>
        </div>
    );

}

export default Login;