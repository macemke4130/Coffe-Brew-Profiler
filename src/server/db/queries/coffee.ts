import { Query } from '../';
import { ICoffeeBag } from '../../../client/utils/types';
import { MySQLResponse } from '../models';

const all = () => Query('select * from coffeebags');
const one = (id: number) => Query('select coffeebags.id, coffeebags.name as coffeename, coffeebags.region, coffeebags.elevationabovesealevelinmeters as elevation, coffeebags.breed, coffeebags.blend, coffeebags.barista as baristaid, brands.name as brand, processes.name as process from coffeebags join brands on brands.id = coffeebags.brand join processes on processes.id = coffeebags.process where coffeebags.id = ?', [id]);
const editPull = (id: number) => Query('select * from coffeebags where id = ?', [id]);
const insert = (newCoffee: ICoffeeBag) => Query('insert into coffeebags set ?', newCoffee);
const edit = (id: number, updateObject: ICoffeeBag) => Query("update coffeebags set ? where id = ?", [updateObject, id]);
const empty = (id: number) => Query("update coffeebags set is_active = 0 where id = ?", [id]);

const allMyCoffee = (id: number) => Query('select coffeebags.id, coffeebags.name as coffeename, coffeebags.region, coffeebags.elevationabovesealevelinmeters as elevation, coffeebags.breed, coffeebags.blend, brands.name as brand, processes.name as process from coffeebags join brands on brands.id = coffeebags.brand join processes on processes.id = coffeebags.process where coffeebags.barista = ? and is_active = 1 order by coffeebags.id desc', [id]);
const allMyCoffeeList = (id: number) => Query('select brands.name as brand, coffeebags.name as coffeename, coffeebags.id from coffeebags join brands on brands.id = coffeebags.brand where coffeebags.barista = ? and is_active = 1 order by coffeebags.id desc', [id]);

export default {
    all,
    one,
    editPull,
    insert,
    edit,
    empty,
    allMyCoffee,
    allMyCoffeeList
}