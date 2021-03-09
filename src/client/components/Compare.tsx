import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import Loading from '../components/Loading';
import apiService from '../utils/api-service';
import { IBrew, ICoffeeBag } from '../utils/types';
import BrewOutput from './BrewOutput';

const Compare = (props: CompareProps) => {
    const [allCompare, setAllCompare] = useState<Array<IBrew>>([]);
    const [control, setControl] = useState<number>(0);
    const [sourceId, setSourceId] = useState<number>(0);

    const match = props.sourceId;

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rList = await apiService("/api/brews/list/");
        setAllCompare(rList);
    }

    // This is a hack. Moment.JS produces Object Object inside of an <option> tag --
    const dateFormat = (x: any) => {
        return x.split("T")[0];
    }

    const hCompare = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setControl(Number(e.target.value));
        setSourceId(Number(e.target.value));
    }

    if (control === 0) {
        return (
            <>
                <h4>Compare with...</h4>
                <select value={control} onChange={hCompare}>
                    <option value="0">Select a Brew...</option>
                    {allCompare?.map(brew => (
                        <option key={brew.id} value={brew.id} disabled={brew.id === match ? true : false}>
                            {dateFormat(brew._createdat)} - {brew.coffeename} - {brew.brewmethod}
                        </option>
                    ))}
                </select>
            </>
        )
    } else {
        return (
            <BrewOutput sourceId={sourceId} />
        );
    }
};

interface CompareProps {
    sourceId: number
}

export default Compare;
