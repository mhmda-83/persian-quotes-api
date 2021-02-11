import chai, { expect } from 'chai';
import chaiThings from 'chai-things';
import { Container } from 'typescript-ioc';

import { ContributorRepo } from '../../src/repository/contributorRepo';
import { contributorSamples } from '../data/contributorSamples';
import { createContainer } from '../mocks.config';

chai.should();
chai.use(chaiThings);

describe('mongooseContributorRepo', () => {
  Container.configure(...createContainer());
  const repo = Container.get(ContributorRepo);

  before('connect to db', () => {
    repo.connect();
  });

  beforeEach(async () => {
    await repo.deleteAll();
    await repo.seed(contributorSamples);
  });

  it('should return document by telegramId', async () => {
    const [sample] = contributorSamples;
    const doc = await repo.getByTelegramId(sample.telegramId);
    expect(doc?.contributionCount)
      .to.be.a('number')
      .and.eq(sample.contributionCount);
  });

  it('should return incremented contributionCount document by telegramId', async () => {
    const sample = contributorSamples[2];
    const doc = await repo.incrementContributionCountByTelegramId(
      sample.telegramId,
    );
    expect(doc?.contributionCount)
      .to.be.a('number')
      .and.eq(sample.contributionCount + 1);
  });
});
