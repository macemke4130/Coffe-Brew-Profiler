import * as express from 'express';
import { generateHash } from '../../utils/passwords';
import db from '../../db';
import { signToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        newUser.password = await generateHash(newUser.password);
        const result = await db.users.insert(newUser);
        const token = signToken({ userid: result.insertId, email: newUser.email, username: newUser.username });
        res.json(token);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "NOPE", e });
    }
});

export default router;