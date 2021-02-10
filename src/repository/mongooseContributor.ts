import mongoose from 'mongoose';
import { Inject, InjectValue } from 'typescript-ioc';

import { Config, Logger } from '../config';
import { ContributorMapper } from '../mapper/contributorMapper';
import { Contributor } from '../model/contributor';
import {
  MongooseContributorDoc,
  MongooseContributorModel,
} from '../model/MongooseContributorModel';
import { ContributorRepo } from './contributorRepo';
import { QueryOptions } from './queryOptions';

class MongooseContributorRepo implements ContributorRepo {
  @Inject private logger: Logger;
  @InjectValue('config') private config: Config;

  public connect() {
    mongoose
      .connect(this.config.databaseUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        this.logger.info('connected to database successfully ⚙');
      })
      .catch((err) => {
        this.logger.info(
          'following error occurred while connecting to database ❌:',
        );
        this.logger.error(err);
      });
  }

  async getByTelegramId(telegramId: string): Promise<Contributor | null> {
    const contributor: MongooseContributorDoc = await MongooseContributorModel.findOne(
      {
        telegramId,
      },
    ).lean();
    return ContributorMapper.toDomain(contributor);
  }

  async incrementContributionCountByTelegramId(
    telegramId: string,
  ): Promise<Contributor | null> {
    const updatedContributor: MongooseContributorDoc = await MongooseContributorModel.findOneAndUpdate(
      { telegramId },
      { $inc: { contributionCount: 1 } },
      { returnOriginal: false },
    ).lean();

    return ContributorMapper.toDomain(updatedContributor);
  }

  async insertOne(contributor: Contributor): Promise<Contributor> {
    const insertedContributor = await MongooseContributorModel.create(
      contributor,
    );
    return ContributorMapper.toDomain(insertedContributor);
  }

  getAll: (options: QueryOptions) => Promise<Contributor[]>;
}

export { MongooseContributorRepo };
