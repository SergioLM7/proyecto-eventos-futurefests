const mongoose = require("mongoose");
require('dotenv').config();

const connectToDatabase = async() => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB Atlas with Mongoose!");
    } catch (err) {
      console.error("Error connecting to MongoDB Atlas:", err);
      process.exit(1);
    }
  }
  
  module.exports = connectToDatabase;