import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { ICoffeeBag } from '../utils/types';

const NewCoffeeBag = (props: NewCoffeeBagProps) => {
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);

    let theBarista = 0;

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService("/api/users/who");
        theBarista = rWho;
        
        const rCoffeeBags = await apiService("/api/coffee/all/" + theBarista);
        setAllCoffeeBags(rCoffeeBags);
    }

    return (
        <>
            <Nav />
            <h1>CoffeeBag Page</h1>
            {allCoffeeBags?.map(bag => (
                <div key={bag.id}>
                    <Link to={"/coffeebags/" + bag.id}><h4>{bag.coffeename}</h4></Link>
                    <p>{bag.brand}</p>
                    <p>{bag.region}</p>
                    <p>{bag.breed}</p>
                    <hr></hr>
                </div>
            ))}
        </>
    );
};

interface NewCoffeeBagProps { }

export default NewCoffeeBag;
