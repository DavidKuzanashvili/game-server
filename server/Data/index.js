const mongoose = require('mongoose')
const MongoDbContext = require('./Models/MongoDbContext')

const initDb = () => {
  //   const db = new MongoDbContext('mongodb://localhost', mongoose)
  //   db.setup('', 'app').add(
  //     'Users',
  //     { firsName: String, lastName: String, age: Number },
  //     { firsName: 'Divad', lastName: 'Ilivshanazuk', age: 22 }
  //   )
}

module.exports = initDb
