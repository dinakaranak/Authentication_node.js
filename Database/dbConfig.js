const mongoose = require ('mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Mongodb Connected"))
.catch((err)=>console.log(err));

module.exports = mongoose; 

// const config ={
//     user:'sa',
//     password:'sa123',
//     server:'127.0.0.1',
//     database:'db',
//     options:{
//         trustedconnection : true ,
//         enableArithAbort : true ,
//         instancename : 'SYSTEM10'
//     },
//     port : 1433
// }

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('db', 'sa', 'sa123', {
//     host: 'SYSTEM10',
//     dialect: 'mssql',
//     dialectOptions: {
//         options: {
//             encrypt: true,
//         },
//     },
// });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });


// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('mssql://sa:sa123@System10:1433/db');

// // const sequelize = new Sequelize('master', 'sa', 'sa123', {
// //     host: 'System10',
// //     dialect: 'mssql',
// //     pool: {
// //         max: 5,
// //         min: 0,
// //         acquire: 30000,
// //         idle: 10000
// //     },
// //     dialectOptions: {
// //         options: {
// //             encrypt: true
// //         }
// //     }
// // });

// // Test the connection
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((err) => {
//         console.error('Unable to connect to the database:', err);
//     });


