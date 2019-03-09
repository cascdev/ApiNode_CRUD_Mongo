const Customer = require('../models/customer.model')


// POST (Cria novo Customer)
exports.create = (req, res) => {
    //Cria novo Customer
    const customer = new Customer(req.body)

    // Salva o Customer no MongoDB
    customer.save()
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        })
    })
}

// UPDATE um Customer passando seu Id
exports.update = (req, res) => {
    const id = req.params.customerId
    const body = req.body

    const opts = { new: true, upsert: true }

    Customer.findByIdAndUpdate({_id : id}, {$set:body}, opts)
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer não encontrado Id: " + req.params.customerId
                })
            }
            res.json(customer)
        }).catch(err => { console.log(err) })
}

// FETCH todos Customers
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.json(customers)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}

// FIND - Busca um Customer por Id
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer não encontrado Id: " + req.params.customerId
            })            
        }
        res.json(customer) 
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer não encontrado Id: " + req.params.customerId
            })                
        }
        return res.status(500).json({
            msg: "Erro ao tentar recuperar o Customer de id: " + req.params.customerId
        })
    })
}

// DELETE
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer não encontrado Id: " + req.params.customerId
            })
        }
        res.json({msg: "Customer com sucesso!"})
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Customer não encontrado Id: " + req.params.customerId
            })                
        }
        return res.status(500).json({
            msg: "Não pode ser deletado o Customer id: " + req.params.customerId
        })
    })
}
