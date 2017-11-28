// vim:ts=2:et

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./post.js');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/posts', (req, res) => {
  db.collection('posts').find().toArray().then(posts => {
    const metadata = { total_count: posts.length };
    res.json({ _metadata: metadata, records: posts });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  ///newPost.id = posts.length + 1;
  newPost.created = new Date();
  ///if (!newPost.status)
  ///  newPost.status = 'New';

  const err = Post.validatePost(newPost);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  ///posts.push(newPost);
  ///res.json(newPost);

  db.collection('posts').insertOne(newPost).then(result =>
    db.collection('posts').find({ _id: result.insertedId }).limit(1).next()
  ).then(newPost => {
    res.json(newPost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb://localhost/simpleblog').then(connection => {
  db = connection;
  app.listen(4000, () => {
    console.log('App started on port 4000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

