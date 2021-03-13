import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql);

export const Query = <T = PromiseConstructor>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {

        const sql = mysql.format(query, values);
        console.log("Query Running");
        console.log(sql);
        console.log('');

        pool.query(sql, (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

import users from './queries/users';
import options from './queries/options';
import filters from './queries/filters';
import roasters from './queries/roasters';
import coffee from './queries/coffee';
import brews from './queries/brews';

export default {
    users,
    options,
    filters,
    roasters,
    coffee,
    brews
}