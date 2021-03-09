import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { ICoffeeBag } from '../utils/types';

const AllCoffeeBags = (props: AllCoffeeBagsProps) => {
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);

    let theBarista = 0;

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService("/api/users/who");
        theBarista = rWho;
        
        const rCoffeeBags = await apiService("/api/coffee/all/");
        setAllCoffeeBags(rCoffeeBags);
    }

    return (
        <>
            <Nav />
            <h2>Coffees in your Kitchen</h2>
            {allCoffeeBags?.map(bag => (
                <div key={bag.id}>
                    <Link to={"/coffeebags/" + bag.id}><h4>{bag.coffeename}</h4></Link>
                    <h6>{bag.brand}</h6>
                    <hr></hr>
                </div>
            ))}
        </>
    );
};

interface AllCoffeeBagsProps { }

export default AllCoffeeBags;
