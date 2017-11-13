// /*jshint esversion: 6 */
// /* jshint node: true */

// //const MongoClient = require('mongodb').MongoClient;
// const {MongoClient, ObjectID} = require('mongodb');  //pulls off MongoClient, and ObjectID values and stores in same name variables

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // get an error or the database
//     if(err) {
//         return console.log('Unable to connect to MongoDB server');
//     }
//     console.log('Connected to MongoDB server');

//     // deleteMany
//     // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//     //     console.log(result);
//     // });

//     //deleteOne
//     // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//     //     console.log(result);
//     // });

//     //findOneAndDelete (gets data back)
//     // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//     //     console.log(result);
//     // });

//     // db.collection('Users').deleteMany({name: 'Haaris'}).then((result) => {
//     //     console.log(result);
//     // });

//     db.collection('Users').findOneAndDelete({_id: new ObjectID('5a08e7909041b33580256f14')}).then((result) => {
//         console.log(result);
//     });

//     // db.close();
// });
