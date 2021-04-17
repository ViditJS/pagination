const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('mongo db connection success');
    } catch(error) {
        console.log('error', error);
        process.exit(1);
    }
}

module.exports = connectDB;