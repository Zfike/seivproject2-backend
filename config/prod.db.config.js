module.exports = {
    HOST: 't0-database.czjofbims6cw.us-west-2.rds.amazonaws.com',
    port: 3306,
    USER: 'admin',
    PASSWORD: 'passwordt0',
    DB: 'course',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};