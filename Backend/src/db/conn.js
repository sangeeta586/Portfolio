// ./src/db/conn.js
import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Hi, Portfolio! You connected with database:",
      connect.connection.host,
      connect.connection.name,
      "😊😊😊😊😊😊"
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb; // Use export instead of module.exports
