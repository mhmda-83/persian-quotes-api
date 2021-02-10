import { Contributor } from '../model/contributor';
import { QueryOptions } from './queryOptions';

abstract class ContributorRepo {
  connect: () => void;
  seed: (data: Contributor[]) => Promise<void>;
  getByTelegramId: (telegramId: string) => Promise<Contributor | null>;
  insertOne: (contributor: Contributor) => Promise<Contributor>;
  incrementContributionCountByTelegramId: (
    telegramId: string,
  ) => Promise<Contributor | null>;

  getAll: (options: QueryOptions) => Promise<Contributor[]>;
  deleteAll: () => Promise<void>;
}

export { ContributorRepo };
