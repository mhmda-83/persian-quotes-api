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
        useFindAndModify: false,
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

  async seed(data: Contributor[]): Promise<void> {
    const documentsCount = await MongooseContributorModel.countDocuments();

    if (documentsCount === 0) {
      await MongooseContributorModel.create(data);
    }
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
      { useFindAndModify: false, new: true },
    ).lean();

    return ContributorMapper.toDomain(updatedContributor);
  }

  async insertOne(contributor: Contributor): Promise<Contributor> {
    const insertedContributor = await MongooseContributorModel.create(
      contributor,
    );
    return ContributorMapper.toDomain(insertedContributor);
  }

  async getAll(options: QueryOptions): Promise<Contributor[]> {
    const docs: MongooseContributorDoc[] = await MongooseContributorModel.find(
      {},
    )
      .setOptions(options)
      .lean();

    return docs.map<Contributor>(ContributorMapper.toDomain);
  }

  public async deleteAll(): Promise<void> {
    await MongooseContributorModel.deleteMany({});
  }
}

export { MongooseContributorRepo };
