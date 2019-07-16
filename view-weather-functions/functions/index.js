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
    .set(
      Object.assign({}, req.body, { modified: new Date().getTime() }),
      error => {
        if (error) {
          res.status(500);
          res.send("Failed to store in firebase");
        } else {
          res.send({
            success: true
          });
        }
      }
    );
});

expressApp.get("/getMyCityList", isAuthorized, (req, res) => {
  firebaseApp
    .database()
    .ref(`myCityList/${req.user.uid}`)
    .orderByChild("modified")
    .once("value", snapshot => {
      const cities = [];
      snapshot.forEach(child => {
        cities.unshift(child.val());
      });
      res.send(cities || []);
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
          Authorization: "Firebase auth token"
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
          Authorization: "Firebase auth token"
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
    .once(
      "value",
      snapshot => {
        const cities = [];
        snapshot.forEach(child => {
          cities.push(child.val());
        });
        res.set("Access-Control-Allow-Origin", "*");
        res.send(cities);
      },
      error => {
        if (error) {
          res.set("Access-Control-Allow-Origin", "*");
          res.send([]);
        }
      }
    );
});

exports.widgets = functions.https.onRequest(expressApp);
