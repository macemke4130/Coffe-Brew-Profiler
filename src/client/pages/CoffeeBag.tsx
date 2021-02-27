import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { IOption } from '../utils/types';

const CoffeeBag = (props: CoffeeBagProps) => {
    const [allBrands, setAllBrands] = useState<Array<IOption>>([]);
    const [allProcesses, setAllProcesses] = useState<Array<IOption>>([]);
    const [theBrand, setTheBrand] = useState<string>('');
    const [theProcess, setTheProcess] = useState<string>('');

    const history = useHistory();

    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = async () => {
        const rBrands = apiService("/api/options/brands");
        const rProcesses = apiService("/api/options/processes");
        Promise.all([rBrands, rProcesses])
        .then(v => {
            setAllBrands(v[0]);
            setAllProcesses(v[1]);
        })
    }

    const hCoffeeBagMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
    }

    return (
        <>
            <Nav />
            <h1>CoffeeBag Page</h1>
            <select onChange={hCoffeeBagMethod}>
                <option>-- Please Select Coffee Roaster --</option>
                {allBrands?.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>
            <select onChange={hCoffeeBagMethod}>
                <option>-- Please Select Process --</option>
                {allProcesses?.map(process => (
                    <option key={process.id} value={process.id}>{process.name}</option>
                ))}
            </select>

        </>
    );
};

interface CoffeeBagProps { }

export default CoffeeBag;
