//test config
var config = {};

config.port = 3000;

var db_server = "rat080";
var db_user = "root";
var db_password = "";

config.serviceServerDB =
{
    connectionLimit: 5,
    host: db_server,
    database: "sd_servicedb",
    user: db_user,
    password: db_password
};

module.exports = config;
