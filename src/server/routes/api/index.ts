import * as express from 'express';

import usersRouter from './users';
import optionsRouter from './options';
import filtersRouter from './filters';
import coffeeRouter from './coffee';
import brewsRouter from './brews';

const router = express.Router();

router.use('/options', optionsRouter);
router.use('/filters', filtersRouter);
router.use('/coffee', coffeeRouter);
router.use('/brews', brewsRouter);
router.use('/users', usersRouter);

export default router;