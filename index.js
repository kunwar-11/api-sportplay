const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 8000

app.get('/' , (req , res) => {
    res.send('hello this is an  API for SPORTPLAY')
})

app.listen(PORT , () => console.log(`Server started at port : ${PORT}`))