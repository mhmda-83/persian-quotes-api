import { Context } from '../../../infra/bot/context';

const saveUserContribution = async (ctx: Context) => {
  if (ctx.from?.id == null) return ctx.logger.log("user didn't have a id");

  const telegramId = String(ctx.from.id);
  const contributor = await ctx.contributorRepo.getByTelegramId(telegramId);
  if (contributor == null) {
    const newContributor = await ctx.contributorRepo.insertOne({
      telegramId,
      contributionCount: 1,
    });
    return newContributor;
  }
  const updatedContributor = await ctx.contributorRepo.incrementContributionCountByTelegramId(
    telegramId,
  );
  return updatedContributor;
};

export { saveUserContribution };
