import { Request, Response } from 'express';

import mongooseQuoteRepo from '../../repository/mongooseQuoteRepo';

const MongooseQuoteRepo = new mongooseQuoteRepo();

const PAGE_SIZE = 50;

export const getAll = async (req: Request, res: Response) => {
  const categories = await MongooseQuoteRepo.getCategories();

  res.json({ categories, totalCount: categories.length });
};

export const getRandom = async (req: Request, res: Response) => {
  const quote = await MongooseQuoteRepo.getRandomTranslatedByCategory(
    req.params.categoryName,
  );

  res.json({ quote });
};

export const getQuotesByCategoryName = async (req: Request, res: Response) => {
  const parsedPage = parseInt(req.query.page as string, 10);
  const page: number = isNaN(parsedPage) ? 1 : parsedPage;

  const quotes = await MongooseQuoteRepo.getTranslatedByCategory(
    req.params.categoryName,
    {
      skip: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    },
  );

  const quotesCount = await MongooseQuoteRepo.getTranslatedCountByCategory(
    req.params.categoryName,
  );

  const hasNextPage = page * PAGE_SIZE < quotesCount;

  res.json({
    quotes,
    page,
    hasNextPage,
    totalCount: quotesCount,
  });
};
