const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./viewweather-a2bc9-firebase-adminsdk-um2qb-acadb128d0.json");

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://viewweather-a2bc9.firebaseio.com"
});
// const { Logging } = require("@google-cloud/logging");
// const logging = new Logging();
// const log = logging.log("view-weather-log");

// const METADATA = {
//   resource: {
//     type: "cloud_function",
//     labels: {
//       function_name: "populateSearchDB",
//       region: "us-central1"
//     }
//   }
// };
// exports.helloWorldl;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello World: Testing View Weather");
});

exports.setLowerString = functions.https.onRequest((req, res) => {
  // admin
  //   .database()
  //   .ref("cities")
  //   .limitToFirst(1)
  //   .on("value", (data, b) => {
  //     console.log("data", data, b);
  //     res.send(data);
  //   });
  res.send("not implementd");
});

exports.searchCities = functions.https.onRequest((req, res) => {
  const input = req.query && req.query.input;
  const properInput = input
    .split(" ")
    .map(str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
  admin
    .database()
    .ref("cities")
    .orderByChild("name")
    .startAt(properInput)
    .limitToFirst(10)
    .on("value", data => {
      res.send(data);
    });
});
