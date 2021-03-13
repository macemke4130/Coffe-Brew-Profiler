import * as express from 'express';
import db from '../../db';
import * as passport from 'passport';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/brewmethods', async (req, res) => {
    try {
        const brewmethods = await db.options.allBrewMethods();
        res.json(brewmethods);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/grinders', async (req, res) => {
    try {
        const grinders = await db.options.allGrinders();
        res.json(grinders);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/brands', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const brands = await db.options.allBrands(Number(req.user.id));
        res.json(brands);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/processes', async (req, res) => {
    try {
        const processes = await db.options.allProcesses();
        res.json(processes);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;