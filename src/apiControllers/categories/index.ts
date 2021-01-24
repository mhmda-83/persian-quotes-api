import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuote';

const MongooseQuoteRepo = new mongooseQuoteRepo();

export const getAll = async (req: Request, res: Response) => {
  const categories = await MongooseQuoteRepo.getCategories();

  res.json({ categories, totalCount: categories.length });
};

export const getRandom = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getRandomByCategory(
    req.params.categoryName,
  );

  res.json({ quote });
};
