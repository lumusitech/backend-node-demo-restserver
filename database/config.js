const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE online");
  } catch (error) {
    console.log(`ERROR DATABASE: ${error}`);
    throw new Error(`ERROR DATABASE: ${error}`);
  }
};

module.exports = {
  dbConnection,
};
