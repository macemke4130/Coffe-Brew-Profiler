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

const Profile = (props: Profile) => {
    const [b, setB] = useState<IBarista>();
    const [loaded, setLoaded] = useState<Boolean>(false);
    const [totalBrews, setTotalBrews] = useState<number>(0);
    const [timeBrewing, setTimeBrewing] = useState<string>("0:00");
    const [totalGrams, setTotalGrams] = useState<number>(0);

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
                setB(v[0][0]); // Barista Info --
                setTotalBrews(v[1][0].brews); // Total Brews --
                setTimeBrewing(formatFromSeconds(v[2][0].brewseconds)); // Total Time Brewing --
                setTotalGrams(v[3][0].grams); // Total Grams of Coffee --
                setLoaded(true);
            });
    }

    if (loaded === true) {
        return (
            <>
                <Nav />
                <h2>Hello {b.username}</h2>
                <div>
                    <p>Member since <Moment format="MMMM DD, YYYY">{b._created}</Moment></p>
                    {b.role === 1 && <p>Admin Account</p>}
                    <p>Email Address: {b.email}<br></br>Favorite Bloom Time: {b.bloom} seconds</p>
                    <p>Total Brews: {totalBrews}<br></br>
                    Total Time Brewing: {timeBrewing}<br></br>
                    Total Coffee Brewed: {totalGrams} grams</p>

                </div>
            </>
        );
    } else {
        return (<><Nav /><Loading /></>);
    }

};

interface Profile { }

export default Profile;
