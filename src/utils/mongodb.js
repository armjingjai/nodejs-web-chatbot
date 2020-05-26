const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://127.0.0.1:27017';
 
// Database Name
const dbName = 'task-manager';

const get_chat = (action, user, message, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        if(err){
            return console.log("Can't connect to server");
        }
        console.log("Connected successfully to server");
    
        const db = client.db(dbName);

        // db.collection('chat_history').insertOne({
        //     user: 'user',
        //     message: 'Hello'
        // }, (error, result) => {
        //     if(error){
        //         return console.log('Unable to insert')
        //     }
        //     console.log(result.ops)
        // })

        switch(action){
            case 'getAll':
                db.collection('chat_history').find({}).toArray((err, result) => {
                    if(err){
                        return console.log('error cant get result')
                    }
                    callback(result)
                    console.log(result)
                })
            break
            case 'add':
                db.collection('chat_history').insertOne({
                    user: user,
                    message: message
                }, (error, result) => {
                    if(error){
                        return console.log('Unable to insert')
                    }
                    callback(undefined)
                    console.log(result.ops)
                })
            break
        }
    
        client.close();
    });
}
module.exports = get_chat
