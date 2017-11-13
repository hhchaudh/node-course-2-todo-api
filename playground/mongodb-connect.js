/*jshint esversion: 6 */
/* jshint node: true */

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //pulls off MongoClient, and ObjectID

let obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2)); //ops stores all the docs that were inserted, it's in a JSON format
    // }); //insert new doc in collection

    // Insert new doc into Users (name, age, location)
    //
    // db.collection('Users').insertOne({
    //     name: 'Haaris Chaudhry',
    //     age: 31,
    //     location: 'Lawrence, KS'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(result.ops[0]._id.getTimestamp());
    // });


    db.close();
});
