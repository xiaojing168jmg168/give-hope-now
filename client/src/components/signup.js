import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { ADD_USER } from '../utils/mutations';


const Signup = () => {
  // set initial form state
    const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    password: '',
});
  // set state for form validation
    const [validated] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
};

    const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const { data } = await addUser({
        variables: { ...userFormData },
    });
        console.log(data);
        Auth.login(data.addUser.token);
    } catch (err) {
        console.error(err);
    }

    setUserFormData({
        name: '',
        email: '',
        password: '',
    });
};

    return (
    <div className="container my-1">
        <Link to="/login">← Go to Login</Link>
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
            
            <div className="flex-row space-between my-2">
                <label htmlFor="name">Name:</label>
                <input
                placeholder="Name"
                name="name"
                type="name"
                id="name"
                onChange={handleInputChange}
                />
            </div>
            <div className="flex-row space-between my-2">
                <label htmlFor="email">Email:</label>
                <input
                placeholder="email"
                name="email"
                type="email"
                id="email"
                onChange={handleInputChange}
                />
            </div>
            <div className="flex-row space-between my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleInputChange}
                />
            </div>
            <div className="flex-row flex-end">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
);
}

export default Signup;