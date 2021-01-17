const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('./config.env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true  
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);

  } catch (err) {
    console.log(`MongoDB connection failed with rejected ${err}`.red.underline.bold);
  }
};

module.exports = connectDB;
