import { Query } from '../';
import { IOption } from '../../../client/utils/types';

// const all = (id: number) => Query('select * from brands where is_active = 1 and barista = ?', [id]); // Not active yet --
const insert = (newRoaster: IOption) => Query('insert into brands set ?', [newRoaster]);

export default {
    //all,
    insert
}