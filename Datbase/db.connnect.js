const mongoose = require('mongoose')

const initializeConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.URI , {
            useUnifiedTopology : true,
            useNewUrlParser : true})
        if(connection) {
            console.log('successfully connected')
        }
    } catch (error) {
        console.log('Connection failed' , error)
    }
}


module.exports = {initializeConnection}