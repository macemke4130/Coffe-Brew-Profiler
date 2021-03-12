import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const allBrewMethods = () => Query<[]>('select * from brewmethods where is_active = 1');
const allGrinders = () => Query<[]>('select * from grinders');
const allBrands = () => Query<[]>('select * from brands');
const allProcesses = () => Query<[]>('select * from processes');

export default {
    allBrewMethods,
    allGrinders,
    allBrands,
    allProcesses
}