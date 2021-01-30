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
    text: { type: String, required: false },
    author: { type: String, required: false },
    categories: { type: [String], required: false },
  },
  state: {
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

//eslint-disable-next-line prefer-arrow-callback
schema.post(/(aggregate)|(^find)/, function (docs) {
  docs.forEach((doc: any) => {
    doc.id = doc._id;
    Reflect.deleteProperty(doc, '_id');
    Reflect.deleteProperty(doc, '__v');
    doc = doc.toObject();
  });
});

export default schema;
