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

router.post('/', async (req, res) => {
    try {
        const newPost = await Posts.insert(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding a post.'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Posts.remove(req.params.id);
        res.status(200).json(removedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing post.'})
    }
})

router.put('/:id', async (req, res) => {
    try {
    const updatedPost = await Posts.update(req.params.id, req.body);
    res.status(201).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: 'Error updating post.'})
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.params.id, req.params.comments);

        if(comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: 'Comments not found'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving comments.'})
    }
    
})
module.exports = router;