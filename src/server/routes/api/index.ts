import * as express from 'express';
import usersRouter from './users';
import optionsRouter from './options';

const router = express.Router();

router.use('/options', optionsRouter);
router.use('/users', usersRouter);

export default router;