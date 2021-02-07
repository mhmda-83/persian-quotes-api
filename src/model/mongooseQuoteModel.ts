import mongoose, { Document } from 'mongoose';

import schema from './mongooseQuoteSchema';
import { Quote } from './quote';

export interface MongooseQuoteDoc extends Quote, Document {
  id: string;
}

const model = mongoose.model<MongooseQuoteDoc>('quote', schema);

export default model;
