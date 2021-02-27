import * as express from 'express';
// import postsRouter from './posts';
import usersRouter from './users';

const router = express.Router();

// router.use('/posts', postsRouter);
router.use('/users', usersRouter);

export default router;