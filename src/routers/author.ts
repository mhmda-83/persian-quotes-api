import express from 'express';

import { getAll, getRandom } from '../apiControllers/author';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:authorName').get(getRandom);

export default router;
