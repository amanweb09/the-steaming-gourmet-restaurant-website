require('dotenv').config();

const envVar = () => {
    return {
        PORT,
        JWT_SECRET
    } = process.env
}

module.exports = envVar;
