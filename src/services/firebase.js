var admin = require("firebase-admin");

const BUCKET = "senaioverflow-df1dc.appspot.com";

function isFirebaseSkipped() {
  const v = process.env.SKIP_FIREBASE;
  return v === "true" || v === "1";
}

function getBucket() {
  var serviceAccount = require("../config/firebase-key");
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: BUCKET,
    });
  }
  return admin.storage().bucket();
}

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  if (isFirebaseSkipped()) {
    req.file.firebaseUrl = null;
    return next();
  }

  const bucket = getBucket();
  const image = req.file;
  const filename = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(filename);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.error(error);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`;
    next();
  });

  stream.end(image.buffer);
};

module.exports = uploadImage;
