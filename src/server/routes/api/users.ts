import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/seconds', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const seconds = await db.users.secondsBrewing(userid);
        res.json(seconds);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/bloom', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const myBloom = await db.users.myBloom(userid);
        res.json(myBloom);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

// Gets userid of person logged in without a db call. COOL! --
router.get('/who', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        res.json(userid);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/profile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const profile = await db.users.profile(userid);
        res.json(profile);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/grams', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const grams = await db.users.grams(userid);
        res.json(grams);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.get('/brews', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const brews = await db.users.brews(userid);
        res.json(brews);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});

router.put('/updateprofile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const updatedUser = req.body
        const update = await db.users.update(userid, updatedUser);
        res.json(update);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e});
    }
});



export default router;