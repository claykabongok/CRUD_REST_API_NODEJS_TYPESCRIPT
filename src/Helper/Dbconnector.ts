import mongoose from "mongoose";

/**
 * connect to the db with connection string as param
 */
export default (database: string) => {
  const connect = () => {
    mongoose
      .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })

      .then(() => console.log(`Database connection successful.....`))
      .catch((error) => {
        console.log("Unable to connect to the db: " + error.message);
        return process.exit(1);
      });
    mongoose.set("useCreateIndex", true);
  };
  connect();
  mongoose.connection.on("disconnected", () => {
    console.log(`Db disconnected`);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};
