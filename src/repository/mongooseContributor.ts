import { ContributorMapper } from '../mapper/contributorMapper';
import { Contributor } from '../model/contributor';
import {
  MongooseContributorDoc,
  MongooseContributorModel,
} from '../model/MongooseContributorModel';
import { ContributorRepo } from './contributorRepo';
import { QueryOptions } from './queryOptions';

class MongooseContributorRepo implements ContributorRepo {
  async getByTelegramId(telegramId: string): Promise<Contributor | null> {
    const contributor: MongooseContributorDoc = await MongooseContributorModel.findOne(
      {
        telegramId,
      },
    ).lean();
    return ContributorMapper.toDomain(contributor);
  }
  getAll: (options: QueryOptions) => Promise<Contributor[]>;
}

export { MongooseContributorRepo };
