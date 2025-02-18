require('dotenv').config(); // make sure you have '.env' file in pwd
const fs = require('fs');

fs.writeFileSync(
  './public/swenv.js',
  `
const process = {
  env: {
    FB_API_KEY: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
    FB_AUTHDOMAIN: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
    FB_PROJECTID: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
    FB_STORAGEBUCKET: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
    FB_MESSAGINGSENDERID: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
    FB_APPID: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
    FB_MEASUREMENTID: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}',
  }
}
`,
);
