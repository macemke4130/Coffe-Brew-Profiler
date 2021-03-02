import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as PassPortJWT from 'passport-jwt';
import db from '../db';
import { comparePasswords } from '../utils/passwords';
import config from '../config';
import { IPayload } from '../utils/types';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => { // usernameField: 'email' needs to match req.body.email --
    try {
        const [userRecord] = await db.users.find('email', email);
        if (userRecord && comparePasswords(password, userRecord.password)) {
            delete userRecord.password;
            done(null, userRecord);
        } else {
            done(null, false);
        }

    } catch (e) {
        done(e);
    }
}));

passport.use(new PassPortJWT.Strategy(
    {
        jwtFromRequest: PassPortJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret
    },
    async (payload: IPayload, done) => {
        done(null, { id: payload.userid, ...payload});
    }));