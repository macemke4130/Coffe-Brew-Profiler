import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import Loading from './Loading';
import apiService from '../utils/api-service';
import { IBrew, ICoffeeBag } from '../utils/types';

const BrewOutput = (props: BrewOutputProps) => {
    const id = props.sourceId;
    const [loggedIn, setLoggedIn] = useState<number>(0);
    const [loading, setLoading] = useState<Boolean>(true);
    const [b, setB] = useState<IBrew>();
    const [ratio, setRatio] = useState<number>(0);
    const [grindLoss, setGrindLoss] = useState<number>(0);
    const [brewTime, setBrewTime] = useState<string>("0:00");
    const [bloomToBrewWeightPercent, setBloomToBrewWeightPercent] = useState<number>(0);
    const [bloomToBrewTimePercent, setBloomtoBrewTimePercent] = useState<number>(0);
    const [yeildPercent, setYeildPercent] = useState<number>(0);
    const [drawDown, setDrawDown] = useState<string>("0:00");
    const [drawDowntoBrewPercent, setDrawDowntoBrewPercent] = useState<number>();
    const [coffeeHeld, setCoffeeHeld] = useState<number>(0);
    const [theDelta, setTheDelta] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rDelta = await apiService("/api/brews/delta/" + id);
        setTheDelta(rDelta[0].delta);

        const rBrew = await apiService("/api/brews/details/" + id);
        if (rBrew.status === 418) { // I'm a Teapot! --
            const b: IBrew = rBrew.data[0]; // b is for Brew --

            // Do Math with b --
            setBrewTime(Math.floor(b.brewtimeinsec / 60) + ":" + (b.brewtimeinsec % 60));

            const btbWeight = (b.bloomweight / b.brewtimeinsec * 100).toFixed(2);
            setBloomToBrewWeightPercent(Number(btbWeight));

            const btbTime = (b.bloomtimeinsec / b.brewtimeinsec * 100).toFixed(2);
            setBloomtoBrewTimePercent(Number(btbTime));

            const ytbWeight = (b.yeild / b.brewweight * 100).toFixed(2);
            setYeildPercent(Number(ytbWeight));

            const br = (b.brewweight / (b.gramspostgrind || b.gramspregrind)).toFixed(2);
            setRatio(Number(br));

            const held = (b.brewweight - b.yeild);
            setCoffeeHeld(Number(held));

            if (b.drawdownstart) {
                const drawDownDuration = b.brewtimeinsec - b.drawdownstart;
                const drawDownTimeFormat = Math.floor(drawDownDuration / 60) + ":" + (drawDownDuration % 60);

                setDrawDown(drawDownTimeFormat);
                setDrawDowntoBrewPercent(Number(((drawDownDuration / b.brewtimeinsec) * 100).toFixed(2)));
            }

            // Get Barista Number --
            const rWho = await apiService("/api/users/who");
            setLoggedIn(rWho);

            // Set b to State and Re-Render --
            setB(b);
            setLoading(false);
        }
    }

    const hDestroy = async () => {
        const rDestroy = await apiService("/api/brews/destroy", "PUT", { id });
        if (rDestroy.success) history.goBack();
    }

    const hEdit = async () => {

    }

    if (loading === true) { return (<><Loading /></>) } else {
        return (
            <>
                <h5>{b.coffeename} - {b.brandname}</h5>
                <h5>{b.brewmethod}</h5>
                <p>Roasted on <Moment format="MMMM DD, YYYY">{b.roasteddate}</Moment><br></br>
                        Brewed on <Moment format="MMMM DD, YYYY">{b._createdat}</Moment><br></br>
                    {theDelta} days since roast</p>
                <p>Coffee Filter: {b.filter}</p>
                <p>{b.grinder} at setting {b.grindsize}</p>
                <p>Coffee Grams: {b.gramspostgrind}<br></br>Brew Ratio: {ratio}</p>
                <p>Beginning Water Temp: {b.watertempprebrew}°F</p>
                <p>Bloom Time: {b.bloomtimeinsec} seconds<br></br>
                    {bloomToBrewTimePercent}% of total Brew Time</p>
                <p>Bloom Water Weight: {b.bloomweight} grams / ml<br></br>
                    {bloomToBrewWeightPercent}% of total Brew weight</p>
                <p>Brew Duration: {brewTime}<br></br>
                Brew Weight: {b.brewweight} grams / ml</p>
                { b.drawdownstart && <p>Draw Down Duration: {drawDown}<br></br>
                    {drawDowntoBrewPercent}% of total Brew Duration</p>}
                <p>Coffee Yeild: {b.yeild} grams / ml<br></br>
                    {yeildPercent}% of Total Brew Water Weight<br></br>
                    Water Loss: {coffeeHeld} grams / ml</p>
            </>
        );
    }
};

interface BrewOutputProps {
    sourceId: number
}

export default BrewOutput;