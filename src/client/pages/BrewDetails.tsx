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
    const [brewTime, setBrewTime] = useState<string>("0:00");
    const [bloomToBrewWeightPercent, setBloomToBrewWeightPercent] = useState<number>(0);
    const [bloomToBrewTimePercent, setBloomtoBrewTimePercent] = useState<number>(0);
    const [yeildPercent, setYeildPercent] = useState<number>(0);
    const [coffeeHeld, setCoffeeHeld] = useState<number>(0);

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rBrew = await apiService("/api/brews/details/" + id);
        if (rBrew.status === 418) { // I'm a Teapot! --
            const b: IBrew = rBrew.data[0]; // b is for Brew --
            
            // Do Math with b --
            setBrewTime(Math.floor(b.brewtimeinsec / 60) + ":" + (b.brewtimeinsec % 60));

            const gl = (((b.gramspregrind - b.gramspostgrind) / b.gramspregrind) * 100).toFixed(2);
            setGrindLoss(Number(gl));

            const btbWeight = (b.bloomweight / b.brewtimeinsec * 100).toFixed(2);
            setBloomToBrewWeightPercent(Number(btbWeight));

            const btbTime = (b.bloomtimeinsec / b.brewtimeinsec * 100).toFixed(2);
            setBloomtoBrewTimePercent(Number(btbTime));

            const ytbWeight = (b.yeild / b.brewweight * 100).toFixed(2);
            setYeildPercent(Number(ytbWeight));
            
            const held = (b.brewweight - b.yeild);
            setCoffeeHeld(Number(held));
           
            // Set b to State and Re-Render --
            setB(b);
            setLoading(false);
        }
    }

    if (loading === true) { return (<><Nav /> <h1>Loading...</h1></>) } else {
        return (
            <>
                <Nav />
                <div>
                    <h4>{b.coffeename}</h4>
                    <p>Roasted on <Moment format="MMMM DD, YYYY">{b.roasteddate}</Moment> and Brewed on <Moment format="MMMM DD, YYYY">{b._createdat}</Moment></p>
                </div>
                <p>{b.grinder} at setting {b.grindsize}.</p>
                <p>{b.gramspregrind} grams in and {b.gramspostgrind} grams out. {grindLoss}% loss.</p>
                <p>{b.watertempprebrew} Degrees Farenheight beginning Water temp.</p>
                <p>{b.bloomtimeinsec} second Bloom. {bloomToBrewTimePercent}% of total Brew Time.</p>
                <p>{b.bloomweight} grams of water in Bloom. {bloomToBrewWeightPercent}% of total Brew weight.</p>
                <p>Brew Time: {brewTime}</p>
                <p>Coffee Yeild: {b.yeild} grams - {yeildPercent}% of Total Brew Weight</p>
                <p>{coffeeHeld} grams of water lost in grounds.</p>
            </>
        );
    }
};

interface BrewDetails { }

export default BrewDetails;
