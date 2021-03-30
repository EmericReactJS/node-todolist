import client from './client.js';

let db;

client
  .connect()
  .then((client) => (db = client.db(process.env.MONGODB_DB_NAME)))
  .catch((err) => console.log('connection error:', err));

const findOne = async (collection, query) => {
  try {
    const document = await db.collection(collection).findOne(query);
    return document;
  } catch (err) {
    console.log(err.stack);
  }
};

const findAll = async (collection, query) => {
  try {
    const documents = await db
      .collection(collection)
      .findOne(query, { projection: { todos: 1 } });
    return documents;
  } catch (err) {
    console.log(err.stack);
  }
};

const insertOne = async (collection, doc) => {
  try {
    const col = db.collection(collection);
    const result = await col.insertOne(doc);
    return result.ops[0];
  } catch (err) {
    console.log(err.stack);
  }
};

const update = async (collection, query, doc) => {
  try {
    const col = db.collection(collection);
    const result = await col.updateOne(query, { $push: doc });
    return result;
  } catch (err) {
    console.log(err.stack);
  }
};

const deleteOne = async (collection, query, doc) => {
  try {
    const col = db.collection(collection);
    const result = await col.updateOne(query, { $pull: { todos: doc } });
    return result;
  } catch (err) {
    console.log(err.stack);
  }
};

export { findOne, findAll, insertOne, update, deleteOne };
