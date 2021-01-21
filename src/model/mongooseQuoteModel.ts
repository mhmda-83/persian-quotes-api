import mongoose, { Document } from 'mongoose';

import schema from './mongooseQuoteSchema';
import { Quote } from './quote';

interface MongooseQuoteDoc extends Document {
  original: Quote;
  translated: Quote;
}

const model = mongoose.model<MongooseQuoteDoc>('quote', schema);

export default model;
