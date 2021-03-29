import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { IOption } from '../utils/types';

const NewFilter = (props: NewFilterProps) => {
    const [theBrand, setTheBrand] = useState<string>("");
    const [theName, setTheName] = useState<string>("");
    const [theStyle, setTheStyle] = useState<string>("");

    const history = useHistory();

    useEffect(() => {

    }, []);

    const hTheBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBrand(e.target.value);
    }

    const hTheName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheName(e.target.value);
    }

    const hTheStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheStyle(e.target.value);
    }

    const verifyFilter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (theBrand === "" || theName === "" || theStyle === ""){
            alert("Please fill out all fields.");
            return;
        }

        const bodyObject = {
            brand_name_style: theBrand + " - " + theName + " - " + theStyle
        }
        const r = await apiService("/api/filters/new", "POST", bodyObject);
        if (r.serverStatus === 2) history.push('/brews/new');
    }

    return (
        <>
            <Nav />
            <h1>Add New Filter</h1>
            <form className="d-flex flex-column">
                <input type="text" placeholder="Brand" value={theBrand} onChange={hTheBrand}></input>
                <small className="mb-3">Chemex, Hario...</small>
                <input type="text" placeholder="Name" value={theName} onChange={hTheName}></input>
                <small className="mb-3">Bleached, Unbleached...</small>
                <input type="text" placeholder="Number or Style" value={theStyle} onChange={hTheStyle}></input>
                <small className="mb-3">4, Basket, Cone, Sock...</small>
                <button className="btn btn-primary" onClick={verifyFilter}>Submit Filter</button>
            </form>
        </>
    );
};

interface NewFilterProps { }

export default NewFilter;
