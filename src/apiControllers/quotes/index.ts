import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuote';

const MongooseQuoteRepo = new mongooseQuoteRepo();

const PAGE_SIZE = 50;

export const getAll = async (req: Request, res: Response) => {
  const parsedPage = parseInt(req.query.page as string, 10);
  const page: number = isNaN(parsedPage) ? 1 : parsedPage;

  const quotes = await MongooseQuoteRepo.getAllTranslated({
    skip: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  const quotesCount = await MongooseQuoteRepo.getAllTranslatedCount();

  const hasNextPage = page * PAGE_SIZE < quotesCount;

  res.json({
    quotes,
    page,
    hasNextPage,
    totalCount: quotesCount,
  });
};

export const getById = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getTranslatedById(req.params.id);

  res.json({ quote });
};

export const getRandom = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getRandomTranslated();

  res.json({ quote });
};
