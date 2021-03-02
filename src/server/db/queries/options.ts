import { Query } from '..';

const allBrewMethods = () => Query<[]>('select * from brewmethods');
const allGrinders = () => Query<[]>('select * from grinders');
const allBrands = () => Query<[]>('select * from brands');
const allProcesses = () => Query<[]>('select * from processes');

export default {
    allBrewMethods,
    allGrinders,
    allBrands,
    allProcesses
}