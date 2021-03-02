import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

import { ReqUser } from '../../utils/types';

const router = express.Router();

// Gets userid of person logged in without a db call. COOL! --
router.use('/who', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        res.json(userid);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;