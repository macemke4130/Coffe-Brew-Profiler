import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav';
import apiService from '../../utils/api-service';
import { IOption } from '../../utils/types';

const Chemex = (props: ChemexProps) => {
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [theGrinder, setTheGrinder] = useState<string>('');

    useEffect(() => {
        getAllOptions();
    }, []);

    const getAllOptions = async () => {
        const fetchAllGrinders = apiService("/api/options/grinders");
        const fetchAllBrewMethods = apiService("/api/options/brewmethods");
        Promise.all([fetchAllGrinders, fetchAllBrewMethods])
        .then((values) => {
            console.log(values[0][0].name);
        });
    }

    const hGrinder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheGrinder(e.target.value);
    }

    return (
        <>
            <Nav />
            <h1>Chemex Page</h1>
            <p>Select Your Grinder</p>
            <select onChange={hGrinder}>
                <option>-- Please Select Grinder --</option>
                {allGrinders?.map(grind => (
                    <option key={grind.id} value={grind.id}>{grind.name}</option>
                ))}
            </select>
        </>
    );
};

interface ChemexProps { }

export default Chemex;
