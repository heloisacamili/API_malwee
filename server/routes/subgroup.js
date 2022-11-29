const Joi = require('joi');
const knl = require('../knl');

knl.post('subgroup', async(req, resp) => {
    const schema = Joi.object({
        nameProduct : Joi.string().min(1).max(100).required(),
        fkGroup : Joi.number().min(1).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Subgroup.findAll({
        where : {
            nameProduct : req.body.nameProduct,
            fkGroup : req.body.fkGroup
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.Subgroup.build({
        nameProduct : req.body.nameProduct,
        fkGroup : req.body.fkGroup,
        status   : 1
    });

    await user.save();
    resp.end();
});

knl.get('subgroup', async(req, resp) => {
    let result = await knl.sequelize().models.Subgroup.findAll({
        where : {
            status: 1
        }
    });
    result = knl.objects.copy(result);
    if (!knl.objects.isEmptyArray(result)){
        for(let subgroup of result){
            const group = await knl.sequelize().models.Group.findAll({
                where : {
                    id : subgroup.fkGroup
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                subgroup.group_description = group[0].description
            }

            console.log(subgroup.group_description)
        }
    }
    result = knl.objects.copy(result);
    console.log(result);
    resp.json(result);
    resp.end();
});

knl.get('subgroup/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Subgroup.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
});

knl.put('subgroup/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Subgroup.update({
        nameProduct : req.body.nameProduct
    },
    {
        where : {
            id: req.body.id
        }
    });
    resp.send(result);
    console.log(result);
    resp.end();
});

knl.delete('subgroup/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Subgroup.destroy({
        where : {
            id: req.params.id
        }
    });
    resp.json(result);
    console.log(result);
    resp.end();
})

knl.patch('subgroup/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Subgroup.update({
        status : 0
    },
    {
        where : {
            id: req.params.id,
        },
    });
    resp.json(result)
    resp.end();
})