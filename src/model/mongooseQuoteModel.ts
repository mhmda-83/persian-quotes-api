import mongoose, { Document } from 'mongoose';

import schema from './mongooseQuoteSchema';
import { TranslatedQuote } from './translatedQuote';

export interface MongooseQuoteDoc extends TranslatedQuote, Document {}

const model = mongoose.model<MongooseQuoteDoc>('quote', schema);

export default model;
