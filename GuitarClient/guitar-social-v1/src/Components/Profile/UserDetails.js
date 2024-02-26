import React, { useState, useEffect } from 'react';
import api from '../../API/axiosConfig';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';


function UserDetails(props) {
    const [userDetails, setUserDetails] = useState({
        dob: "",
        description: "",
        guitarCount: 0,
        level: "Beginner"
    });
    const [inputs, setInputs] = useState({
        dob: "",
        description: "",
        guitarCount: 0,
        level: "Beginner"
    });
    const [editDetails, setEditDetails] = useState(false);
    const userId = props.userId;
    const showEditButton = props.showEditButton;

    useEffect(() => {
        getDetailsAPI();
        // eslint-disable-next-line
    }, []);

    const getDetailsAPI = async () => {
        try {
            const response = await api.get(`/details/find/${userId}`);

            if (response.data === null) {
                console.log(response.data);

            } else {
                setUserDetails(response.data);
                setInputs(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addDetailsAPI = async () => {
        try {
            // eslint-disable-next-line
            const response = await api.post(`/details/addDetails`, {
                userId: userId,
                dob: inputs.dob,
                description: inputs.description,
                guitarCount: inputs.guitarCount,
                level: inputs.level
            });
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangeInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmitInputs = (e) => {
        e.preventDefault();
        addDetailsAPI();
        window.location.reload();
    }

    return (
        <div >
            <Card style={{ width: '70%' }}  >
                <Card.Img></Card.Img>
                <Card.Body>
                    <Card.Title>My Details</Card.Title>
                    <ListGroup>
                        <ListGroupItem>Experience Level: <br />{userDetails.level}</ListGroupItem>
                        <ListGroupItem>Guitar Count: <br />{userDetails.guitarCount}</ListGroupItem>
                        <ListGroupItem>Bio: <br />{userDetails.description}</ListGroupItem>
                        <ListGroupItem>Birthday: <br />{userDetails.dob}</ListGroupItem>
                    </ListGroup>
                    <br />
                    {showEditButton ? <Button onClick={() => { setEditDetails(!editDetails) }}>Edit</Button> : <></>}
                    <br />
                    <br />

                    {editDetails ?
                    
                        <ListGroup>
                            <ListGroupItem>
                                <form onSubmit={handleSubmitInputs}>
                                    <label>
                                        Choose Experience Level  :
                                        <select name='level' onChange={handleChangeInputs} value={inputs.level}>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Expert">Expert</option>
                                        </select>
                                    </label>
                                    <br />
                                    <label>
                                        How many guitars do you own?
                                        <input type='number' name='guitarCount' onChange={handleChangeInputs} value={inputs.guitarCount}></input>
                                    </label>
                                    <br />
                                    <label>
                                        Tell us about yourself:
                                        <textarea name='description' value={inputs.description} onChange={handleChangeInputs} cols={50} ></textarea>
                                    </label>
                                    <br />
                                    <label>
                                        When is your birthday?
                                        <input type='date' name='dob' onChange={handleChangeInputs} value={inputs.dob}></input>
                                    </label>
                                    <br />
                                    <Button type='submit' variant='primary' >Submit Info</Button>
                                </form>
                            </ListGroupItem>
                        </ListGroup>
                        : <></>}
                </Card.Body>

            </Card>

        </div>
    )
}
export default UserDetails;