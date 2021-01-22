import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuote';

const MongooseQuoteRepo = new mongooseQuoteRepo();

export const getAll = async (req: Request, res: Response) => {
  const categories = await MongooseQuoteRepo.getCategories();

  res.json({ categories, totalCount: categories.length });
};
