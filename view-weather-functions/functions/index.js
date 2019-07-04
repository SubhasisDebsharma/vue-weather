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

exports.dummySearchCities = functions.https.onRequest((req, res) => {
  const result = {
    "19099": {
      coord: { lat: 68.880623, lon: 33.018421 },
      country: "RU",
      id: 546554,
      name: "Kola"
    },
    "22532": {
      coord: { lat: 55.328335, lon: 37.738888 },
      country: "RU",
      id: 6416531,
      name: "Kolachëvo"
    },
    "39016": {
      coord: { lat: -24.9, lon: 152.083328 },
      country: "AU",
      id: 2161177,
      name: "Kolan"
    },
    "43763": {
      coord: { lat: 13.13333, lon: 78.133331 },
      country: "IN",
      id: 1266305,
      name: "Kolar"
    },
    "97486": {
      coord: { lat: 49.80743, lon: 21.434071 },
      country: "PL",
      id: 768827,
      name: "Kolaczyce"
    },
    "106036": {
      coord: { lat: 15.2, lon: 76.866669 },
      country: "IN",
      id: 1266320,
      name: "Kolagallu"
    },
    "112040": {
      coord: { lat: 25.23333, lon: 77.599998 },
      country: "IN",
      id: 1266302,
      name: "Kolaras"
    },
    "184843": {
      coord: { lat: 5.07028, lon: 119.896942 },
      country: "PH",
      id: 1708553,
      name: "Kolape"
    },
    "184844": {
      coord: { lat: 8.1144, lon: 123.897102 },
      country: "PH",
      id: 1708557,
      name: "Kolambugan"
    },
    "188209": {
      coord: { lat: 52.217388, lon: 17.62413 },
      country: "PL",
      id: 3090207,
      name: "Kolaczkowo"
    }
  };
  res.set("Access-Control-Allow-Origin", "*");
  res.send(result);
});
