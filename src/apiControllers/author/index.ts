import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuote';

const MongooseQuoteRepo = new mongooseQuoteRepo();

export const getAll = async (req: Request, res: Response) => {
  const authors = await MongooseQuoteRepo.getAuthors();

  res.json({ authors, totalCount: authors.length });
};

export const getRandom = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getRandomByAuthor(
    req.params.authorName,
  );

  res.json({ quote });
};
