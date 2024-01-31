import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { nameValidation, emailValidation, usernameValidation, passwordValidation } from '../Validation/Validations';
import api from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [inputs, setInputs] = useState({});
    const [firstName, setFirstName] = useState(true);
    const [lastName, setLastName] = useState(true);
    const [email, setEmail] = useState(true);
    const [apiEmailBool, setApiEmailBool] = useState(true);
    const [username, setUsername] = useState(true);
    const [apiUsernameBool, setApiUsernameBool] = useState(true);
    const [password, setPassword] = useState(true);
    const [userId, setUserId] = useState(0);
    const [output, setOutput] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        checkEmailAPI(inputs.email);
        checkUsernameAPI(inputs.username);
    }, [inputs]);


    const checkEmailAPI = async (newEmail) => {
        try {
            const response = await api.post(`/users/checkEmail`, {
                email: newEmail
            });
            setApiEmailBool(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const checkUsernameAPI = async (newUsername) => {
        try {
            const response = await api.post(`/cred/checkUsername`, {
                username: newUsername
            });
            setApiUsernameBool(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addUser = async (first, last, newEmail) => {
        try {
            const response = await api.post(`/users/addNewUser`, {
                firstName: first,
                lastName: last,
                email: newEmail
            });
            addCredential(response.data.userId, output.username, output.password);


        } catch (error) {
            console.log(error);
        }
    };

    const addCredential = async (newUserId, newUsername, newPassword) => {
        try {
            const response = await api.post(`/cred/newCredential`, {
                userId: newUserId,
                username: newUsername,
                password: newPassword
            });

        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();

        if (name === "firstName") {
            if (nameValidation(value)) {
                setFirstName(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setFirstName(false);
            }
        }
        if (name === "lastName") {
            if (nameValidation(value)) {
                setLastName(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setLastName(false);
            }
        }
        if (name === "email") {
            if (emailValidation(value)) {
                setEmail(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setEmail(false);
            }
        }
        if (name === "username") {
            if (usernameValidation(value)) {
                setUsername(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setUsername(false);
            }
        }
        if (name === "password") {
            if (passwordValidation(value)) {
                setPassword(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setPassword(false);
            }
        }

        setInputs(values => ({ ...values, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const firstNameCheck = nameValidation(output.firstName);
        const lastNameCheck = nameValidation(output.lastName);
        const emailCheck = emailValidation(output.email);
        const usernameCheck = usernameValidation(output.username);
        const passwordCheck = passwordValidation(output.password);

        if (firstNameCheck & lastNameCheck & emailCheck & usernameCheck & passwordCheck & apiEmailBool & apiUsernameBool) { // If the form passes all validations
            console.log(`--- Form PASSED All Validations ---`);


            addUser(output.firstName, output.lastName, output.email);
            localStorage.clear();
            alert(`Thank you for registering.`);
            navigate("/");

        } else { // If the form does not pass all validations.
            console.log(`--- Form FAILED a Validation ---`);
            alert(`Sorry, this form could not be submitted. \nPlease check if all the fields are filled correctly.`);

        }

    };

    return (
        <div className="background-div">
            <h1>Sound Stage Guitar Registration</h1>
            <div>
                <form onSubmit={handleSubmit} className="register-form">
                    <label>
                        First Name*:
                        <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Last Name*:
                        <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email*:
                        <input type="text" name="email" value={inputs.email} onChange={handleChange} />
                    </label>
                    <br />
                    <br />
                    <label>
                        Username*:
                        <input type="text" name="username" value={inputs.username} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Password*:
                        <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                    </label>
                    <br />
                    <Button variant="primary" type="submit">Submit</Button>
                    <br />
                    {firstName ? <></> : <p style={{ color: "orange" }}>* First Name cannot be empty. It must begin with a capital letter.</p>}
                    {lastName ? <></> : <p style={{ color: "orange" }}>* Last Name cannot be empty. It must begin with a capital letter.</p>}
                    {email ? <></> :
                        <p style={{ color: "orange" }}>
                            * Email cannot be empty.
                            It must follow the format: "your_email@domain" ".com" ".com" ".gov" ".etc"
                        </p>}
                    {apiEmailBool ? <></> : <p style={{ color: "orange" }}>* This email appears to already be in use.</p>}
                    {username ? <></> : <p style={{ color: "orange" }}>* Username cannot be empty. It must be at least 4 characters. It may contain a digit.</p>}
                    {password ? <></> :
                        <p style={{ color: "orange" }}>
                            * Password must contain at least:
                            5 characters, a lowercase letter, an uppercase letter, and a number.
                        </p>}
                    {apiUsernameBool ? <></> : <p style={{ color: "orange" }}>* This username appears to already be in use.</p>}
                </form>
            </div>
        </div>
    )
}
export default Register;