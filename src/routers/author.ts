import express from 'express';

import {
  getAll,
  getQuotesByAuthorName,
  getRandom,
} from '../apiControllers/author';

const router = express.Router();

router.route('/').get(getAll);
router.route('/:authorName/quote/random').get(getRandom);
router.route('/:authorName/quote').get(getQuotesByAuthorName);

export default router;
