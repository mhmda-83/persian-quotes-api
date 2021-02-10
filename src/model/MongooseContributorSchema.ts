/* eslint-disable func-names */
import mongoose from 'mongoose';

const mongooseContributorSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  contributionCount: { type: Number, required: true, default: 0 },
});

export { mongooseContributorSchema };
