import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { IOption } from '../utils/types';

const AllFilters = (props: AllFiltersProps) => {
    const [allFilters, setAllFilters] = useState<Array<IOption>>([]);

    let theBarista = 0;

    const history = useHistory();

    useEffect(() => {
        DBCalls();
    }, []);

    const DBCalls = async () => {
        const rWho = await apiService("/api/users/who");
        theBarista = rWho;
        
        const rFilters = await apiService("/api/filters/all/");
        setAllFilters(rFilters);
    }

    return (
        <>
            <Nav />
            <h1>Filters Page</h1>
            {allFilters?.map(filter => (
                <div key={filter.id}>
                    <p>{filter.brand_name_style}</p>
                    <hr></hr>
                </div>
            ))}
        </>
    );
};

interface AllFiltersProps { }

export default AllFilters;
