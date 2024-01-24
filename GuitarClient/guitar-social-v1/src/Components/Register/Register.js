import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { nameValidation } from '../Validation/Validations';

function Register() {
    const [inputs, setInputs] = useState({});


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const firstNameCheck = nameValidation(inputs.firstName);
        const lastNameCheck = nameValidation(inputs.lastName);

        if (firstNameCheck & lastNameCheck) { // If the form passes all validations
            console.log(`--- Form PASSED All Validations ---`);
            console.log(`first name: ${inputs.firstName}`);
            console.log(`last name: ${inputs.lastName}`);
            console.log(`email: ${inputs.email}`);
            alert(`Thank you for registering.`);
        } else { // If the form does not pass all validations.
            console.log(`--- Form FAILED a Validation ---`);
            alert(`Sorry, the form could not be submitted. Please try again.`);
        }

    };

    return (
        <div className="background-div">
            <h1>Sound Stage Guitar Registration</h1>
            <div>
                <form onSubmit={handleSubmit} className="register-form">
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="text" name="email" value={inputs.email} onChange={handleChange} />
                    </label>
                    <br />
                    <Button variant="primary" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}
export default Register;