const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo.js');
const { User } = require('./models/user.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => { // creating a new todo
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos }); // todos: todos
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/123123
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    return res.status(200).send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
  return undefined;
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    return res.status(200).send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
  return undefined;
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;

  const body = _.pick(req.body, ['text', 'completed']); // use lodash to rip off props 'text' and 'completed'

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); // return javascript timestamp (ms from january 1 1970)
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => { // new: true -> get the new item
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
