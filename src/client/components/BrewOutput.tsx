import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import Loading from './Loading';
import apiService from '../utils/api-service';
import formatFromSeconds from '../utils/formatFromSeconds';
import { IBrew, ICoffeeBag } from '../utils/types';

const BrewOutput = (props: BrewOutputProps) => {
    const id = props.sourceId;
    const [loggedIn, setLoggedIn] = useState<number>(0);
    const [loading, setLoading] = useState<Boolean>(true);
    const [b, setB] = useState<IBrew>();
    const [ratio, setRatio] = useState<number>(0);
    const [brandName, setBrandName] = useState<string>("");
    const [brewTime, setBrewTime] = useState<string>("0:00");
    const [bloomToBrewWeightPercent, setBloomToBrewWeightPercent] = useState<number>(0);
    const [bloomToBrewTimePercent, setBloomtoBrewTimePercent] = useState<number>(0);
    const [yeildPercent, setYeildPercent] = useState<number>(0);
    const [drawDown, setDrawDown] = useState<string>("0:00");
    const [drawDowntoBrewPercent, setDrawDowntoBrewPercent] = useState<number>();
    const [coffeeHeld, setCoffeeHeld] = useState<number>(0);
    const [theDelta, setTheDelta] = useState<number>(0);
    const [drawDownStart, setDrawDownStart] = useState<string>("0:00");

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

            // Heroku Server will not allow two subqueries. This is a workaround --
            const rBrand = await apiService('/api/roasters/name/' + b.coffeebrand);
            setBrandName(rBrand[0].name);

            // Do Math with b --
            setBrewTime(formatFromSeconds(b.brewtimeinsec));

            setDrawDownStart(formatFromSeconds(b.drawdownstart));

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

            if (b.drawdownstart != 0 && b.drawdownstart != null) {
                const drawDownDuration = b.brewtimeinsec - b.drawdownstart;
                const drawDownTimeFormat = formatFromSeconds(drawDownDuration);

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

    const hEdit = async () => {
        history.push('/brew/edit/' + id);
    }

    if (loading === true) { return (<><Loading /></>) } else {
        return (
            <>
                <div className="bg-light p-2 d-flex flex-column align-items-center">
                    <h5>{b.coffeename}</h5>
                    <h6>{brandName}</h6>
                    <h6>{b.brewmethod}</h6>
                </div>
                <div className="bg-white p-2">
                    <p className="text-center">
                        {b.roasteddate != "1970-01-01T06:00:00.000Z" ? <span>Roasted on <Moment format="MMMM DD, YYYY">{b.roasteddate}</Moment><br></br></span> : ""}
                        Brewed on <Moment format="MMMM DD, YYYY">{b._createdat}</Moment><br></br>
                        {b.roasteddate != "1970-01-01T06:00:00.000Z" ? <span>{theDelta} days since roast</span> : ""}
                    </p>
                </div>
                <div className="bg-light p-2">
                    <p className="text-center">Filter: {b.filter}<br></br>
                        {b.grinder} Setting: <strong>{b.grindsize}</strong></p>
                </div>
                <div className="bg-white p-2">
                    <p className="text-center">Coffee: <strong>{b.gramspostgrind}</strong> grams<br></br>
                    Water: <strong>{b.brewweight}</strong> grams / ml<br></br>
                    Brew Ratio: <strong>1:{ratio}</strong></p>
                </div>
                <div className="bg-light p-2">
                    <p className="text-center">Beginning Water Temp: <strong>{b.watertempprebrew}</strong>°F</p>
                </div>
                <div className="bg-white p-2">
                    <p className="text-center">Bloom Time: <strong>{b.bloomtimeinsec}</strong> seconds<br></br>
                        <strong>{bloomToBrewTimePercent}</strong>% of total Brew Time</p>
                </div>
                <div className="bg-light p-2">
                    <p className="text-center">Bloom Water: <strong>{b.bloomweight}</strong> grams / ml<br></br>
                        <strong>{bloomToBrewWeightPercent}</strong>% of total Brew weight</p>
                </div>
                <div className="bg-white p-2">
                    <p className="text-center">Brew Duration: <strong>{brewTime}</strong></p>
                </div>
                <div className="bg-light p-2">
                    {drawDown != "0:00" && <p className="text-center">Draw Down Start Time: <strong>{drawDownStart}</strong><br></br>Draw Down Duration: <strong>{drawDown}</strong><br></br><strong>{drawDowntoBrewPercent}</strong>% of total Brew Duration</p>}
                </div>
                <div className="bg-white p-2">
                    <p className="text-center">Coffee Yeild: <strong>{b.yeild}</strong> grams / ml<br></br>
                        <strong>{yeildPercent}</strong>% of Total Brew Water Weight<br></br>
                    Water Loss: <strong>{coffeeHeld}</strong> grams / ml</p>
                </div>
                {b.tastingnote && <p>Tasting Notes: <br></br>
                    {b.tastingnote}</p>}
                {b.brewingnote && <p>Brewing Notes: <br></br>
                    {b.brewingnote}</p>}
                {loggedIn === b.barista ? <button className="btn btn-primary btn-sm m-2" onClick={hEdit}>Add Notes / Edit Brew</button> : ""}
            </>
        );
    }
};

interface BrewOutputProps {
    sourceId: number
}

export default BrewOutput;