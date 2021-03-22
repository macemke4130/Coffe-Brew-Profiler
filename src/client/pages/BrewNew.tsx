import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista, IBrew } from '../utils/types';

import Nav from '../components/Nav';

const BrewNew = (props: BrewNewProps) => {
    const [theMethod, setTheMethod] = useState<number>(0);
    const [theMethodName, setTheMethodName] = useState<string>("");

    // All Options --
    const [theBarista, setTheBarista] = useState<number>(0); // Baristas Table ID --
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [allFilters, setAllFilters] = useState<Array<IOption>>([]);

    // Commons --
    const [theCoffee, setTheCoffee] = useState<number>(0);
    const [theGrinder, setTheGrinder] = useState<number>(1);
    const [theFilter, setTheFilter] = useState<number>(1);
    const [roastedOn, setRoastedOn] = useState<string>("");

    const [bloomTime, setBloomTime] = useState<number>(0);
    const [bloomWeight, setBloomWeight] = useState<number>(0);
    const [grindSize, setGrindSize] = useState<number>(0);
    const [gramsPost, setGramsPost] = useState<number>(0);
    const [waterPre, setWaterPre] = useState<number>(212);
    const [waterPost, setWaterPost] = useState<number>(0);
    const [brewWeight, setBrewWeight] = useState<number>(0);
    const [desiredRatio, setDesiredRatio] = useState<number>(0);
    const [ratioOutput, setRatioOutput] = useState<number>(0);

    const [theDrawDownMinute, setTheDrawDownMinute] = useState<number | null>(0);
    const [theDrawDownSecond, setTheDrawDownSecond] = useState<number | null>(0);
    const [theBrewMinute, setTheBrewMinute] = useState<number>(0);
    const [theBrewSecond, setTheBrewSecond] = useState<number>(0);

    const [yeild, setYeild] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const r0 = apiService('/api/coffee/all/list/'); // List of Coffee Bags --
        const r1 = apiService('/api/options/grinders'); // List of Grinders --
        const r2 = apiService('/api/users/bloom/'); // Get Default Bloom --
        const r3 = apiService('/api/users/who'); // Get Barista ID --
        const r4 = apiService('/api/filters/all'); // List of Filters --
        Promise.all([r0, r1, r2, r3, r4])
            .then(v => {
                setAllCoffeeBags(v[0]);
                setAllGrinders(v[1]);
                setBloomTime(v[2][0].bloom);
                setTheBarista(v[3]);
                setAllFilters(v[4]);
                setTheCoffee(v[0][0].id);

                ratioCalc(Number(localStorage.getItem("CleverRatio")) || 0, gramsPost);
            });
    }

    const hSubmitBrew = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // If Roasted On date is not known --
        const dateCatch = roastedOn === "" ? "1970-01-01" : roastedOn;

        // If the theMethod is not Clever or Aero Press, assign to null --
        let drawDownCatch: number | null;
        if (theMethod === 7 || theMethod === 4) {
            drawDownCatch = (theDrawDownMinute * 60) + theDrawDownSecond;
        } else {
            drawDownCatch = null;
        }

        // French Press should not require a filter field --
        const frenchCatch = theMethod === 5 ? 0 : theFilter;

        const bodyObject = {
            barista: theBarista,
            brewmethod: theMethod,
            coffeebag: theCoffee,
            filter: frenchCatch,
            roasteddate: dateCatch,
            grinder: theGrinder,
            grindsize: grindSize,
            gramspostgrind: gramsPost,
            watertempprebrew: waterPre,
            watertemppostbrew: waterPost,
            bloomtimeinsec: bloomTime,
            bloomweight: bloomWeight,
            brewtimeinsec: (theBrewMinute * 60) + theBrewSecond,
            brewweight: brewWeight,
            drawdownstart: drawDownCatch,
            yeild
        }
        if (theCoffee === 0) {
            alert("Coffee Field Can Not Be Blank.");
        } else {
            console.log(bodyObject);
            const r = await apiService('/api/brews/new', "POST", bodyObject);
            if (r.serverStatus === 2) history.push("/brew/details/" + r.insertId);
        }
    }

    const hCoffeeBag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "Add New") {
            history.push("/coffeebags/new");
        }
        setTheCoffee(Number(e.target.value));
        localStorage.setItem("CoffeeBag", e.target.value);
    }

    const hFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "Add New") {
            history.push("/filters/new");
        }
        setTheFilter(Number(e.target.value));
        localStorage.setItem("CleverFilter", e.target.value);
    }

    const hGrinder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheGrinder(Number(e.target.value));
    }

    const hRoastedOn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoastedOn(e.target.value);
        localStorage.setItem("RoastedOn", e.target.value);
    }

    const hGramsPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGramsPost(Number(e.target.value));
        ratioCalc(desiredRatio, Number(e.target.value));
        localStorage.setItem("CleverGrams", e.target.value);
    }

    const hWaterPre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterPre(Number(e.target.value));
        localStorage.setItem("WaterTempPre", e.target.value);
    }

    const hWaterPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterPost(Number(e.target.value));
        localStorage.setItem("WaterTempPost", e.target.value);
    }

    const hGrindSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrindSize(Number(e.target.value));
        localStorage.setItem("CleverGrindSize", e.target.value);
    }

    const hBloomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomTime(Number(e.target.value));
        localStorage.setItem("CleverBloomTime", e.target.value);
    }

    const hBloomWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomWeight(Number(e.target.value));
        localStorage.setItem("CleverBloomWeight", e.target.value);
    }

    const hBrewWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrewWeight(Number(e.target.value));
        localStorage.setItem("CleverBrewWeight", e.target.value);
    }

    const hYeild = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYeild(Number(e.target.value));
        localStorage.setItem("CleverYeild", e.target.value);
    }

    const hBrewMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBrewMinute(Number(e.target.value));
        localStorage.setItem("CleverBM", e.target.value);
    }

    const hBrewSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBrewSecond(Number(e.target.value));
        localStorage.setItem("CleverBS", e.target.value);
    }

    const hDrawDownMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheDrawDownMinute(Number(e.target.value));
        localStorage.setItem("CleverDDM", e.target.value);
    }

    const hDrawDownSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheDrawDownSecond(Number(e.target.value));
        localStorage.setItem("CleverDDS", e.target.value);
    }

    const hDesiredRatio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesiredRatio(Number(e.target.value));
        ratioCalc(Number(e.target.value), Number(gramsPost));
        localStorage.setItem("CleverRatio", e.target.value);
    }

    const ratioCalc = (ratio: number, grams: number) => {
        setRatioOutput(ratio * grams || 0);
    }

    const hMethod = async (e: any) => {
        setTheMethod(Number(e.target.value));
        setTheMethodName(e.target.innerHTML);

        const prev = await apiService('/api/brews/previous/' + e.target.value);
        if (prev[0] != undefined) {
            const p = prev[0];

            setTheCoffee(p.coffeebag);
            const roasted = p.roasteddate.split("T");
            setRoastedOn(roasted[0]);
            setTheFilter(p.filter);
            setTheGrinder(p.grinder);
            setGrindSize(p.grindsize);
            setGramsPost(p.gramspostgrind);
            setDesiredRatio(Math.floor(p.brewweight / p.gramspostgrind) || 0);
            ratioCalc(Math.floor(p.brewweight / p.gramspostgrind), p.gramspostgrind);
            setWaterPre(p.watertempprebrew);
            setBloomTime(p.bloomtimeinsec);
            setBloomWeight(p.bloomweight);
            setBrewWeight(p.brewweight);
            setTheBrewMinute(Math.floor(p.brewtimeinsec / 60));
            setTheBrewSecond(p.brewtimeinsec % 60);
            setTheDrawDownMinute(Math.floor(p.drawdownstart / 60));
            setTheDrawDownSecond(p.drawdownstart % 60);
            setYeild(p.yeild);
        } else {
            console.error("No previous Brew found for selected Method. \n No default inputs.");
        }
    }

    if (theMethod === 0) {
        return (
            <>
                <Nav />
                <h4 className="text-center">Choose Your Brew Method</h4>
                <div className="d-flex justify-content-around">
                    <button onClick={hMethod} value={1} className="btn btn-primary btn-sm">Chemex</button>
                    <button onClick={hMethod} value={7} className="btn btn-primary btn-sm">Clever</button>
                    <button onClick={hMethod} value={6} className="btn btn-primary btn-sm">Kalita Wave</button>
                    <button onClick={hMethod} value={2} className="btn btn-primary btn-sm">Hario V60</button>
                    <button onClick={hMethod} value={4} className="btn btn-primary btn-sm">AeroPress</button>
                    <button onClick={hMethod} value={5} className="btn btn-primary btn-sm">French Press</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Nav />
                <h1>{theMethodName}</h1>
                <form className="d-flex flex-column">
                    <label className="mr-2">Coffee: <select value={theCoffee} onChange={hCoffeeBag} className="m-2">
                        {allCoffeeBags?.map(bag => (
                            <option key={bag.id} value={bag.id}>{bag.brand} - {bag.coffeename}</option>
                        ))}
                        <option value="Add New">Add New Coffee Bag...</option>
                    </select>
                    </label>

                    <label className="mr-2">Roasted On Date:
                    <input type="date" value={roastedOn} onChange={hRoastedOn} className="m-2"></input></label>

                    {theMethod != 5 && // French Press --
                        <label className="mr-2">Filter: <select value={theFilter} onChange={hFilter} className="m-2">
                            {allFilters?.map(filter => (
                                <option key={filter.id} value={filter.id}>{filter.brand_name_style}</option>
                            ))}
                            <option value="Add New">Add New Filter...</option>
                        </select></label>
                    }
                    <div>
                        <label className="mr-2">Grinder: <select onChange={hGrinder} className="m-2">
                            {allGrinders?.map(grind => (
                                <option key={grind.id} value={grind.id}>{grind.name}</option>
                            ))}
                        </select></label>

                        <label className="mr-2">Grind Setting:
                            <input type="number" value={Number(grindSize).toString()} onChange={hGrindSize} className="m-2" style={{ width: "60px" }}></input></label>
                    </div>

                    <div>
                        <label className="mr-2">Grams of Coffee:
                            <input type="number" value={Number(gramsPost).toString()} onChange={hGramsPost} className="m-2" style={{ width: "60px" }}></input></label>

                        <label className="mr-3">Desired Ratio:
                    1:<input type="number" value={Number(desiredRatio).toString()} onChange={hDesiredRatio} style={{ width: "60px" }}></input>
                        </label>
                    </div>

                    <label className="mr-2">Water Temp Pre Brew (F):<br></br>
                        <input type="number" value={Number(waterPre).toString()} onChange={hWaterPre} style={{ width: "60px" }}></input></label>

                    <label className="mr-2">Bloom Duration in Seconds:<br></br>
                        <input type="number" value={Number(bloomTime).toString()} onChange={hBloomTime} style={{ width: "60px" }}></input></label>

                    <label className="mr-2">Bloom Weight in Grams:<br></br>
                        <input type="number" value={Number(bloomWeight).toString()} onChange={hBloomWeight} style={{ width: "60px" }}></input></label>

                    <label className="mr-2">Brew Weight in Grams:<br></br>
                        <input type="number" value={Number(brewWeight).toString()} onChange={hBrewWeight} style={{ width: "60px" }}></input>1:{desiredRatio} = <strong>{ratioOutput}</strong> Grams</label>
                    {
                        theMethod === 7 && // Clever --
                        <label className="mr-2">Draw Down Start Time: (Minutes:Seconds)<br></br>
                            <input type="number" value={Number(theDrawDownMinute).toString()} onChange={hDrawDownMinute} style={{ width: "50px" }}></input><span className="m-1">:</span>
                            <input type="number" value={Number(theDrawDownSecond).toString()} onChange={hDrawDownSecond} style={{ width: "60px" }}></input></label>
                    }

                    {
                        theMethod === 4 && // Aero Press --
                        <label className="mr-2">Plunge Start Time: (Minutes:Seconds)<br></br>
                            <input type="number" value={Number(theDrawDownMinute).toString()} onChange={hDrawDownMinute} style={{ width: "50px" }}></input><span className="m-1">:</span>
                            <input type="number" value={Number(theDrawDownSecond).toString()} onChange={hDrawDownSecond} style={{ width: "60px" }}></input></label>
                    }
                    <label className="mr-2">Total Brew Duration: (Minutes:Seconds)<br></br>
                        <input type="number" value={Number(theBrewMinute).toString()} onChange={hBrewMinute} style={{ width: "50px" }}></input><span className="m-1">:</span>
                        <input type="number" value={Number(theBrewSecond).toString()} onChange={hBrewSecond} style={{ width: "60px" }}></input></label>

                    <label className="mr-2">Coffee Yeild in Grams:<br></br>
                        <input type="number" value={Number(yeild).toString()} onChange={hYeild} style={{ width: "60px" }}></input></label>

                    <button onClick={hSubmitBrew} className="btn btn-primary">Submit Brew</button>
                </form>
            </>
        );
    }
};

interface BrewNewProps { }

export default BrewNew;
