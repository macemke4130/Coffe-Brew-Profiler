import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const all = () => Query('select id, brand_name_number from filters');

export default {
    all
}