const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres", //case sensitive
    host: "localhost",
    post: 5432,
    database: "quarantinetodo" //Case Sensitive  
});

module.exports=pool;
