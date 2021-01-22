import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuote';

const MongooseQuoteRepo = new mongooseQuoteRepo();

export const getAll = async (req: Request, res: Response) => {
  const quotes = await MongooseQuoteRepo.getAll();

  res.json({ quotes, totalCount: quotes.length });
};

export const getById = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getById(req.params.id);

  res.json({ quote });
};

export const getRandom = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getRandom();

  res.json({ quote });
};
