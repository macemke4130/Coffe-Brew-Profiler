import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { ICoffeeBag } from '../utils/types';

const SingleCoffeeBag = (props: SingleCoffeeBagProps) => {
    const { id } = useParams<{ id: string }>();
    let theBarista = 0;
    const [bag, setBag] = useState<ICoffeeBag>();
    const [isOwner, setIsOwner] = useState<Boolean>(false);

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService("/api/users/who");
        theBarista = rWho;
        
        const rCoffeeBag = await apiService("/api/coffee/bag/" + id);
        setBag(rCoffeeBag[0]);

        checkOwner(Number(rCoffeeBag[0].baristaid));
    }

    const checkOwner = (x: number) => {
        if (theBarista === x) {
            setIsOwner(true);
        }
    }

    return (
        <>
            <Nav />
            <h1>Single CoffeeBag Page</h1>
            <h4>{bag?.coffeename}</h4>
            <p>{bag?.brand}</p>
            <p>{bag?.breed}</p>
            <p>{bag?.process}</p>
            <p>{bag?.region}</p>
            <p>{bag?.elevation}</p>
            {isOwner && <button>Edit Coffee Bag</button>}
            {isOwner && <button>Delete Coffee Bag</button>}
        </>
    );
};

interface SingleCoffeeBagProps { }

export default SingleCoffeeBag;
