import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { ICoffeeBag } from '../utils/types';

const AllBrews = (props: AllBrewsProps) => {
    const [theBarista, setTheBarista] = useState<number>(0);
    const [allBrews, setAllBrews] = useState<Array<any>>([]); //IBrew --

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService("/api/users/who");
        setTheBarista(rWho);
        
        const rAllBrews = await apiService("/api/brews/all/" + rWho);
        setAllBrews(rAllBrews);
    }

    return (
        <>
            <Nav />
            <h1>All Brews Page</h1>
            {allBrews?.map(brew => (
                <div key={brew.id}>
                    <Link to={"/brew/details/" + brew.id}><h4>{brew.coffeename}</h4></Link>
                    <p>{brew.brewmethod} <small>brewed on</small> <Moment format="MMMM DD, YYYY">{brew._createdat}</Moment></p>
                    <hr></hr>
                </div>
            ))}
        </>
    );
};

interface AllBrewsProps { }

export default AllBrews;
