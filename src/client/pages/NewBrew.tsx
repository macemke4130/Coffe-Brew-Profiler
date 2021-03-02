import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import Chemex from '../components/brewmethods/Chemex';

import apiService from '../utils/api-service';
import { IOption } from '../utils/types';
import SelectBrewMethod from '../components/brewmethods/SelectBrewMethod';

const NewBrew = (props: NewBrewProps) => {
    const [theView, setTheView] = useState<number>(0);

    const history = useHistory();

    const hView = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheView(Number(e.target.value));
    }

    switch (theView) {
        case 0:
            return (
                <>
                    <Nav />
                    <SelectBrewMethod theView={hView} />
                </>
            );
            break;
        case 1:
            return (
                <>
                    <Nav />
                    <Chemex />
                </>
            )
            break;
        case 2:
            return (
                <>
                    <Nav />
                    <h1>Hario V60</h1>
                </>
            )
            break;
            case 3:
            return (
                <>
                    <Nav />
                    <h1>Kona</h1>
                </>
            )
            break;
            case 4:
            return (
                <>
                    <Nav />
                    <h1>AeroPress</h1>
                </>
            )
            break;
            case 5:
            return (
                <>
                    <Nav />
                    <h1>French Press</h1>
                </>
            )
            break;
            case 6:
            return (
                <>
                    <Nav />
                    <h1>Kalita Wave</h1>
                </>
            )
            break;
            case 7:
            return (
                <>
                    <Nav />
                    <h1>Clever</h1>
                </>
            )
            break;
        default:
            break;
    }
};

interface NewBrewProps { }

export default NewBrew;
