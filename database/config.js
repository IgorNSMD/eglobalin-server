const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
            await mongoose.connect( process.env.CONNECTION_STRING );

            console.log('Db Online...')
        
    } catch (error) {
        console.log(error)
        throw new Error('Database initialization error...')
    }

}

module.exports = {
    dbConnection   
}