import React, { useState, useEffect } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { nameValidation, emailValidation } from '../Validation/Validations';
import Loading from '../Loading/Loading';

function AccountInfo(props) {
    const [loading, setLoading] = useState(true);
    const userId = props.userId;
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const [accountInfo, setAccountInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const [fNameCheck, setFNameCheck] = useState(true);
    const [lNameCheck, setLNameCheck] = useState(true);
    const [emailCheck, setEmailCheck] = useState(true);
    const [editDetails, setEditDetails] = useState(false);
    const [apiEmailBool, setApiEmailBool] = useState(true);
    const [foo, setFoo] = useState("")


    useEffect(() => {
        getAccountDetails();
    }, [])

    useEffect(() => {
        checkEmailAPI(inputs.email);
    }, [inputs])

    const getAccountDetails = async () => {
        try {
            const response = await api.get(`/users/find/singleUser/${userId}`);
            setAccountInfo(response.data);
            setInputs(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUserAPI = async () => {
        try {
            const response = await api.put(`/users/updateUser/${userId}`, {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                email: inputs.email
            });
            console.log(response.data);
            localStorage.setItem("firstName", response.data.firstName);
            localStorage.setItem("lastName", response.data.lastName);
            localStorage.setItem("email", response.data.email);

        } catch (error) {
            console.log(error);
        }
    }

    const checkEmailAPI = async (newEmail) => {
        try {
            const response = await api.post(`/users/checkEmail`, {
                email: newEmail
            });

            if (newEmail === localStorage.getItem("email")) {
                setApiEmailBool(true)
            } else {
                setApiEmailBool(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();

        if (name === "firstName") {
            if (nameValidation(value)) {
                setFNameCheck(true);
            } else {
                setFNameCheck(false);
            }
        }
        if (name === "lastName") {
            if (nameValidation(value)) {
                setLNameCheck(true);
            } else {
                setLNameCheck(false);
            }
        }

        if (name === "email") {
            if (emailValidation(value)) {
                setEmailCheck(true);
                setFoo(Date());
            } else {
                setEmailCheck(false);
            }
        }


        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fNameCheck && lNameCheck && emailCheck && apiEmailBool) {
            updateUserAPI();
            setApiEmailBool(true);
            window.location.reload();
        }
    }

    return (
        <div >
            <Loading loading={loading}/>
            <Card style={{ width: '70%' }}  >
                <Card.Img></Card.Img>
                <Card.Body>
                    <Card.Title>Account Info</Card.Title>
                    <ListGroup>
                        <ListGroupItem>Name: <br />{accountInfo.firstName}</ListGroupItem>
                        <ListGroupItem>Last Name: <br />{accountInfo.lastName}</ListGroupItem>
                        <ListGroupItem>Email: <br />{accountInfo.email}</ListGroupItem>
                    </ListGroup>
                    <br />
                    <Button onClick={() => { setEditDetails(!editDetails) }}>Edit</Button>
                    <br />
                    <br />

                    {editDetails ?
                        <ListGroup>
                            <ListGroupItem>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Update your First Name:
                                        <input required type='text' name='firstName' value={inputs.firstName} onChange={handleChange} />
                                    </label>
                                    <br />
                                    <label>
                                        Update your Last Name:
                                        <input required type='text' name='lastName' value={inputs.lastName} onChange={handleChange} />
                                    </label>
                                    <br />
                                    <label>
                                        Update your Email:
                                        <input required type='text' name='email' value={inputs.email} onChange={handleChange} />
                                    </label>
                                    <br />
                                    <Button type='submit' variant='primary' >Submit Info</Button>
                                </form>
                                {fNameCheck ? <></> : <p style={{ color: 'red' }}>*First name must begin with capital letter. It cannot be blank</p>}
                                {lNameCheck ? <></> : <p style={{ color: 'red' }}>*Last name must begin with capital letter. It cannot be blank</p>}
                                {emailCheck ? <></> : <p style={{ color: 'red' }}>*Please double check if email is in correct format. It cannot be blank</p>}
                                {apiEmailBool ? <></> : <p style={{ color: 'red' }}>*It looks like this email is already in use.</p>}
                            </ListGroupItem>
                        </ListGroup>
                        : <></>}

                </Card.Body>

            </Card>

        </div>
    )
}
export default AccountInfo;