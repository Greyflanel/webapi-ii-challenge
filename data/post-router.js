const express = require('express');

const router = express.Router();
const Posts = require('./db');

router.get('/', async (req, res) => {
 try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
console.log(error);
res.status(500).json({ message: 'Error retrieving the posts.'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const postId = await Posts.findById(req.params.id);

        if(postId) {
            res.status(200).json(postId);
        } else {
            res.status(404).json({ message: 'Post not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the post.'})
    }
})

module.exports = router;