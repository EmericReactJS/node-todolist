import { Db, FilterQuery, ObjectId, UpdateWriteOpResult } from 'mongodb';
import client from './client';

export interface Todo {
  name: string;
}

export interface User {
  _id?: ObjectId;
  name: string;
  password: string;
  todos: Todo[];
}

let db: Db;

client
  .connect()
  .then((client) => (db = client.db(process.env.MONGODB_DB_NAME)))
  .catch((err) => console.log('connection error:', err));

const findOne = async (
  collectionName: string,
  filter: FilterQuery<User>
): Promise<User> => {
  try {
    const document = await db.collection(collectionName).findOne(filter);
    return document;
  } catch (err) {
    throw new Error(err.stack);
  }
};

/**
 *
 * @param collectionName
 * @param filter expects a key-value pair from User Model.
 * @returns
 */
const findAllTodos = async (
  collectionName: string,
  filter: FilterQuery<User>
): Promise<Todo[]> => {
  try {
    const document = await db
      .collection(collectionName)
      .findOne(filter, { projection: { _id: 0, todos: 1 } });
    return document.todos;
  } catch (err) {
    throw new Error(err.stack);
  }
};

const insertOne = async (
  collectionName: string,
  document: User
): Promise<User> => {
  try {
    const result = await db.collection(collectionName).insertOne(document);
    return result.ops[0];
  } catch (err) {
    throw new Error(err.stack);
  }
};

const update = async (
  collectionName: string,
  filter: FilterQuery<User>,
  document: Todo
): Promise<UpdateWriteOpResult> => {
  try {
    const result = await db
      .collection(collectionName)
      .updateOne(filter, { $push: { todos: document } });
    return result;
  } catch (err) {
    throw new Error(err.stack);
  }
};

const deleteOne = async (
  collectionName: string,
  filter: FilterQuery<Todo>,
  documentName: Todo['name']
): Promise<UpdateWriteOpResult> => {
  try {
    const result = await db
      .collection(collectionName)
      .updateOne(filter, { $pull: { todos: { name: documentName } } });
    return result;
  } catch (err) {
    throw new Error(err.stack);
  }
};

export { findOne, findAllTodos, insertOne, update, deleteOne };
