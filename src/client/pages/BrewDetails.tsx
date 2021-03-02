import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../utils/api-service';
import { ICoffeeBag, IOption, IBarista } from '../utils/types';

const BrewDetails = (props: BrewDetails) => {
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

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService('/api/users/who');
        setTheBarista(rWho);

        const r0 = apiService('/api/coffee/all/list/' + rWho);
        const r1 = apiService('/api/options/grinders');
        const r2 = apiService('/api/users/bloom/');
        Promise.all([r0, r1, r2])
            .then(v => {
                setAllCoffeeBags(v[0]);
                setTheCoffee(v[0].length + 1); // Newest Coffee Bag, won't work forever --
                setAllGrinders(v[1]);
                setBloomTime(v[2][0].bloom);
            });
    }

    return (
        <>
            
        </>

    );
};

interface BrewDetails { }

export default BrewDetails;
