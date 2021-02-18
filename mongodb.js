import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true
});

let db;

client
  .connect()
  .then((client) => (db = client.db(process.env.MONGODB_DB_NAME)))
  .catch((err) => console.log('connection error:', err));

const findOne = async (collection, id) => {
  try {
    const _id = new mongodb.ObjectID(id);
    const document = await db.collection(collection).findOne({ _id: _id });
    return document;
  } catch (err) {
    console.log(err.stack);
  }
};

const findAll = async (collection) => {
  try {
    const documents = await db.collection(collection).find({}).toArray();
    return documents;
  } catch (err) {
    console.log(err.stack);
  }
};

const create = async (collection, doc) => {
  try {
    const col = db.collection(collection);
    await col.insertOne(doc);
  } catch (err) {
    console.log(err.stack);
  }
};

const del = async (collection, id) => {
  try {
    const _id = new mongodb.ObjectID(id);
    await db.collection(collection).deleteOne({ _id: _id });
  } catch (err) {
    console.log(err.stack);
  }
};

export { findOne, findAll, create, del };
