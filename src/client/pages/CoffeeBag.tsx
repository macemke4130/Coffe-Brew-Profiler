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
    const [theCoffee, setTheCoffee] = useState<string>('');
    const [theRegion, setTheRegion] = useState<string>('');
    const [theElevation, setTheElevation] = useState<number>(0);
    const [theCultivar, setTheCultivar] = useState<string>('');
    const [theBlend, setTheBlend] = useState<number>(0);

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

    const hBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheBrand(e.target.value);
    }

    const hProcess = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheProcess(e.target.value);
    }

    const hTheCoffee = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheCoffee(e.target.value);
    }

    const hTheRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheRegion(e.target.value);
    }

    const hTheElevation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheElevation(Number(e.target.value));
    }

    const hTheCultivar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheCultivar(e.target.value);
    }

    const hBlend = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheBlend(Number(e.target.value));
    }

    const verifyBag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const bodyObject = {
            brand: theBrand,
            name: theCoffee,
            region: theRegion,
            elevationabovesealevelinmeters: theElevation,
            breed: theCultivar,
            process: theProcess,

        }
    }

    return (
        <>
            <Nav />
            <h1>CoffeeBag Page</h1>
            <form className="d-flex flex-column">
                <select onChange={hBrand}>
                    <option>-- Please Select Coffee Roaster --</option>
                    {allBrands?.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                <select onChange={hProcess}>
                    <option>-- Please Select Process --</option>
                    {allProcesses?.map(process => (
                        <option key={process.id} value={process.id}>{process.name}</option>
                    ))}
                </select>
                <input type="text" placeholder="Coffee Name" value={theCoffee} onChange={hTheCoffee}></input>
                <input type="text" placeholder="Region(s)" value={theRegion} onChange={hTheRegion}></input>
                <input type="text" placeholder="Elevation" value={theElevation} onChange={hTheElevation}></input>
                <input type="text" placeholder="Cultivar" value={theCultivar} onChange={hTheCultivar}></input>
                <select onChange={hBlend}>
                    <option value="0">Single Origin</option>
                    <option value="1">Blend</option>
                </select>
                <button className="btn btn-primary" onClick={verifyBag}>Submit Bag</button>
            </form>
        </>
    );
};

interface CoffeeBagProps { }

export default CoffeeBag;
