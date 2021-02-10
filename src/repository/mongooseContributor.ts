import { Contributor } from '../model/contributor';
import { ContributorRepo } from './contributorRepo';
import { QueryOptions } from './queryOptions';

class MongooseContributorRepo implements ContributorRepo {
  getByTelegramId: (telegramId: string) => Contributor;
  getAll: (options: QueryOptions) => Contributor[];
}

export { MongooseContributorRepo };
