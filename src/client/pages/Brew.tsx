import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const Brew = (props: BrewProps) => {


    return (
        <>
            <Nav />
            <h1>Brew Page</h1>
        </>
    );
};

interface BrewProps { }

export default Brew;
