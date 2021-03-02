import * as express from 'express';
import * as passport from 'passport';
import { signToken } from '../../utils/tokens';

const router = express.Router();

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