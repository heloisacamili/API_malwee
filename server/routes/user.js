const Joi = require('joi');
const knl = require('../knl');

knl.post('user', async(req, resp) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(100).required(),
        username : Joi.string().min(1).max(100).required(),
        password : Joi.string().min(6).max(16).required(),
        cpassword : Joi.string().min(6).max(16).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Usuario.findAll({
        where : {
            username : req.body.username
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));
    knl.createException('0007', '', req.body.password != req.body.cpassword);

    const user = knl.sequelize().models.Usuario.build({
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password),
        status   : 1
    });

    await user.save();
    resp.end();
})

knl.get('user', async(req, resp) => {
    const result = await knl.sequelize().models.Usuario.findAll({
        where : {
            status: 1
        }
    });
    resp.json(result);
    resp.end();
});

knl.get('user/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Usuario.findAll({
        where : {
            id : req.params.id
        }
    });
    resp.json(result);
    resp.end();
});

knl.put('user', async(req,resp)=>{
    const result = await knl.sequelize().models.Usuario.update({
        password  : md5(req.body.password)
    },{
        where : {
            id : req.body.id,
        }
    })
    resp.send(result);
    resp.end();
});

knl.patch('user/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Usuario.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });
    resp.json(result)
    resp.end();
});