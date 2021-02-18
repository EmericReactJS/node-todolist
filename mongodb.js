import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true
});

const find = async (collection) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME);
    const document = await db.collection(collection).find({}).toArray();
    return document;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

const create = async (collection, body) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME);
    await db.collection(collection).insertOne(body);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

const del = async (collection, id) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME);
    await db.collection(collection).deleteOne(id);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

export { find, create, del };
