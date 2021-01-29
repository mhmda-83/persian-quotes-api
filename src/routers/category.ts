import express from 'express';

import {
  getAll,
  getQuotesByCategoryName,
  getRandom,
} from '../apiControllers/categories';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:categoryName/quotes/random').get(getRandom);
router.route('/:categoryName/quotes').get(getQuotesByCategoryName);

export default router;
