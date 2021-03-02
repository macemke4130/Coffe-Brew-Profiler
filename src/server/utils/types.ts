import { Request } from 'express';
import { UsersTable } from '../db/models';

export interface IPayload {
    id?: number,
    userid: number,
    email: string,
    username: string
}

export interface ReqUser extends Request {
    id?: number,
    user?: UsersTable | IPayload
}