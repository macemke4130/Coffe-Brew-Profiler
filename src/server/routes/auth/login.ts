import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';
import { generateHash } from '../../utils/passwords';
import { signToken } from '../../utils/tokens';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.post('/passwordcheck', passport.authenticate('local'), async (req: any, res) => {
    let isValidOldPassword: Boolean;
    try {
        isValidOldPassword = true;
        res.json(isValidOldPassword);
    } catch (e) {
        isValidOldPassword = false;
        res.json(isValidOldPassword);
    }
});

router.put('/setnewpassword', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const newPassword = await generateHash(req.body.password);
        const updatePassword = await db.users.updatePassword(req.user.id, newPassword);
        res.json(updatePassword);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "NOPE", e });
    }
});

router.post('/', passport.authenticate('local'), async (req: any, res) => {
    const loginAttempt = req.body;
    try {
        const token = signToken({
            userid: req.user.id,
            email: req.user.email,
            username: req.user.username
        });
        console.log(token);
        res.json(token);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "NOPE", e });
    }
});

export default router;