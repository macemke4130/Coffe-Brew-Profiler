import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { ICoffeeBag, IOption } from '../../utils/types';

const Chemex = (props: ChemexProps) => {
    let theBarista = 0;
    const [allCoffeeBags, setAllCoffeeBags] = useState<Array<ICoffeeBag>>([]);
    const [allGrinders, setAllGrinders] = useState<Array<IOption>>([]);
    const [bloomTime, setBloomTime] = useState<number>(0);

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService('/api/users/who');
        theBarista = rWho;

        const r0 = apiService('/api/coffee/all/list/' + theBarista);
        const r1 = apiService('/api/options/grinders');
        const r2 = apiService('/api/users/bloom/' + theBarista);
        Promise.all([r0, r1, r2])
            .then(v => {
                setAllCoffeeBags(v[0]);
                setAllGrinders(v[1]);
                setBloomTime(v[2]);
            });
    }

    const hSubmitBrew = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    const hBloomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }


    return (
        <>
            <h1>Chemex</h1>
            <form className="d-flex flex-column">
                <label className="mr-2">Coffee: <select className="m-2">
                    {allCoffeeBags?.map(bag => (
                        <option key={bag.id} value={bag.id}>{bag.brand} - {bag.coffeename}</option>
                    ))}
                </select>
                </label>

                <label className="mr-2">Roasted On Date: <input type="date" className="m-2"></input></label>
                <label className="mr-2">Grinder: <select className="m-2">
                    {allGrinders?.map(grind => (
                        <option key={grind.id} value={grind.id}>{grind.name}</option>
                    ))}
                </select>
                </label>
                <label className="mr-2">Grind Size Setting: <input type="number" className="m-2"></input></label>
                <label className="mr-2">Grams Pre Grind: <input type="number" className="m-2"></input></label>
                <label className="mr-2">Grind Post Grind: <input type="number" className="m-2"></input></label>
                <label className="mr-2">Water Temp Pre Brew (F): <input type="number" className="m-2"></input></label>

                {/* <label className="mr-2">Bloom Duration: <input type="number" value={bloomTime} onChange={hBloomTime} className="m-2"></input></label> */}



                <label className="mr-2">Water Temp Post Brew (F): <input type="number" className="m-2"></input></label>

                <button onClick={hSubmitBrew} className="btn btn-primary">Submit Brew</button>
            </form>
        </>

    );
};

interface ChemexProps { }

export default Chemex;
