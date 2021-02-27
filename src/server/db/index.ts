import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
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
import posts from './queries/posts';
export default {
    users,
    posts
}