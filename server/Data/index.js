const mongoose = require('mongoose')
const MongoDbContext = require('./Models/MongoDbContext')

const initDb = () => {
  // const db = new MongoDbContext('mongodb://localhost', mongoose)
  // db.setup('', 'app').add(
  //   'Users',
  //   { firsName: String, lastName: String, age: Number, phoneNumber: String },
  //   {
  //     firsName: 'Divad',
  //     lastName: 'Ilivshanazuk',
  //     age: 22,
  //     phoneNumber: '175030795',
  //   }
  // )
}

module.exports = initDb
