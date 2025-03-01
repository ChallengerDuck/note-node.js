const express = require('express');
const router = express.Router();
const {
    getPost,
    getPosts,
    deletePost,
    addPost,
    editPost
} = require('../controllers/api-post-controller')

router.get('/api/posts', getPosts);
router.post('/api/post', addPost);
router.get('/api/post/:id', getPost);
router.delete('/api/post/:id', deletePost);
router.put('/api/post/:id', editPost);

module.exports = router;