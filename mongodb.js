import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true
});

client.connect().then(
  () => console.log('db connected'),
  (err) => console.log(err)
);

const db = client.db(process.env.MONGODB_DB_NAME);

export default db;
