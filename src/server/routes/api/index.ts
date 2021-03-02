import * as express from 'express';

import usersRouter from './users';
import optionsRouter from './options';
import coffeeRouter from './coffee';
import brewsRouter from './brews';

const router = express.Router();

router.use('/options', optionsRouter);
router.use('/coffee', coffeeRouter);
router.use('/brews', brewsRouter);
router.use('/users', usersRouter);

export default router;