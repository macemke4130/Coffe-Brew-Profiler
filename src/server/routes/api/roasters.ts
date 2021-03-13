import * as express from 'express';
import * as passport from 'passport';
import { IOption } from '../../../client/utils/types';
import db from '../../db';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.post('/new', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const roasterObject: IOption = {
            barista: req.user.id,
            name: req.body.brand
        }
        const newRoaster = await db.roasters.insert(roasterObject);
        res.status(200).json(newRoaster);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;