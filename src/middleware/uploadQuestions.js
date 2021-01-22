const Multer = require("multer");

const uploadQuestions = Multer
({
    storage: Multer.memoryStorage
    ({

        destination: "uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    }),

    fileFilter: (req, file, callback) => {

        let allowedTypes = ["image/png", "image/jpg"];

        if (allowedTypes.includes(file.mimetype)) 
        {
            callback(null, true);
        }
        else 
        {
            callback(new Error("Tipo do arquivo inválido"));
        }
    },

    limits:
    {
        fileSize: 1024 * 1024 * 2, // MAXIMO DE 2Mb
    },

});

module.exports = uploadQuestions.single("image");