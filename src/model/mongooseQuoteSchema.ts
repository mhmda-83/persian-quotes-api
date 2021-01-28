/* eslint-disable func-names */
import mongoose from 'mongoose';

import { QuoteState } from '../data/quote';

const schema = new mongoose.Schema({
  original: {
    text: { type: String, required: true },
    author: { type: String, required: true },
    categories: { type: [String], required: true },
  },
  translated: {
    text: { type: String, required: true },
    author: { type: String, required: true },
    categories: { type: [String], required: true },
  },
  verified: {
    type: String,
    enum: [
      QuoteState.NOT_TRANSLATED,
      QuoteState.NOT_VERIFIED,
      QuoteState.VERIFIED,
    ],
    default: QuoteState.NOT_VERIFIED,
    required: true,
  },
});

// eslint-disable-next-line prefer-arrow-callback
schema.post('aggregate', function (docs) {
  docs.forEach((doc: { id: any; _id: any }) => {
    doc.id = doc._id;
  });
});

export default schema;
