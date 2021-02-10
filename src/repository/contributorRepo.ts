import { Contributor } from '../model/contributor';
import { QueryOptions } from './queryOptions';

abstract class ContributorRepo {
  connect: () => void;
  getByTelegramId: (telegramId: string) => Promise<Contributor | null>;
  insertOne: (contributor: Contributor) => Promise<Contributor>;
  getAll: (options: QueryOptions) => Promise<Contributor[]>;
}

export { ContributorRepo };
