import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true
});

export default client;
