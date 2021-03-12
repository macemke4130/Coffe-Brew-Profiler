import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista } from '../utils/types';

const EditBrew = (props: EditBrewProps) => {
    const { id } = useParams<{ id: string }>();

    const [loggedIn, setLoggedIn] = useState<number>(0);

    // All Options --
    const [theBarista, setTheBarista] = useState<number>(0); // Baristas Table ID --
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [allFilters, setAllFilters] = useState<Array<IOption>>([]);
    const [allBrewMethods, setAllBrewMethods] = useState<Array<IOption>>([]);

    // Commons --
    const [theBrewMethod, setTheBrewMethod] = useState<number>(0);
    const [theCoffee, setTheCoffee] = useState<number>(0);
    const [theGrinder, setTheGrinder] = useState<number>(0);
    const [theFilter, setTheFilter] = useState<number>(0);
    const [roastedOn, setRoastedOn] = useState<string>("");

    const [bloomTime, setBloomTime] = useState<number>(0);
    const [bloomWeight, setBloomWeight] = useState<number>(0);
    const [grindSize, setGrindSize] = useState<number>(0);
    const [gramsPost, setGramsPost] = useState<number>(0);
    const [waterPre, setWaterPre] = useState<number>(0);
    const [waterPost, setWaterPost] = useState<number>(0);
    const [brewWeight, setBrewWeight] = useState<number>(0);

    const [theDrawDownMinute, setTheDrawDownMinute] = useState<number>(0);
    const [theDrawDownSecond, setTheDrawDownSecond] = useState<number>(0);
    const [theBrewMinute, setTheBrewMinute] = useState<number>(0);
    const [theBrewSecond, setTheBrewSecond] = useState<number>(0);

    const [theTastingNote, setTheTastingNote] = useState<string>("");
    const [theBrewingNote, setTheBrewingNote] = useState<string>("");

    const [yeild, setYeild] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        // Get Barista Number --
        const rWho = await apiService("/api/users/who");
        setLoggedIn(rWho);

        const r0 = apiService('/api/coffee/all/list/'); // List of Coffee Bags --
        const r1 = apiService('/api/options/grinders'); // List of Grinders --
        const r2 = apiService('/api/users/who'); // Get Barista ID --
        const r3 = apiService('/api/filters/all'); // List of Filters --
        const r4 = apiService('/api/options/brewmethods'); // List All Brew Methods --
        const r5 = apiService('/api/brews/editpull/' + id);
        Promise.all([r0, r1, r2, r3, r4, r5])
            .then(v => {
                setAllCoffeeBags(v[0]);
                setAllGrinders(v[1]);
                setTheBarista(v[2]);
                setAllFilters(v[3]);
                setAllBrewMethods(v[4]);

                setTheBrewMethod(v[5][0].brewmethod || 0);
                setTheCoffee(v[5][0].coffeebag || 0);
                setTheFilter(v[5][0].filter || 0);
                setTheGrinder(v[5][0].grinder || 0);
                setGrindSize(v[5][0].grindsize || 0);
                setGramsPost(v[5][0].gramspostgrind || 0);
                setWaterPre(v[5][0].watertempprebrew || 0);
                setBloomTime(v[5][0].bloomtimeinsec || 0);
                setBloomWeight(v[5][0].bloomweight || 0);
                setBrewWeight(v[5][0].brewweight || 0);
                setBrewWeight(v[5][0].brewweight || 0);
                setWaterPost(v[5][0].waterPost || 0);
                setYeild(v[5][0].yeild || 0);

                const rd = v[5][0].roasteddate.split("T"); // Removes the Time section of the TIMESTAMP string --
                setRoastedOn(rd[0]);

                setTheBrewMinute(Math.floor(v[5][0].brewtimeinsec / 60));
                setTheBrewSecond(v[5][0].brewtimeinsec % 60);

                setTheDrawDownMinute(Math.floor(v[5][0].drawdownstart / 60));
                setTheDrawDownSecond(v[5][0].drawdownstart % 60);
            });
    }

    const hSubmitBrew = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const bodyObject = {
            id,
            barista: theBarista,
            brewmethod: theBrewMethod,
            coffeebag: theCoffee,
            filter: theFilter,
            roasteddate: roastedOn,
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
            yeild,
            tastingnote: theTastingNote,
            brewingnote: theBrewingNote
        }
        const r = await apiService('/api/brews/edit/', "PUT", bodyObject);
        if (r) history.push("/brew/details/" + id);
    }

    const hDestroy = async () => {
        const rDestroy = await apiService("/api/brews/destroy", "PUT", { id });
        if (rDestroy.success) history.push('/');
    }

    const hBrewMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheBrewMethod(Number(e.target.value));
    }

    const hCoffeeBag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheCoffee(Number(e.target.value));
    }

    const hFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheFilter(Number(e.target.value));
    }

    const hGrinder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheGrinder(Number(e.target.value));
    }

    const hRoastedOn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoastedOn(e.target.value);
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
    }

    const hBloomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomTime(Number(e.target.value));
    }

    const hBloomWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBloomWeight(Number(e.target.value));
    }

    const hBrewWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrewWeight(Number(e.target.value));
    }

    const hYeild = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYeild(Number(e.target.value));
    }

    const hBrewMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBrewMinute(Number(e.target.value));
    }

    const hBrewSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheBrewSecond(Number(e.target.value));
    }

    const hDrawDownMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheDrawDownMinute(Number(e.target.value));
    }

    const hDrawDownSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheDrawDownSecond(Number(e.target.value));
    }

    const hTastingNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheTastingNote(e.target.value);
    }

    const hBrewingNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheBrewingNote(e.target.value);
    }

    return (
        <>
            <Nav />
            <h1>Edit Brew</h1>
            <p><label>Tasting Notes:<br></br>
            <textarea value={theTastingNote} onChange={hTastingNote} cols={100} rows={4}></textarea></label></p>
            <p><label>Brewing Notes:<br></br>
            <textarea value={theBrewingNote} onChange={hBrewingNote} cols={100} rows={4}></textarea></label></p>
            <hr></hr>
            <form className="d-flex flex-column">
                <label className="mr-2">Brew Method: <select value={theBrewMethod} onChange={hBrewMethod} className="m-2">
                    {allBrewMethods?.map(brew => (
                        <option key={brew.id} value={brew.id}>{brew.name}</option>
                    ))}
                </select>
                </label>

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

                <label className="mr-2">Grinder: <select value={theGrinder} onChange={hGrinder} className="m-2">
                    {allGrinders?.map(grind => (
                        <option key={grind.id} value={grind.id}>{grind.name}</option>
                    ))}
                </select></label>

                <label className="mr-2">Grind Size Setting:
                <input type="number" value={grindSize} onChange={hGrindSize} className="m-2"></input></label>

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
                <input type="number" value={theDrawDownMinute} onChange={hDrawDownMinute}></input><span>:</span>
                    <input type="number" value={theDrawDownSecond} onChange={hDrawDownSecond}></input></label>

                <label className="mr-2">Total Brew Duration: (Minutes:Seconds)
                <input type="number" value={theBrewMinute} onChange={hBrewMinute}></input><span>:</span>
                    <input type="number" value={theBrewSecond} onChange={hBrewSecond}></input></label>

                <label className="mr-2">Water Temp Post Brew (F):
                <input type="number" value={waterPost} onChange={hWaterPost} className="m-2"></input></label>

                <label className="mr-2">Coffee Yeild in Grams:
                <input type="number" value={yeild} onChange={hYeild} className="m-2"></input></label>

                <button onClick={hSubmitBrew} className="btn btn-primary">Submit Brew</button>
            </form>

            {loggedIn === theBarista ? <p><button onClick={hDestroy}>Delete Brew</button></p> : ""}
        </>

    );
};

interface EditBrewProps { }

export default EditBrew;
