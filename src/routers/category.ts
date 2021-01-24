import express from 'express';

import { getAll, getRandom } from '../apiControllers/categories';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:categoryName').get(getRandom);

export default router;
