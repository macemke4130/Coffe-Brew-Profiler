import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { ICoffeeBag, IOption, IBarista } from '../../utils/types';

const Chemex = (props: ChemexProps) => {
    const [theBarista, setTheBarista] = useState<number>(0); // Baristas Table ID --
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [theCoffee, setTheCoffee] = useState<number>(0);
    const [theGrinder, setTheGrinder] = useState<number>(1); // Baratza Encore by default --
    const [bloomTime, setBloomTime] = useState<number>(0);
    const [bloomWeight, setBloomWeight] = useState<number>(Number(localStorage.getItem("ChemexBloomWeight")) || 0);
    const [grindSize, setGrindSize] = useState<number>(Number(localStorage.getItem("ChemexGrind")) || 0);
    const [gramsPre, setGramsPre] = useState<number>(Number(localStorage.getItem("ChemexGrams")) || 0);
    const [gramsPost, setGramsPost] = useState<number>(Number(localStorage.getItem("ChemexGrams")) || 0);
    const [waterPre, setWaterPre] = useState<number>(212);
    const [waterPost, setWaterPost] = useState<number>(0);
    const [roastedOn, setRoastedOn] = useState<string>(localStorage.getItem("RoastedOn") || "");
    const [brewWeight, setBrewWeight] = useState<number>(Number(localStorage.getItem("ChemexBrewWeight")) || 0);
    const [brewTime, setBrewTime] = useState<number>(0);
    const [yeild, setYeild] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const r0 = apiService('/api/coffee/all/list/');
        const r1 = apiService('/api/options/grinders');
        const r2 = apiService('/api/users/bloom/'); // Get Default Bloom --
        const r3 = apiService('/api/users/who'); // Get Barista ID --
        Promise.all([r0, r1, r2, r3])
            .then(v => {
                setAllCoffeeBags(v[0]);
                setTheCoffee(v[0].length + 1); // Newest Coffee Bag, won't work forever --
                setAllGrinders(v[1]);
                setBloomTime(v[2][0].bloom);
                setTheBarista(v[3]);
            });
    }

    const hSubmitBrew = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const bodyObject = {
            barista: theBarista,
            brewmethod: 1, // Chemex --
            coffeebag: theCoffee,
            roasteddate: roastedOn,
            grinder: theGrinder,
            grindsize: grindSize,
            gramspregrind: gramsPre,
            gramspostgrind: gramsPost,
            watertempprebrew: waterPre,
            watertemppostbrew: waterPost,
            bloomtimeinsec: bloomTime,
            bloomweight: bloomWeight,
            brewtimeinsec: brewTime,
            brewweight: brewWeight,
            yeild
        }
        const r = await apiService('/api/brews/new', "POST", bodyObject);
        if(r.serverStatus === 2) history.push("/brew/details/" + r.insertId);
    }

    const hCoffeeBag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheCoffee(Number(e.target.value));
    }

    const hRoastedOn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoastedOn(e.target.value);
        localStorage.setItem("RoastedOn", e.target.value);
    }

    const hGramsPre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGramsPre(Number(e.target.value));
        setGramsPost(Number(e.target.value));
        localStorage.setItem("ChemexGrams", e.target.value);
    }

    const hGramsPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGramsPost(Number(e.target.value));
    }

    const hWaterPre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterPre(Number(e.target.value));
    }

    const hWaterPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterPost(Number(e.target.value));
    }

    const hGrindSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrindSize(Number(e.target.value));
        localStorage.setItem("ChemexGrind", e.target.value);
    }

    const hBloomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomTime(Number(e.target.value));
    }

    const hBloomWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomWeight(Number(e.target.value));
        localStorage.setItem("ChemexBloomWeight", e.target.value);
    }

    const hBrewWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrewWeight(Number(e.target.value));
        localStorage.setItem("ChemexBrewWeight", e.target.value);
    }

    const hBrewTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrewTime(Number(e.target.value));
    }

    const hYeild = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYeild(Number(e.target.value));
    }

    return (
        <>
            <h1>Chemex</h1>
            <form className="d-flex flex-column">
                <label className="mr-2">Coffee: <select value={theCoffee} onChange={hCoffeeBag} className="m-2">
                    {allCoffeeBags?.map(bag => (
                        <option key={bag.id} value={bag.id}>{bag.brand} - {bag.coffeename}</option>
                    ))}
                </select>
                </label>

                <label className="mr-2">Roasted On Date:
                <input type="date" value={roastedOn} onChange={hRoastedOn} className="m-2"></input></label>
                <label className="mr-2">Grinder: <select className="m-2">
                    {allGrinders?.map(grind => (
                        <option key={grind.id} value={grind.id}>{grind.name}</option>
                    ))}
                </select>
                </label>
                <label className="mr-2">Grind Size Setting: 
                <input type="number" value={grindSize} onChange={hGrindSize} className="m-2"></input></label>

                <label className="mr-2">Grams Pre Grind:
                <input type="number" value={gramsPre} onChange={hGramsPre} className="m-2"></input></label>

                <label className="mr-2">Grind Post Grind:
                <input type="number" value={gramsPost} onChange={hGramsPost} className="m-2"></input></label>

                <label className="mr-2">Water Temp Pre Brew (F):
                <input type="number" value={waterPre} onChange={hWaterPre} className="m-2"></input></label>

                <label className="mr-2">Bloom Duration:
                <input type="number" value={bloomTime} onChange={hBloomTime} className="m-2"></input></label>

                <label className="mr-2">Bloom Weight:
                <input type="number" value={bloomWeight} onChange={hBloomWeight} className="m-2"></input></label>

                <label className="mr-2">Brew Weight:
                <input type="number" value={brewWeight} onChange={hBrewWeight} className="m-2"></input></label>

                <label className="mr-2">Total Brew Duration in Seconds:
                <input type="number" value={brewTime} onChange={hBrewTime} className="m-2"></input></label>
                <small>Number of minutes / 60 + any remaining seconds</small>

                <label className="mr-2">Water Temp Post Brew (F):
                <input type="number" value={waterPost} onChange={hWaterPost} className="m-2"></input></label>

                <label className="mr-2">Coffee Yeild in Grams:
                <input type="number" value={yeild} onChange={hYeild} className="m-2"></input></label>

                
                <button onClick={hSubmitBrew} className="btn btn-primary">Submit Brew</button>
            </form>
        </>

    );
};

interface ChemexProps { }

export default Chemex;
