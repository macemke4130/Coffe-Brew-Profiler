import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { IOption } from '../utils/types';

const NewBrew = (props: NewBrewProps) => {
    const [brewMethods, setBrewMethods] = useState<Array<IOption>>([]);
    const [thebrewMethod, setTheBrewMethod] = useState<string>('');

    const history = useHistory();

    useEffect(() => {
        getBreMethods();
    }, []);

    const getBreMethods = async () => {
        const r = await apiService("/api/options/brewmethods");
        setBrewMethods(r);
    }

    const hBrewMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheBrewMethod(e.target.value);
        // Needs Conditional --
        history.push("brew/chemex/3");
    }

    return (
        <>
            <Nav />
            <h1>Brew Page</h1>
            <p>Select Brew Method</p>
            <select onChange={hBrewMethod}>
                <option>-- Please Select Brew Method --</option>
                {brewMethods?.map(brew => (
                    <option key={brew.id} value={brew.id}>{brew.name}</option>
                ))}
            </select>

        </>
    );
};

interface NewBrewProps { }

export default NewBrew;
