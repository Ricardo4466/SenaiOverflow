const { celebrate, Segments, Joi } = require('celebrate');

module.exports =
{
    create: celebrate
        ({
            [Segments.BODY]: Joi.object().keys
                ({

                    title: Joi.string()
                        .required()
                        .min(5)
                        .max(255),

                    description: Joi.string()
                        .required()
                        .min(5)
                        .max(255),

                    categories: Joi.array()
                        .required(),


                    gist: Joi.string()
                        .min(20)
                        .max(255),

                }),
        }),
};