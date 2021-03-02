import { Query } from '..';

const all = () => Query('select * from coffeebags');
const one = (id: number) => Query('select coffeebags.id, coffeebags.name as coffeename, coffeebags.region, coffeebags.elevationabovesealevelinmeters as elevation, coffeebags.breed, coffeebags.blend, brands.name as brand, processes.name as process from coffeebags join brands on brands.id = coffeebags.brand join processes on processes.id = coffeebags.process where coffeebags.id = ?', [id]);
const insert = (newCoffee: any) => Query('insert into coffeebags set ?', newCoffee);
const allMyCoffee = (id: number) => Query('select coffeebags.id, coffeebags.name as coffeename, coffeebags.region, coffeebags.elevationabovesealevelinmeters as elevation, coffeebags.breed, coffeebags.blend, brands.name as brand, processes.name as process from coffeebags join brands on brands.id = coffeebags.brand join processes on processes.id = coffeebags.process where barista = ? order by coffeebags.id desc', [id]);

export default {
    all,
    one,
    insert,
    allMyCoffee
}