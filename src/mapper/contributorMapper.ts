import { Contributor } from '../model/contributor';
import { MongooseContributorDoc } from '../model/MongooseContributorModel';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ContributorMapper {
  public static toDomain(contributor: null): null;
  public static toDomain(contributor: MongooseContributorDoc): Contributor;
  public static toDomain(
    contributor: MongooseContributorDoc | null,
  ): Contributor | null;
  public static toDomain(
    contributor: MongooseContributorDoc | null,
  ): Contributor | null {
    if (contributor == null) {
      return null;
    }
    return {
      telegramId: contributor.telegramId,
      contributionCount: contributor.contributionCount,
    };
  }
}

export { ContributorMapper };
