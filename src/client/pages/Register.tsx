import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';

const Register = (props: RegisterProps) => {
    const [theEmail, setTheEmail] = useState<string>('');
    const [theUsername, setTheUsername] = useState<string>('');
    const [thePassword, setThePassword] = useState<string>('');

    const history = useHistory();

    const verifyRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        sendRegister();
    }

    const sendRegister = async () => {
        const bodyObject = {
            email: theEmail,
            username: theUsername,
            password: thePassword
        };
        const r = await apiService("/auth/register", "POST", bodyObject);
        const token = r;
        if (token) {
            localStorage.setItem("authToken", token);
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

    return (
        <>
            <Nav />
            <h1>Register Page</h1>
            <form>
                <input type="email" placeholder="Email" value={theEmail} onChange={hEmail}></input>
                <input type="text" placeholder="Username" value={theUsername} onChange={hUsername}></input>
                <input type="password" placeholder="Password" value={thePassword} onChange={hPassword}></input>
                <button className="btn-btn-primary" onClick={verifyRegister}>Register!</button>
            </form>
        </>
    );
};

interface RegisterProps { }

export default Register;
