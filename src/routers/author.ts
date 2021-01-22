import express from 'express';

import { getAll } from '../apiControllers/author';

const router = express.Router();

router.route('/').get(getAll);

export default router;
