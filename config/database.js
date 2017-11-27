/**
 * Connection URI for a Mongo database that will hold our
 * application's persistent data.
 */
module.exports = process.env.MONGODB_URI || 'mongodb://localhost:27017/snowflake';
