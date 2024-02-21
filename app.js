const express = require('express')
const app = express()
const cors = require('cors');
const port = 4000
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}))

app.use("/api/v1",router)

app.use((req, res, next) => {
  try{
    throw { name: "notFoundEndpoin" }; 
  }catch(error){
    next(error)
  }
});

app.use(errorHandler)


if(process.env.NODE_ENV != "test"){
  app.listen(port, () => {
      console.log("berjalan di port "+ port)
  })
}

module.exports = app