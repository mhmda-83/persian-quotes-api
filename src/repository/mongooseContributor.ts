import { Contributor } from '../model/contributor';
import { ContributorRepo } from './contributorRepo';
import { QueryOptions } from './queryOptions';

class MongooseContributorRepo implements ContributorRepo {
  getByTelegramId: (telegramId: string) => Promise<Contributor>;
  getAll: (options: QueryOptions) => Promise<Contributor[]>;
}

export { MongooseContributorRepo };
