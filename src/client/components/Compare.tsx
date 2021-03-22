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
        const brewMethod = await apiService('/api/brews/method/' + match);
        const getSameMethodBrews = await apiService('/api/brews/methodmatches/' + brewMethod[0].brewmethod);
        setAllCompare(getSameMethodBrews);

    }

    const hCompare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setControl(Number(e.target.id));
        setSourceId(Number(e.target.id));
    }

    if (control === 0) {
        return (
            <>
                {allCompare?.map(brew => (
                    brew.id != match &&
                    <div key={brew.id}>
                        <p className="d-flex align-items-center justify-content-between">
                            <small><Moment format="MMMM DD">{brew._createdat}</Moment> - {brew.name}</small>
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
