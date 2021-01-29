import express from 'express';

import {
  getAll,
  getQuotesByAuthorName,
  getRandom,
} from '../apiControllers/authors';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:authorName/quotes/random').get(getRandom);
router.route('/:authorName/quotes').get(getQuotesByAuthorName);

export default router;
