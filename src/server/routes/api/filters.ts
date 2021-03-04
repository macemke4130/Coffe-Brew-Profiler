import * as express from 'express';
import * as passport from 'passport';
import { IOption } from '../../../client/utils/types';
import db from '../../db';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.post('/new', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const newFilter: IOption = {
            barista: req.user.id,
            brand_name_style: req.body.brand_name_style
        }
        const rFilter = await db.filters.insert(newFilter);
        res.status(200).json(rFilter);
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