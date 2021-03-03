import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';
import Nav from '../components/Nav';

const BrewDetails = (props: BrewDetails) => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [b, setB] = useState<IBrew>();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rBrew = await apiService("/api/brews/details/" + id);
        if (rBrew.status === 418) { // I'm a Teapot! --
            setB(rBrew.data[0]);
            setLoading(false);
            console.log(rBrew.data[0]);
        }
    }

    if (loading === true) { return (<><Nav /> <h1>Loading...</h1></>) } else {
        return (
            <>
                <Nav />
                <h1>Brew Details Page</h1>
                <h4>{b.coffeename}</h4>
            </>

        );
    }
};

interface BrewDetails { }

export default BrewDetails;
