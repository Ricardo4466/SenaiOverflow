const { celebrate, Segments, Joi } = require('celebrate');

module.exports =
{
    create: celebrate
        ({
            [Segments.BODY]: Joi.object().keys
                ({

                    answer: Joi.string()
                        .required()
                        .min(2)
                        .max(255),
                }),
            [Segments.PARAMS]: Joi.object().keys
                ({
                    id: Joi.number()
                        .required()
                })
        }),
};