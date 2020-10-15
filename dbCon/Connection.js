const {DbConn} = require('../Constants');
const {
    DATABASE_URL,
    DATABASE_PORT
} = DbConn

module.exports = {
    database:DATABASE_URL,
    port:DATABASE_PORT
}
