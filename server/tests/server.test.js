/* jshint esversion: 6 */
/* jshint node: true */

const { ObjectID } = require('mongodb');

const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123123124,
}];

beforeEach((done) => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => {
    done();
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    const text = '';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => { // done arg used for async stuff
    request(app) // supertest req
      .get(`/todos/${todos[0]._id.toHexString()}`) // convert ObjectID to string in the URL
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text); // returned object should have todo property as set in server.js
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID malformed', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete doc', (done) => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID malformed', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const newTodo = {
      text: 'A new todo',
      completed: true,
    };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(newTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newTodo.text);
        expect(res.body.todo.completed).toBe(newTodo.completed);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(newTodo.text);
          expect(todo.completed).toBe(newTodo.completed);
          expect(todo.completedAt).toBeA('number');
          done();
        }).catch(e => done(e));
      });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString();
    const newTodo = {
      text: 'This is another todo',
      completed: false,
    }

    request(app)
      .patch(`/todos/${hexId}`)
      .send(newTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newTodo.text);
        expect(res.body.todo.completed).toBe(newTodo.completed);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(newTodo.text);
          expect(todo.completed).toBe(newTodo.completed);
          expect(todo.completedAt).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });
});
