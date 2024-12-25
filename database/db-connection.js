const mongoose = require("mongoose");

const connection_string = "mongodb://localhost:27017/";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(connection_string);
    console.log(`Mongo Connection Successful: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
