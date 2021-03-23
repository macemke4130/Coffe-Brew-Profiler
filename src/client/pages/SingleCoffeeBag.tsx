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

    const hEditCoffee = () => {
        history.push("/coffeebags/edit/" + id);
    }

    const hEmptyCoffee = async () => {
        const r = await apiService("/api/coffee/emptybag/", "PUT", { id });
        if (r) history.push("/coffeebags/all/");
    }

    return (
        <>
            <Nav />
            <h4>{bag?.coffeename}</h4>
            <h6>{bag?.brand}</h6>
            {bag?.breed != "" ? <p>Breed: {bag?.breed}</p> : ""}
            {bag?.process != "None" ? <p>Process: {bag?.process}</p> : ""}
            {bag?.region != "" ? <p>Region: {bag?.region}</p> : ""}
            {bag?.elevation != 0 ? <p>Elevation: {bag?.elevation} Meters Above Sea Level</p> : ""}
            <p>{bag?.blend === 0 ? "Single Origin" : "Blend"}</p>
            {isOwner && <button onClick={hEditCoffee} className="btn btn-primary btn-sm mr-3">Edit Coffee Bag</button>}
            {isOwner && <button onClick={hEmptyCoffee} className="btn btn-warning btn-sm">Empty Coffee Bag</button>}
        </>
    );
};

interface SingleCoffeeBagProps { }

export default SingleCoffeeBag;
