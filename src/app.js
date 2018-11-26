const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection= require('express-myconnection');
const customerRoute = require('./route/customer');

//SETTING
app.set('port',8080);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host:'den1.mysql6.gear.host',
    user:'crudmysql',
    password: 'Dn3N_v25_8CM',
    port: 3306 ,
    database:'crudmysql'
},'single'));
//metodo que nos va permitir entender todos los datos del formulario.
app.use(express.urlencoded({extended: false}));//false porque no va a enviar datos complicados.

//STATIC FILE
app.use(express.static(path.join(__dirname,'public')));

//ROUTES
app.use(customerRoute);

//LISTEN SERVER
app.listen(app.get('port'),()=>{
console.log ('escuchando')
});