const controller = {};

//list es un metodo propio de js.
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT*FROM customer', (err, customer) => {
            if (err) {
                res.json(err)
            }
            console.log(customer);
            res.render('customer.ejs', {
                data: customer
            })
        });
    });
};
controller.save = (req, res) => {
    const data = req.body;//con esto  vemos los datos del form. 
    //hacemos la coneccon con mysql
    req.getConnection((err, conn) => {
        //voy a insertar dentro de customer los siguientes datos
        conn.query('INSERT INTO customer set ?', [data], (err, rows) => {

            res.redirect('/');

        })

    });


};

controller.delete = (req, res) => {
    console.log(req.params);//le pasamos por peticion .
    req.getConnection((err, conn) => {
        //conectamos a mysql borramos segun codigo sql  cuando id = al dato que le paso.colocamos un nuevo callback(err,rows)
        //y redireccionamos. 
        conn.query('DELETE FROM customer WHERE id =?', [req.params.id], (err, rows) => {
            res.redirect('/');
        })
    });

};
//BUSCA EL DATO A ACTUALIZAR.
controller.update = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id=?', [req.params.id], (err, customer) => {
            res.render('customer_edit.ejs', {
                data: customer[0]
            })
        });

    });


};
//ACTUALIZA EL DATO ENCONTRADO.

controller.editar = (req, res) => {
    //esto es igual a const id= req.params.id
    const { id } = req.params;
    //este newcustomer son los nuevos datos a actualizar. 
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        //traduccion actualiza el comprador cuando el id sea = al que le paso.. 
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    })
}
module.exports = controller;