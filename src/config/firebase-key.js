module.exports = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID ,
  private_key_id: "e7f4aaafb5e837858db2659bee71636bc19903f8",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "105527405999041276220",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v248y%40senaioverflow-df1dc.iam.gserviceaccount.com"
}
