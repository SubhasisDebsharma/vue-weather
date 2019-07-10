const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const expressApp = express();
const serviceAccount = require("./viewweather-a2bc9-firebase-adminsdk-um2qb-acadb128d0.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://viewweather-a2bc9.firebaseio.com"
});

expressApp.use(cors({ origin: true }));

const isAuthorized = function(req, res, next) {
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(decodedIdToken => {
      if (decodedIdToken) {
        req.user = decodedIdToken;
        return next();
      }
      res.status(401);
      return res.send("Invalid user");
    })
    .catch(error => {
      res.status(401);
      res.send("Invalid user");
    });
};

expressApp.post("/addCityToMyList", isAuthorized, (req, res) => {
  firebaseApp
    .database()
    .ref(`myCityList/${req.user.uid}/${req.body.id}`)
    .set(req.body, error => {
      if (error) {
        res.status(500);
        res.send("Failed to store in firebase");
      } else {
        res.send({
          success: true
        });
      }
    });
});

expressApp.get("/getMyCityList", isAuthorized, (req, res) => {
  firebaseApp
    .database()
    .ref(`myCityList/${req.user.uid}`)
    .once("value", data => {
      res.send(data || []);
    });
});

expressApp.delete("/removeCityFromList", isAuthorized, (req, res) => {
  firebaseApp
    .database()
    .ref(`myCityList/${req.user.uid}/${req.body.id}`)
    .remove(error => {
      if (error) {
        res.status(500);
        res.send("Failed to remove city");
      } else {
        res.send({
          success: true
        });
      }
    });
});

expressApp.get("/", (req, res) => {
  res.send({
    message: "Hello World",
    apis: [
      {
        url: "/getMyCityList",
        method: "GET",
        headers: {
          Authorization: "Firebase auto token"
        }
      },
      {
        url: "/addCityToMyList",
        method: "POST",
        headers: {
          Authorization: "Firebase auto token"
        }
      },
      {
        url: "/removeCityFromList",
        method: "DELETE",
        headers: {
          Authorization: "Firebase auto token"
        },
        body: {
          id: "city id"
        }
      }
    ]
  });
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
    .limitToFirst(50)
    .once("value", data => {
      res.send(data);
    });
});

exports.widgets = functions.https.onRequest(expressApp);

// const cityList = [
//   {
//     coord: { lat: 13.13333, lon: 78.133331 },
//     country: "IN",
//     id: 1266305,
//     name: "Kolar"
//   },
//   {
//     coord: { lat: 49.80743, lon: 21.434071 },
//     country: "PL",
//     id: 768827,
//     name: "Kolaczyce"
//   },
//   {
//     coord: { lat: 15.2, lon: 76.866669 },
//     country: "IN",
//     id: 1266320,
//     name: "Kolagallu"
//   }
// ];

// const citySearchResult = {
//   "19099": {
//     coord: { lat: 68.880623, lon: 33.018421 },
//     country: "RU",
//     id: 546554,
//     name: "Kola"
//   },
//   "22532": {
//     coord: { lat: 55.328335, lon: 37.738888 },
//     country: "RU",
//     id: 6416531,
//     name: "Kolachëvo"
//   },
//   "39016": {
//     coord: { lat: -24.9, lon: 152.083328 },
//     country: "AU",
//     id: 2161177,
//     name: "Kolan"
//   },
//   "43763": {
//     coord: { lat: 13.13333, lon: 78.133331 },
//     country: "IN",
//     id: 1266305,
//     name: "Kolar"
//   },
//   "97486": {
//     coord: { lat: 49.80743, lon: 21.434071 },
//     country: "PL",
//     id: 768827,
//     name: "Kolaczyce"
//   },
//   "106036": {
//     coord: { lat: 15.2, lon: 76.866669 },
//     country: "IN",
//     id: 1266320,
//     name: "Kolagallu"
//   },
//   "112040": {
//     coord: { lat: 25.23333, lon: 77.599998 },
//     country: "IN",
//     id: 1266302,
//     name: "Kolaras"
//   },
//   "184843": {
//     coord: { lat: 5.07028, lon: 119.896942 },
//     country: "PH",
//     id: 1708553,
//     name: "Kolape"
//   },
//   "184844": {
//     coord: { lat: 8.1144, lon: 123.897102 },
//     country: "PH",
//     id: 1708557,
//     name: "Kolambugan"
//   },
//   "188209": {
//     coord: { lat: 52.217388, lon: 17.62413 },
//     country: "PL",
//     id: 3090207,
//     name: "Kolaczkowo"
//   }
// };

// exports.getMyCityList = functions.https.onRequest((req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.send(cityList);
// });

// exports.dummySearchCities = functions.https.onRequest((req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.send(citySearchResult);
// });

// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello World: Testing View Weather");
// });
