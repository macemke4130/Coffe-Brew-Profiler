import { Query } from '../';
import { IBrew } from '../../../client/utils/types';
import { MySQLResponse } from '../models';

const all = (id: number) => Query("select brews.id, brews._createdat, brewmethods.name as brewmethod, coffeebags.name as coffeename from brews 	join brewmethods on brewmethods.id = brews.brewmethod join coffeebags on coffeebags.id = brews.coffeebag where brews.barista = ? and brews.is_active = 1 order by brews.id desc", [id]);
const insertBrew = (newBrew: IBrew) => Query<MySQLResponse>('Insert into brews set ?', [newBrew]);
const destroy = (id: number) => Query('update brews set is_active = 0 where id = ?', [id]);
const delta = (id1: number, id2: number) => Query('select DATEDIFF((select _createdat from brews where id = ?), (select roasteddate from brews where id = ?)) as delta', [id1, id2]);

const one = (subquery: number, brewid: number) => Query(`select 
brews.id,
brews._createdat,
brews.barista,
brews.roasteddate,
brews.grindsize,
brews.gramspregrind,
brews.gramspostgrind,
brews.watertempprebrew,
brews.watertemppostbrew,
brews.bloomtimeinsec,
brews.bloomweight,
brews.brewtimeinsec,
brews.brewweight,
brews.yeild,
coffeebags.id as coffeebagid,
coffeebags.brand as coffeebrand,
coffeebags.name as coffeename,
filters.brand_name_style as filter,
grinders.name as grinder,
brewmethods.name as brewmethod,
brands.name as brandname
 from brews 
join brands on brands.id = 
(select coffeebags.brand from coffeebags where coffeebags.id = 
(select brews.coffeebag where brews.id = ?))
join filters on filters.id = brews.filter
join coffeebags on coffeebags.id = brews.coffeebag
join brewmethods on brewmethods.id = brews.brewmethod
join grinders on grinders.id = brews.grinder
where brews.id = ?`, [subquery, brewid]);

export default {
    all,
    insertBrew,
    destroy,
    delta,
    one
}