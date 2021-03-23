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
    const [control, setControl] = useState<number>(99);
    const [sourceId, setSourceId] = useState<number>(0);
    const [brewMethod, setBrewMethod] = useState<string>("");

    const match = props.sourceId;

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const brewMethod = await apiService('/api/brews/method/' + match);
        const getSameMethodBrews = await apiService('/api/brews/methodmatches/' + brewMethod[0].brewmethod);
        setBrewMethod(brewMethod[0].name);
        setAllCompare(getSameMethodBrews);

    }

    const hCompare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setControl(Number(e.target.id));
        setSourceId(Number(e.target.id));
    }

    const hViewOtherBrews = () => {
        setControl(0);
    }

    if (control === 99) {
        return (
            <div className="d-flex justify-content-center">
                <button onClick={hViewOtherBrews} className="btn btn-info btn-sm">Compare Brew</button>
            </div>
        );
    } else if (control === 0) {
        return (
            <><h5 className="text-center">Previous {brewMethod} Brews</h5>
                {allCompare?.map(brew => (
                    brew.id != match &&
                    <div key={brew.id}>
                        <p className="d-flex align-items-center justify-content-between">
                            <span><small><Moment format="MMMM DD">{brew._createdat}</Moment></small><br></br>{brew.name}</span>
                            <button onClick={hCompare} id={brew.id.toString()} className="btn btn-info btn-sm align-self-end">Compare</button>
                        </p>
                        <hr></hr>
                    </div>

                ))}
            </>
        );
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
