import { MongoClient } from "mongodb";

export type ProductType = {
  id: number;
  title: string;
};

const mongoUri =
  process.env.mongoURI ||
  "mongodb+srv://dima:8326@cluster0.m6o8v9k.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(mongoUri);
const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");

export async function runDb() {
  try {
    await client.connect();
    await client.db("products").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to db");
    await client.close();
  }
}
