import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';

const Login = (props: LoginProps) => {
    const [theEmail, setTheEmail] = useState<string>('');
    const [thePassword, setThePassword] = useState<string>('');

    const history = useHistory();

    const verifyLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        sendLogIn();
    }

    const sendLogIn = async () => {
        const bodyObject = {
            email: theEmail,
            password: thePassword
        };
        const r = await apiService("/auth/login", "POST", bodyObject);
        const token = r;
        if (token) {
            localStorage.setItem("authToken", token);
            history.push('/');
        }
    }

    const hEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const hPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThePassword(e.target.value);
    }

    return (
        <>
            <Nav />
            <h1>Log In Page</h1>
            <form>
                <input type="email" placeholder="Email" value={theEmail} onChange={hEmail}></input>
                <input type="password" placeholder="Password" value={thePassword} onChange={hPassword}></input>
                <button className="btn-btn-primary" onClick={verifyLogIn}>Log In!</button>
            </form>
        </>
    );
};

interface LoginProps { }

export default Login;
