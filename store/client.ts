import { default as mongodb, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client: MongoClient = new mongodb.MongoClient(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true
});

export default client;
