require("dotenv").config({path: './config.env'});
const fs = require('fs');
const Post = require('../models/Post');
const connectDB = require('../config/db');

connectDB();

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));

const importData = async () => {
    try {
        await Post.create(posts);
        console.log('Data succesfully imported');
        process.exit();
    } catch(error) {
        console.log('error');
    }
}

const deleteData = async () => {
    try {
        await Post.deleteMany({});
        console.log('Data succesfully deleted');
    } catch(error) {
        console.log('error');
    }
}

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}