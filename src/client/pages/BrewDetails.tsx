import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import Moment from 'react-moment';
import Compare from '../components/Compare';
import BrewOutput from '../components/BrewOutput';

const BrewDetails = (props: BrewDetails) => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Nav />
            <div className="row">
                <div className="col-6">
                    <BrewOutput sourceId={Number(id)} />
                </div>
                <div className="col-6">
                    <Compare sourceId={Number(id)} />
                </div>
            </div>
        </>
    );
};

interface BrewDetails { }

export default BrewDetails;
