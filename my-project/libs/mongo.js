const {
  MongoClient,
  ObjectId
} = require('mongodb');
// console.log(require('mongodb'));
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = '1810';
// Use connect method to connect to the server

let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        // console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}

//增加
let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

//删除
let del = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.deleteMany(obj,(err,result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

//查询
let find = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.find({
      ...obj
    }).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
      }
    });
  })
}

//修改
let sort = (col, obj, obj2) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.updateMany(obj,{$set:obj2},(err,docs)=>{
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
      }
    })
  })
}



module.exports = {
  connect,
  insert,
  find,
  del,
  ObjectId,
  sort
}

// node express mongodb jquery