const express = require('express');
const Post = require('../models/Post');

getAllPosts = async (req, res) => {
    try {
        let query = Post.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * pageSize;
        const total = await Post.countDocuments();

        const pages = Math.ceil(total / pageSize);

        if(page > pages) {
            res.status(404).json({
                status: 'fail',
                message: 'No page found'
            })
        }

        //Skip will skip the some number of documents with limit of pagesize
        query = query.skip(skip).limit(pageSize);

        const result = await query;

        res.status(200).json({
            status: 'success',
            count: result.length,
            page,
            pages,
            data: result
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        })
    }
};

module.exports = getAllPosts;