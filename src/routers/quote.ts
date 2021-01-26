import express from 'express';

import { getAll, getById, getRandom } from '../apiControllers/quotes';

const router = express.Router();

router.get('/', getAll);
router.get('/random', getRandom);
router.get('/:id', getById);

export default router;
