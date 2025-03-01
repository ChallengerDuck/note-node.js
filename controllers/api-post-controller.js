 const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error.message)
};

const getPost = (req, res) => {
  Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error))
  }
  
const deletePost = (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => handleError(res, error))
    
  }
  
const getPosts = (res) => {
  Post
    .find()
    .sort({ createdAt: -1})
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error))
    
  }
  
const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error))
  }

const editPost= (req, res) => {
  const {text, title, author} = req.body;
  const {id} = req.params;

  Post
    .findByIdAndUpdate(id, {text, title, author}, {new: true})
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error))
}

module.exports = {
  getPost,
  getPosts,
  deletePost,
  addPost,
  editPost
};