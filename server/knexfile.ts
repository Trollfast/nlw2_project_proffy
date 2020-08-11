import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname,'src', 'database' , 'database.sqlite' )
    },
    migrations: {
        diretory: path.resolve(__dirname, 'src' , 'migrations' )
    },

    useNullAsDefault: true,

};