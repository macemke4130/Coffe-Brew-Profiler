import { Request } from 'express';
import { BaristasTable } from '../db/models';

export interface IPayload {
    id?: number,
    baristaid: number,
    email: string,
    username: string
}

export interface ReqUser extends Request {
    id?: number,
    barista?: BaristasTable | IPayload
}