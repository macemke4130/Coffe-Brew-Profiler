import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { IOption } from '../../utils/types';
import Nav from '../Nav';

const SelectBrewMethod = (props: SelectBrewMethodProps) => {
    const [brewMethods, setBrewMethods] = useState<Array<IOption>>([]);
    const [thebrewMethod, setTheBrewMethod] = useState<string>('');

    useEffect(() => {
        getBreMethods();
    }, []);
    
    const getBreMethods = async () => {
        const r = await apiService("/api/options/brewmethods");
        setBrewMethods(r);
    }

    return (
        <>
            <p>Select Brew Method</p>
            <select onChange={props.theView}>
                <option>-- Please Select Brew Method --</option>
                {brewMethods?.map(brew => (
                    <option key={brew.id} value={brew.id}>{brew.name}</option>
                ))}
                <option disabled={true}>-- Coming Soon! --</option>
                <option disabled={true}>- Hario V60</option>
                <option disabled={true}>- AeroPress</option>
                <option disabled={true}>- French Press</option>
                <option disabled={true}>- Drip Machine</option>
            </select>
        </>

    );
};

interface SelectBrewMethodProps {
    theView: any
 }

export default SelectBrewMethod;
