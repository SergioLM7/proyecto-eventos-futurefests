const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const connectToDatabase = async() => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB Atlas with Mongoose!");
    } catch (err) {
      console.error("Error connecting to MongoDB Atlas:", err);
      process.exit(1);
    }
  }
  
  module.exports = connectToDatabase;