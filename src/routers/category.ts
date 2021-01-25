import express from 'express';

import {
  getAll,
  getQuotesByCategoryName,
  getRandom,
} from '../apiControllers/categories';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:categoryName').get(getRandom);
router.route('/:categoryName/quote').get(getQuotesByCategoryName);

export default router;
