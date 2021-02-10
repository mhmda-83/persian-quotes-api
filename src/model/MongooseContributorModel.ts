import mongoose, { Document } from 'mongoose';

import { Contributor } from './contributor';
import { mongooseContributorSchema } from './MongooseContributorSchema';

export interface MongooseContributorDoc extends Contributor, Document {}

const MongooseContributorModel = mongoose.model<MongooseContributorDoc>(
  'contributor',
  mongooseContributorSchema,
);

export { MongooseContributorModel };
