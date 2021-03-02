import * as express from 'express';

import usersRouter from './users';
import optionsRouter from './options';
import coffeeRouter from './coffee';

const router = express.Router();

router.use('/coffee', coffeeRouter);
router.use('/options', optionsRouter);
router.use('/users', usersRouter);

export default router;