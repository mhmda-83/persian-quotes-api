import express from 'express';

import { getAll, getById, getRandom } from '../apiControllers/quote';

const router = express.Router();

router.get('/', getAll);
router.get('/random', getRandom);
router.get('/:id', getById);

export default router;
