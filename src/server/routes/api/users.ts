import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

import { ReqUser } from '../../utils/types';

const router = express.Router();

// router.use('/profile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
//     try {
//         const userid = req.user.id;
//         const [profile] = await db.users.one(userid);
//         delete profile.password;
//         res.json(profile);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "nope", e});
//     }
// });

// router.use('/name', passport.authenticate('jwt'), async (req: ReqUser, res) => {
//     try {
//         const userid = req.user.id;
//         const username = await db.users.username(userid);
//         res.json(username);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "nope", e});
//     }
// });

// router.use('/editprofile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
//     try {
//         const userid = req.user.id;
//         const username = req.body.username;
//         const email = req.body.email;
//         const r = await db.users.editProfile(userid, username, email);
//         res.json(r);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "nope", e});
//     }
// });

// // Gets userid of person logged in without a db call. COOL! --
// router.use('/who', passport.authenticate('jwt'), async (req: ReqUser, res) => {
//     try {
//         const userid = req.user.id;
//         res.json(userid);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "nope", e});
//     }
// });

// router.use('/disable', passport.authenticate('jwt'), async (req: ReqUser, res) => {
//     try {
//         const userid = req.user.id;
//         const username = await db.users.disable(userid);
//         res.json(username);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "nope", e});
//     }
// });

export default router;