import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const all = () => Query('select blogs.*, users.username from blogs join users on users.id = blogs.user_id where blogs.is_visible = 1 order by id desc');

const one = (id: number) => Query('select blogs.*, users.username from blogs join users on users.id = blogs.user_id where blogs.is_visible = 1 and blogs.id = ?', [id]);

const insert = (newPost: any) => Query<MySQLResponse>('Insert into blogs set ?', [newPost]);

const find = (column: string, value: string | number) => Query<PostsTable[]>('select * from blogs where ?? = ?', [column, value]);

const editBlog = (id: number, editedPost: any) => Query('update blogs set ? where id = ?', [editedPost, id]);

const destroy = (id: number) => Query('update blogs set is_visible = 0 where id = ?', [id]);

export default {
    all,
    one,
    insert,
    find,
    editBlog,
    destroy
}