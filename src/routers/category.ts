import express from 'express';

import {
  getAll,
  getQuotesByCategoryName,
  getRandom,
} from '../apiControllers/category';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:categoryName/quote/random').get(getRandom);
router.route('/:categoryName/quote').get(getQuotesByCategoryName);

export default router;
