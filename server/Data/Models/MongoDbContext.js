const DbContext = require('./DbContext')

class MongoDbContext extends DbContext {
  constructor(connectionString, mongoose) {
    super(connectionString)
    this.mongoose = mongoose
    this.db = {}
  }

  setup(connectionString, dbName) {
    if (connectionString) {
      this.connectionString = connectionString
    }

    if (!dbName) throw new Error('Db name must be specifeid')

    this.mongoose.connect(`${this.connectionString}/${dbName}`, {
      useNewUrlParser: true,
    })
    this.db = this.mongoose.connection

    this.db.on('error', console.error.bind(console, 'Connection error:'))

    return this
  }

  add(collectionName, schema, value) {
    const { Schema } = this.mongoose
    this.db.once('open', () => {
      const sm = new Schema(schema)
      const Model = this.mongoose.model(collectionName, sm)
      const obj = new Model(value)
      obj.save(function (err, obj) {
        if (err) return console.error(err)
        console.log(obj)
      })
    })

    return this
  }
}

module.exports = MongoDbContext
