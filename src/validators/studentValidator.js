const { celebrate, Segments, Joi } = require('celebrate');

module.exports =
{
    create: celebrate
        ({
            [Segments.BODY]: Joi.object().keys
                ({
                    ra: Joi.string()
                        .length(7)
                        .required()
                        .min(7)
                        .max(255),

                    name: Joi.string()
                        .required()
                        .min(3)
                        .max(255),

                    email: Joi.string()
                        .required()
                        .min(8)
                        .max(255)
                        .email(),

                    password: Joi.string()
                        .required()
                        .min(6)
                        .max(255),

                }),
        }),
};