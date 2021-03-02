import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = express.Router();

router.get('/all/:barista', passport.authenticate('jwt'), async (req, res) => {
    try {
        const barista = Number(req.params.barista);
        const getAllBrews = await db.brews.all(barista);
        res.status(200).json(getAllBrews);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/details/:brew', passport.authenticate('jwt'), async (req, res) => {
    try {
        const brewid = Number(req.params.brew);
        // Passed into one() twice due to a subquery inside the DB call --
        const getBrew = await db.brews.one(brewid, brewid);
        res.status(200).json(getBrew);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.post('/new', passport.authenticate('jwt'), async (req, res) => {
    try {
        console.log(req.body);
        const newBrew = await db.brews.insertBrew(req.body);
        res.status(200).json(newBrew);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

export default router;