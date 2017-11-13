/*jshint esversion: 6 */
/* jshint node: true */

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //pulls off MongoClient, and ObjectID values and stores in same name variables

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // get an error or the database
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a08f8e6b430a180d91e8127')
    // }, {
    //     $set: {                     //using update operator which is an object that contains what we want to set certain property fields to
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a08e6dd1b308464209270e8')
    }, {
        $set: {
            name: 'Haaris'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    // db.close();
});
