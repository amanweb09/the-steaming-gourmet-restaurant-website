const mongoose = require('mongoose');

async function dbConnection() {
    try {
        await mongoose.connect(process.env.COMPASS_CONNECTION_STRING, (err, conn) => {
            if (conn) {
                console.log('Database Connected ...');
            }
            if (err) {
                console.log(err)
                console.log('Database not Connected :(');
            }
        })
    } catch {
        err => {
            console.log(err.message)
            console.log('Database could not Connected :(');
        }
    }
}


module.exports = dbConnection;