const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(router)
app.use(errorHandler)



if(process.env.NODE_ENV != "test"){
  app.listen(port, () => {
      console.log("berjalan di port "+ port)
  })
}

module.exports = app