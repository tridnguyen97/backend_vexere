const dotenv = require("dotenv")
dotenv.config()

// need .env
let mongoUri;
let port;
let secretKey;
let email,password;

switch (process.env.NODE_ENV) {
    case "local":
        mongoUri = process.env.LOCAL_MONGODB_URI
        port = process.env.LOCAL_PORT
        secretKey = process.env.LOCAL_SECRET_KEY
        email = process.env.LOCAL_EMAIL
        password = process.env.LOCAL_PASSWORD
        break;

    case "staging":
        mongoUri = process.env.STAGING_MONGODB_URI
        port = process.env.STAGING_PORT
        secretKey = process.env.STAGING_SECRET_KEY
        email = process.env.STAGING_EMAIL
        password = process.env.STAGING_PASSWORD
        
        break;
        
    console.log(mongoUri)
}

module.exports = {mongoUri,port,secretKey,email,password}