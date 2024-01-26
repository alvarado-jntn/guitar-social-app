import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { nameValidation, emailValidation } from '../Validation/Validations';
import api from '../../API/axiosConfig';

function Register() {
    const [inputs, setInputs] = useState({});
    const [firstName, setFirstName] = useState(true);
    const [lastName, setLastName] = useState(true);
    const [email, setEmail] = useState(true);
    const [apiEmailBool, setApiEmailBool] = useState(true);
    const [output, setOutput] = useState({});

    useEffect(() => {
        checkEmailAPI(inputs.email);
    }, [inputs]);


    const checkEmailAPI = async (newEmail) => {
        try {
            const response = await api.post(`/users/checkEmail`, {
                email: newEmail
            });
            console.log(`API response.data: ${response.data}`);
            setApiEmailBool(response.data);
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

            localStorage.setItem("userId",response.data.userId);
            localStorage.setItem("firstName",response.data.firstName);
            localStorage.setItem("lastName",response.data.lastName);
            localStorage.setItem("email",response.data.email);
            console.log(`printing local storage items:`);
            console.log(localStorage.getItem("userId"));
            console.log(localStorage.getItem("firstName"));
            console.log(localStorage.getItem("lastName"));
            console.log(localStorage.getItem("email"));

        } catch (error) {
            console.log(error);
        }
    }


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
            const emailCheck = emailValidation(value);
            if (emailCheck) {
                setEmail(true);
                setOutput(values => ({ ...values, [name]: value }));
            } else {
                setEmail(false);
            }
        }

        setInputs(values => ({ ...values, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const firstNameCheck = nameValidation(output.firstName);
        const lastNameCheck = nameValidation(output.lastName);
        const emailCheck = emailValidation(output.email);

        if (firstNameCheck & lastNameCheck & emailCheck & apiEmailBool) { // If the form passes all validations
            console.log(`--- Form PASSED All Validations ---`);
            alert(`Thank you for registering.`);
            addUser(output.firstName, output.lastName, output.email);
        } else { // If the form does not pass all validations.
            console.log(`--- Form FAILED a Validation ---`);
            console.log(`first: ${output.firstName}`);
            console.log(`last: ${output.lastName}`);
            console.log(`email: ${output.email}`);
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
                    <Button variant="primary" type="submit">Submit</Button>
                    <br />
                    {firstName ? <></> : <p style={{ color: "orange" }}>*First Name cannot be empty. It must begin with a capital letter.</p>}
                    {lastName ? <></> : <p style={{ color: "orange" }}>*Last Name cannot be empty. It must begin with a capital letter.</p>}
                    {email ? <></> :
                        <p style={{ color: "orange" }}>
                            *Email cannot be empty.
                            It must follow the format: "your_email@domain" ".com" ".com" ".gov" ".etc"</p>}
                    {apiEmailBool ? <></> : <p style={{ color: "orange" }}>*This email appears to already be in use.</p>}
                </form>
            </div>
        </div>
    )
}
export default Register;