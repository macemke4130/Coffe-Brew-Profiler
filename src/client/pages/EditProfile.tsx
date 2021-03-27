import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import Moment from 'react-moment';
import Compare from '../components/Compare';
import BrewOutput from '../components/BrewOutput';
import formatFromSeconds from '../utils/formatFromSeconds';

const EditProfile = (props: EditProfile) => {
    const [b, setB] = useState<IBarista>();
    const [loaded, setLoaded] = useState<Boolean>(false);
    const [passwordToggle, setPasswordToggle] = useState<Boolean>(false);
    const [totalBrews, setTotalBrews] = useState<number>(0);
    const [timeBrewing, setTimeBrewing] = useState<string>("0:00");
    const [totalGrams, setTotalGrams] = useState<number>(0);
    const [theUsername, setTheUsername] = useState<string>("");
    const [theEmail, setTheEmail] = useState<string>("");
    const [staticEmail, setStaticEmail] = useState<string>("");
    const [theBloom, setTheBloom] = useState<number>(0);
    const [theOldPassword, setTheOldPassword] = useState<string>("");
    const [theNewPassword, setTheNewPassword] = useState<string>("");
    const [theNewPassword2, setTheNewPassword2] = useState<string>("");

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const b = apiService('/api/users/profile');
        const b1 = apiService('/api/users/brews');
        const b2 = apiService('/api/users/seconds');
        const b3 = apiService('/api/users/grams');
        Promise.all([b, b1, b2, b3])
            .then(v => {
                const b = v[0][0];
                setB(b); // Barista Info --
                setTotalBrews(v[1][0].brews); // Total Brews --
                setTimeBrewing(formatFromSeconds(v[2][0].brewseconds)); // Total Time Brewing --
                setTotalGrams(v[3][0].grams); // Total Grams of Coffee --

                setTheUsername(b.username);
                setTheEmail(b.email);
                setStaticEmail(b.email);
                setTheBloom(b.bloom);

                setLoaded(true);
            });
    }

    const hSubmit = () => {
        if (passwordToggle === false) {
            profileChange();
        } else {
            passwordChange();
        }
    }

    const profileChange = async () => {
        const bodyObject = {
            username: theUsername,
            bloom: theBloom,
            email: theEmail
        }
        const r = await apiService('/api/users/updateprofile', "PUT", bodyObject);
        history.push("/profile");
    }

    const passwordChange = async () => {
        const passwordCheck = {
            email: staticEmail, // Exists in case the user changes their email address along with the password --
            password: theOldPassword
        }
        const r = await apiService('/auth/login/passwordcheck', "POST", passwordCheck);
        if (r === true) { // If the old password is a match --
            if (theNewPassword === theNewPassword2) { // If the new passwords match --
                const newPassword = {
                    password: theNewPassword
                }
                const r = await apiService('/auth/login/setnewpassword', "PUT", newPassword);
                if (r) {
                    profileChange();
                }
            } else {
                alert("New Passwords do not match. Try again.");
            }
        } else {
            alert("Current Password Not Accepted. Logging Out.");
            localStorage.clear();
            history.push('/login');
        }
    }

    const hTheUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheUsername(e.target.value);
    }

    const hTheEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const hTheBloom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBloom(Number(e.target.value));
    }

    const hEditPassword = () => {
        setPasswordToggle(true);
    }

    const hOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheOldPassword(e.target.value);
    }

    const hNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheNewPassword(e.target.value);
    }

    const hNewPassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheNewPassword2(e.target.value);
    }

    if (loaded === true) {
        return (
            <>
                <Nav />
                <h2>Edit Profile Information</h2>
                <div>

                    <p>Username / First Name: <input type="text" value={theUsername} onChange={hTheUsername}></input></p>
                    <p>Email Address: <input type="text" value={theEmail} onChange={hTheEmail}></input></p>
                    <p>Favorite Bloom Time: <input type="number" value={theBloom} onChange={hTheBloom}></input></p>
                    {
                        passwordToggle === false ?
                            <p><button onClick={hEditPassword} className="btn btn-primary btn-sm">Edit Password?</button></p>
                            :
                            <div>
                                <hr></hr>
                                <p>Current Password: <input type="password" value={theOldPassword} onChange={hOldPassword}></input></p>
                                <p>New Password: <input type="password" value={theNewPassword} onChange={hNewPassword}></input></p>
                                <p>Confirm New Password: <input type="password" value={theNewPassword2} onChange={hNewPassword2}></input></p>
                                <hr></hr>
                            </div>
                    }
                    <button onClick={hSubmit} className="btn btn-primary btn-sm">Submit</button>
                </div>
            </>
        );
    } else {
        return (<><Nav /><Loading /></>);
    }

};

interface EditProfile { }

export default EditProfile;
