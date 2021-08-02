import { MongoClient } from "mongodb";

const db = async (config: Config) => {
  const mongoClient = new MongoClient(config.provenDb.uri);

  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const currentVersion = await db.command({ getVersion: 1 });
    console.log("connecting to proven db at" + JSON.stringify(currentVersion));
  } catch (error) {
    console.error(error);
  }
};

export default db;
