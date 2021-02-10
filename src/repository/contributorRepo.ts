import { Contributor } from '../model/contributor';
import { QueryOptions } from './queryOptions';

abstract class ContributorRepo {
  getByTelegramId: (telegramId: string) => Promise<Contributor>;
  getAll: (options: QueryOptions) => Promise<Contributor[]>;
}

export { ContributorRepo };
