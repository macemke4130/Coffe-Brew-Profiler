import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import Loading from '../components/Loading';
import apiService from '../utils/api-service';
import { IBrew, ICoffeeBag } from '../utils/types';

const Compare = (props: CompareProps) => {
    const [compare, setCompare] = useState<Array<IBrew>>([]);
    const [control, setControl] = useState<number>(0);
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


    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rList = await apiService("/api/brews/list/");
        setCompare(rList);
    }

    // This is a hack. Moment.JS produces Object Object inside of an <option> tag --
    const dateFormat = (x: any) => {
        return x.split("T")[0];
    }

    const hCompare = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setControl(Number(e.target.value));
        getControl(Number(e.target.value));
    }

    const getControl = async (id: number) => {
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

            // Set b to State and Re-Render --
            setB(b);
            console.log(b);
            setLoading(false);
        }
    }

    if (control === 0) {
        return (
            <>
                <h4>Compare with...</h4>
                <select value={control} onChange={hCompare}>
                    <option value="0">Select a Brew...</option>
                    {compare?.map(brew => (
                        <option key={brew.id} value={brew.id}>
                            {dateFormat(brew._createdat)} - {brew.coffeename} - {brew.brewmethod}
                        </option>
                    ))}
                </select>
            </>
        )
    } else {
        if (loading === false) {
            return (
                <>
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
                    { b.drawdownstart && <p>Draw Down Duration: {drawDown} - {drawDowntoBrewPercent}% of total Brew Time.</p>}
                    <p>Coffee Yeild: {b.yeild} grams - {yeildPercent}% of Total Brew Weight</p>
                    <p>{coffeeHeld} grams / ml of water lost in grounds.</p>
                </>
            );
        } else {
            return (
                <Loading />
            );
        }

    }
};

interface CompareProps { }

export default Compare;
