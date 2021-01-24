import mongoose from 'mongoose';

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
  verified: { type: String, required: true },
});

export default schema;
