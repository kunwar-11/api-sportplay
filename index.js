const {initializeConnection} = require('./Datbase/db.connnect')
const {addVideosToDb} = require('./models/video.model')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cors())
const PORT = process.env.PORT || 8000

initializeConnection()
//addVideosToDb() to be added only once

app.get('/' , (req , res) => {
    res.send('hello this is an  API for SPORTPLAY')
})

app.use((req , res) => {
    res.status(404).json({success : false  , message : 'page ont found'})
})

app.use((err , req ,res , next) => {
    console.error(err.stack)
    res.status(500).json({success : false , message : 'something went wrong' , error : err.message})
})

app.listen(PORT , () => console.log(`Server started at port : ${PORT}`))