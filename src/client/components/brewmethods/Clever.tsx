import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { ICoffeeBag, IOption, IBarista } from '../../utils/types';

const Clever = (props: CleverProps) => {
    // All Options --
    const [theBarista, setTheBarista] = useState<number>(0); // Baristas Table ID --
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [allFilters, setAllFilters] = useState<Array<IOption>>([]);

    // Commons --
    const [theCoffee, setTheCoffee] = useState<number>(Number(localStorage.getItem("CoffeeBag")) || 0);
    const [theGrinder, setTheGrinder] = useState<number>(Number(localStorage.getItem("Grinder")) || 1);
    const [theFilter, setTheFilter] = useState<number>(Number(localStorage.getItem("CleverFilter")) || 1);
    const [roastedOn, setRoastedOn] = useState<string>(localStorage.getItem("RoastedOn") || "");

    // Clever --
    const [bloomTime, setBloomTime] = useState<number>(Number(localStorage.getItem("CleverBloomTime")) || 0);
    const [bloomWeight, setBloomWeight] = useState<number>(Number(localStorage.getItem("CleverBloomWeight")) || 0);
    const [grindSize, setGrindSize] = useState<number>(Number(localStorage.getItem("CleverGrindSize")) || 0);
    const [gramsPost, setGramsPost] = useState<number>(Number(localStorage.getItem("CleverGrams")) || 0);
    const [waterPre, setWaterPre] = useState<number>(Number(localStorage.getItem("WaterTempPre")) || 212);
    const [waterPost, setWaterPost] = useState<number>(Number(localStorage.getItem("WaterTempPost")) || 0);
    const [brewWeight, setBrewWeight] = useState<number>(Number(localStorage.getItem("CleverBrewWeight")) || 0);

    const [theDrawDownMinute, setTheDrawDownMinute] = useState<number>(Number(localStorage.getItem("CleverDDM") || 0));
    const [theDrawDownSecond, setTheDrawDownSecond] = useState<number>(Number(localStorage.getItem("CleverDDS") || 0));
    const [theBrewMinute, setTheBrewMinute] = useState<number>(Number(localStorage.getItem("CleverBM")) || 0);
    const [theBrewSecond, setTheBrewSecond] = useState<number>(Number(localStorage.getItem("CleverBS")) || 0);

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
            });
    }

    const hSubmitBrew = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const dateCatch = roastedOn === "" ? "1970-01-01" : roastedOn;

        const bodyObject = {
            barista: theBarista,
            brewmethod: 7, // Clever --
            coffeebag: theCoffee,
            filter: theFilter,
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
            drawdownstart: (theDrawDownMinute * 60) + theDrawDownSecond,
            yeild
        }
        if (theCoffee === 0) {
            alert("Coffee Field Can Not Be Blank.");
        } else {
            const r = await apiService('/api/brews/new', "POST", bodyObject);
            if (r.serverStatus === 2) history.push("/brew/details/" + r.insertId);
        }
    }

    const hCoffeeBag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheCoffee(Number(e.target.value));
        localStorage.setItem("CoffeeBag", e.target.value);
    }

    const hFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    return (
        <>
            <h1>Clever</h1>
            <form className="d-flex flex-column">
                <label className="mr-2">Coffee: <select value={theCoffee} onChange={hCoffeeBag} className="m-2">
                    {allCoffeeBags?.map(bag => (
                        <option key={bag.id} value={bag.id}>{bag.brand} - {bag.coffeename}</option>
                    ))}
                </select>
                </label>

                <label className="mr-2">Roasted On Date:
                <input type="date" value={roastedOn} onChange={hRoastedOn} className="m-2"></input></label>

                <label className="mr-2">Filter: <select value={theFilter} onChange={hFilter} className="m-2">
                    {allFilters?.map(filter => (
                        <option key={filter.id} value={filter.id}>{filter.brand_name_style}</option>
                    ))}
                </select></label>

                <label className="mr-2">Grinder: <select onChange={hGrinder} className="m-2">
                    {allGrinders?.map(grind => (
                        <option key={grind.id} value={grind.id}>{grind.name}</option>
                    ))}
                </select></label>

                <label className="mr-2">Grind Size Setting:
                <input type="number" value={grindSize} onChange={hGrindSize} className="m-2"></input></label>
                <small>If your grinder does not have numeric settings, assign your "fine" grind to a 1 and "course" to a 10.<br></br>
                Ultimately, the numbers do not need to be true to life, they exist for consistancy. The goal is repeatability.</small>

                <label className="mr-2">Grams of Coffee:
                <input type="number" value={gramsPost} onChange={hGramsPost} className="m-2"></input></label>

                <label className="mr-2">Water Temp Pre Brew (F):
                <input type="number" value={waterPre} onChange={hWaterPre} className="m-2"></input></label>

                <label className="mr-2">Bloom Duration:
                <input type="number" value={bloomTime} onChange={hBloomTime} className="m-2"></input></label>

                <label className="mr-2">Bloom Weight:
                <input type="number" value={bloomWeight} onChange={hBloomWeight} className="m-2"></input></label>

                <label className="mr-2">Brew Weight:
                <input type="number" value={brewWeight} onChange={hBrewWeight} className="m-2"></input></label>

                <label className="mr-2">Draw Down Start Time: (Minutes:Seconds)
                <input type="number" value={theDrawDownMinute} onChange={hDrawDownMinute}></input><span className="m-1">:</span>
                    <input type="number" value={theDrawDownSecond} onChange={hDrawDownSecond}></input></label>

                <label className="mr-2">Total Brew Duration: (Minutes:Seconds)
                <input type="number" value={theBrewMinute} onChange={hBrewMinute}></input><span className="m-1">:</span>
                    <input type="number" value={theBrewSecond} onChange={hBrewSecond}></input></label>

                <label className="mr-2">Water Temp Post Brew (F):
                <input type="number" value={waterPost} onChange={hWaterPost} className="m-2"></input></label>

                <label className="mr-2">Coffee Yeild in Grams:
                <input type="number" value={yeild} onChange={hYeild} className="m-2"></input></label>

                <button onClick={hSubmitBrew} className="btn btn-primary">Submit Brew</button>
            </form>
        </>

    );
};

interface CleverProps { }

export default Clever;
