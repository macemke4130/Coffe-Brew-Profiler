import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';
import Nav from '../components/Nav';
import Moment from 'react-moment';

const BrewDetails = (props: BrewDetails) => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [b, setB] = useState<IBrew>();
    const [grindLoss, setGrindLoss] = useState<number>(0);

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rBrew = await apiService("/api/brews/details/" + id);
        if (rBrew.status === 418) { // I'm a Teapot! --
            setB(rBrew.data[0]);
            setLoading(false);
            doMath();
        }
    }

    const doMath = () => {
        setGrindLoss(b.gramspregrind - b.gramspostgrind);
    }

    if (loading === true) { return (<><Nav /> <h1>Loading...</h1></>) } else {
        return (
            <>
                <Nav />
                <div>
                    <h4>{b.coffeename}</h4>
                    <p>Roasted on <Moment format="MMMM DD, YYYY">{b.roasteddate}</Moment> and Brewed on: <Moment format="MMMM DD, YYYY">{b._createdat}</Moment></p>
                </div>
                <p>{b.grinder} at setting {b.grindsize}.</p>
                <p>{b.gramspregrind} grams in and {b.gramspostgrind} grams out. {grindLoss}% loss.</p>
                <p>{b.watertempprebrew} Degrees Farenheight beginning Water temp.</p>
                <p>{b.bloomtimeinsec} Degrees Farenheight beginning Water temp.</p>
            </>

        );
    }
};

interface BrewDetails { }

export default BrewDetails;
