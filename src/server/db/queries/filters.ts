import { Query } from '../';
import { IOption } from '../../../client/utils/types';
import { MySQLResponse, PostsTable } from '../models';

const all = () => Query('select id, brand_name_style from filters order by brand_name_style');
const insert = (newFilter: IOption) => Query('insert into filters set ?', [newFilter]);

export default {
    all,
    insert
}