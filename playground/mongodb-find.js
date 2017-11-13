/*jshint esversion: 6 */
/* jshint node: true */

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //pulls off MongoClient, and ObjectID values and stores in same name variables

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // get an error or the database
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5a08e5d03f4f3142442cdbc7")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // }); //fetch all todos (a pointer)

    db.collection('Users').find({name: 'Haaris'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // db.close();
});
