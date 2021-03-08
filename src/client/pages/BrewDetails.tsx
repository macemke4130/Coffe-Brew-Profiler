import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import Moment from 'react-moment';
import Compare from '../components/Compare';

const BrewDetails = (props: BrewDetails) => {
    const { id } = useParams<{ id: string }>();
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
            const b: IBrew = rBrew.data[0]; // b is for Brew --S

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

    if (loading === true) { return (<><Nav /><Loading /></>) } else {
        return (
            <>
                <Nav />
                <div className="row">
                    <div className="col-6">
                        <div>
                            <h4>{b.coffeename}</h4>
                            <h5>{b.brandname}</h5>
                            <h5>{b.brewmethod}</h5>
                            <p>Roasted on <Moment format="MMMM DD, YYYY">{b.roasteddate}</Moment><br></br>
                    Brewed on <Moment format="MMMM DD, YYYY">{b._createdat}</Moment></p>
                            <p>{theDelta} days since roast.</p>
                        </div>
                        <p>Brew Ratio - Coffee to Water: 1:{ratio}</p>
                        <p>Coffee Filter: {b.filter}</p>
                        <p>{b.grinder} at setting {b.grindsize}</p>
                        <p>{b.gramspostgrind} grams of Coffee</p>
                        <p>{b.watertempprebrew} Degrees Farenheight beginning Water temp.</p>
                        <p>{b.bloomtimeinsec} second Bloom. {bloomToBrewTimePercent}% of total Brew Time.</p>
                        <p>{b.bloomweight} grams of water in Bloom.<br></br>
                            {bloomToBrewWeightPercent}% of total Brew weight.</p>
                        <p>Brew Time: {brewTime}</p>
                        <p>Brew Weight: {b.brewweight} grams</p>
                        {b.drawdownstart && <p>Draw Down Duration: {drawDown} - {drawDowntoBrewPercent}% of total Brew Time.</p>}
                        <p>Coffee Yeild: {b.yeild} grams - {yeildPercent}% of Total Brew Weight</p>
                        <p>{coffeeHeld} grams / ml of water lost in grounds.</p>
                        {b.barista === loggedIn && <button onClick={hDestroy}>Delete Brew</button>}
                        {b.barista === loggedIn && <button onClick={hEdit}>Edit Brew</button>}
                    </div>
                    <div className="col-6">
                        <Compare />
                    </div>
                </div>
            </>
        );
    }
};

interface BrewDetails { }

export default BrewDetails;
