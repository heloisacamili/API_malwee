const Joi = require('joi');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(100).required(),
        cnpj : Joi.string().min(1).max(14).required(),
        socialReason : Joi.string().min(1).max(100).required(),
        //clienteDesde : Joi.string().min(1).max(14).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Client.findAll({
        where : {
            nome : req.body.nome
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const client = knl.sequelize().models.Client.build({
        name : req.body.name,
        cnpj : req.body.cnpj,
        socialReason : req.body.socialReason,
        //clienteDesde : req.body.clienteDesde,
        status   : 1
    });

    await client.save();
    resp.end();
});

knl.get('client', async(req, resp) => {

    const result = await knl.sequelize().models.Client.findAll({
        where : {
            status: 1
        }
    });
    resp.json(result);
    resp.end();
});

knl.get('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.Client.findAll({
        where : {
            id : req.params.id
        }
    });
    resp.json(result);
    resp.end();
});

knl.put('client/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Client.update({
        where : {
            id: req.body.id
        }
    });
    resp.send(result);
    resp.end();
})

knl.delete('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.client.destroy({
        where : {
            id: req.params.id
        }
    });
    resp.json(result);
    resp.end();
})

knl.patch('client/:id', async(req, resp) => {

    const result = await knl.sequelize().models.Client.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });
    resp.json(result)
    resp.end();
})