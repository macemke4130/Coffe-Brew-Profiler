import { Query } from '../';
import { MySQLResponse } from '../models';

const all = (id: number) => Query("select brews.id, brews._createdat, brewmethods.name as brewmethod, coffeebags.name as coffeename from brews 	join brewmethods on brewmethods.id = brews.brewmethod join coffeebags on coffeebags.id = brews.coffeebag where brews.barista = ? order by brews.id desc", [id]);
const insertBrew = (newBrew: any) => Query<MySQLResponse>('Insert into brews set ?', [newBrew]);
const one = (subquery: number, brewid: number) => Query("select brews.id, brews._createdat, brews.roasteddate, brews.grindsize, brews.gramspregrind, brews.gramspostgrind, brews.watertempprebrew, brews.watertemppostbrew, brews.bloomtimeinsec, brews.bloomweight, brews.brewtimeinsec, brews.brewweight, brews.yeild, coffeebags.id as coffeebagid, coffeebags.brand as coffeebrand, coffeebags.name as coffeename, grinders.name as grinder, brewmethods.name as brewmethod,brands.name as brandname from brews join brands on brands.id = (select coffeebags.brand from coffeebags where coffeebags.id = (select brews.coffeebag where brews.id = ?)) join coffeebags on coffeebags.id = brews.coffeebag join brewmethods on brewmethods.id = brews.brewmethod join grinders on grinders.id = brews.grinder where brews.id = ?", [subquery, brewid]);

export default {
    all,
    insertBrew,
    one
}