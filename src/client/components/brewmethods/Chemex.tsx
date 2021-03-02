import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { ICoffeeBag } from '../../utils/types';
import Nav from '../Nav';

const Chemex = (props: ChemexProps) => {
    let theBarista = 0;
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);


    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService('/api/users/who');
        theBarista = rWho;

        const cb = await apiService('/api/coffee/all/' + theBarista);
        setAllCoffeeBags(cb);
    }


    return (
        <>
            <h1>Chemex</h1>
            <label className="mr-2">Coffee: </label>
            <select>
                {allCoffeeBags?.map(bag => (
                    <option key={bag.id} value={bag.id}>{bag.coffeename}</option>
                ))}
            </select>
        </>

    );
};

interface ChemexProps { }

export default Chemex;
