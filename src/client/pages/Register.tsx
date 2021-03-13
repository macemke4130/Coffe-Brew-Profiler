import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';

const Register = (props: RegisterProps) => {
    const [theEmail, setTheEmail] = useState<string>('');
    const [theUsername, setTheUsername] = useState<string>('');
    const [thePassword, setThePassword] = useState<string>('');
    const [theBloom, setTheBloom] = useState<number>(0);

    const history = useHistory();

    const verifyRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        sendRegister();
    }

    const sendRegister = async () => {
        const bodyObject = {
            email: theEmail,
            username: theUsername,
            password: thePassword,
            bloom: theBloom
        };
        const r = await apiService("/auth/register", "POST", bodyObject);
        const token = r;
        if (token) {
            localStorage.setItem("token", token);
            history.push('/');
        }
    }

    const hEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const hUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheUsername(e.target.value);
    }

    const hPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThePassword(e.target.value);
    }

    const hBloom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBloom(Number(e.target.value));
    }

    return (
        <>
            <Nav />
            <h1>Register Page</h1>
            <form className="d-flex flex-column">
                <label>Email:</label>
                <input type="email" placeholder="Email" value={theEmail} onChange={hEmail} className="mb-3"></input>

                <label>Username / First Name:</label>
                <input type="text" placeholder="Username / First Name" value={theUsername} onChange={hUsername} className="mb-3"></input>

                <label>Password:</label>
                <input type="password" placeholder="Password" value={thePassword} onChange={hPassword} className="mb-3"></input>

                <label>Favorite Bloom Time (in seconds):</label>
                <input type="number" placeholder="Favorite Bloom Time (in seconds)" value={theBloom} onChange={hBloom} className="mb-3"></input>
                <button className="btn-btn-primary" onClick={verifyRegister}>Register!</button>
            </form>
        </>
    );
};

interface RegisterProps { }

export default Register;
