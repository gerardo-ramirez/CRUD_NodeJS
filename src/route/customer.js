const express = require('express');
const route = express.Router();
//importamos el objeto creado.
customerController=require('./../controllers/customerControler');



//pasamos el objeto y metodo de customerControllers:
route.get('/',customerController.list);
//router escucha a traves del metodo post a /add,  y ejecuta la logica de la funcion customerController.save
route.post('/add', customerController.save);
//necesario el delete/:id para pasar el id correcto.
route.get('/delete/:id', customerController.delete);

route.get('/update/:id', customerController.update);
route.post('/update/:id', customerController.editar);


module.exports = route;