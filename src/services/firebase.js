var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const BUCKET = "senaioverflow-df1dc.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  storageBucket: BUCKET,

});

const bucket = admin.storage().bucket();


    const uploadImage = (req, res, next) => {
        if(!req.file)
        return next();
        
    const image = req.file
    const filename = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(filename);

    const stream = file.createWriteStream
    ({
        metadata:
        {
            contentType: image.mimetype,
        }
    });
    
    stream.on("error", (e) =>
    {
        console.log(e);
        
    });

    stream.on("finish", async () =>
    {
        // TORNA O ARQUIVO PUBLICO
        await file.makePublic()

        // OBETER A URL PUBLICA
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`

        next();
    });

    stream.end(image.buffer);
    };

module.exports = uploadImage;