import { Query } from '../';
import { MySQLResponse, UsersTable } from '../models';

const one = (id: number) => Query<UsersTable[]>('select * from users where id = ?', [id]);

const username = (id: number) => Query('select username from users where id = ?', [id]);

const insert = (newUser: any) => Query<MySQLResponse>('Insert into baristas set ?', [newUser]);

const find = (column: string, value: string | number) => Query<UsersTable[]>('select * from baristas where ?? = ? and is_active = 1', [column, value]);

const editProfile = (id: number, username: string, email: string) => Query('update users set username = ?, email = ? where id = ?', [username, email, id])

const disable = (id: number) => Query('update users set is_visible = 0 where id = ?', [id]);

const myBloom = (id: number) => Query('select bloom from baristas where id = ?', [id]);

export default {
    one,
    username,
    insert,
    find,
    editProfile,
    disable,
    myBloom
}