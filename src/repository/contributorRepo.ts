import { Contributor } from '../model/contributor';
import { QueryOptions } from './queryOptions';

abstract class ContributorRepo {
  getByTelegramId: (telegramId: string) => Contributor;
  getAll: (options: QueryOptions) => Contributor[];
}

export { ContributorRepo };
