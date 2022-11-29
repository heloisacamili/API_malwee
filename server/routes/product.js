const Joi = require('joi');
const knl = require('../knl');

knl.post('product', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(100).required(),
        price : Joi.number().min(1).required(),
        fkGroup : Joi.number().min(1).required(),
        fkSubgroup : Joi.number().min(1).required(),
        fkCollection : Joi.number().min(1).required()
        })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Product.findAll({
        where : {
            description : req.body.description,
            price : req.body.price,
            fkGroup : req.body.fkGroup,
            fkSubgroup : req.body.fkSubgroup,
            fkCollection : req.body.fkCollection
        } 
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const product = knl.sequelize().models.Product.build({
        description : req.body.description,
        price : req.body.price,
        fkGroup : req.body.fkGroup,
        fkSubgroup : req.body.fkSubgroup,
        fkCollection : req.body.fkCollection,
        status   : 1
    });
    await product.save();
    resp.end();
});

knl.get('product', async (req, resp)=>{
    let result = await knl.sequelize().models.Product.findAll({
        where: {
            status : 1
        }
    });
    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(let product of result){
            const group = await knl.sequelize().models.Group.findAll({
                where : {
                    id : product.fkGroup
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                product.group_description = group[0].description
            }

            console.log(product.group_description)
        }
    }
    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(let product of result){
            const subgroup = await knl.sequelize().models.Subgroup.findAll({
                where : {
                    id : product.fkSubgroup
                }
            })

            if (!knl.objects.isEmptyArray(subgroup)){
                product.subgroup_nameProduct = subgroup[0].nameProduct
            }

            console.log(product.subgroup_nameProduct)
        }
    }
    result = knl.objects.copy(result);

    if (!knl.objects.isEmptyArray(result)){
        for(let product of result){
            const collection = await knl.sequelize().models.Collection.findAll({
                where : {
                    id : product.fkCollection
                }
            })

            if (!knl.objects.isEmptyArray(collection)){
                product.collection_description = collection[0].description
            }

            console.log(product.collection_description)
        }
    }
    resp.json(result);
    resp.end();
})


knl.put('product/', async(req, resp) => {  
    const result = await knl.sequelize().models.Product.put({
        description : req.body.description,
        price : req.body.price 
    },
    {
        where : {
            id: req.body.id
        }
    });
    resp.send(result);
    console.log(result);
    resp.end();
})

knl.delete('product/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Product.destroy({
        where : {
            id: req.params.id
        }
    });
    resp.json(result);
    console.log(result);
    resp.end();
})

knl.patch('product/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Product.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });
    resp.json(result)
    resp.end();
})