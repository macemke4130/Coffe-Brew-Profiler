import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/new', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        //const newFilter = await db.filters.new(req.body);
        //res.status(200).json(newFilter);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/all', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const getAllfilters = await db.filters.all();
        res.status(200).json(getAllfilters);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;