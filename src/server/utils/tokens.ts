import * as jwt from 'jsonwebtoken';
import config from '../config';
import { IPayload } from '../utils/types';

export function signToken(payload: IPayload) {
    return jwt.sign(
        payload,
        config.jwt.secret,
        { expiresIn: config.jwt.expires }
    );
}