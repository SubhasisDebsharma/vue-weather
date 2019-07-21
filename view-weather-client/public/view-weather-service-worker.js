/* eslint-disable */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
if (self.IndexedDB) {
  console.log("IndexedDB is supported");
}
workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({
  prefix: "view-weather",
  suffix: "v1"
});

workbox.routing.registerRoute(
  /\/home$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "landing-page"
  })
);

workbox.routing.registerRoute(
  /.*\.(?:js|css|html)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources"
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*fonts.*/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "fonts"
  })
);

workbox.routing.registerRoute(
  /.*api\.openweathermap\.org\/data.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: "weather-api-data",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*addCityToMyList.*/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin("add-to-city-list", {
        maxRetentionTime: 60 * 24
      })
    ]
  }),
  "POST"
);

workbox.routing.registerRoute(
  /.*removeCityFromList.*/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin("delete-from-city-list", {
        maxRetentionTime: 60 * 24
      })
    ]
  }),
  "DELETE"
);

// workbox.routing.registerRoute(
//   /.*searchCities.*/,
//   new workbox.strategies.CacheFirst({
//     cacheName: "searched-cities",
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200]
//       })
//     ]
//   })
// );

const idbConf = {
  dbName: "view-weather",
  version: 1
};

async function createOrGetDbStore(storeName) {
  return new Promise((resolve, reject) => {
    const request = self.indexedDB.open(idbConf.dbName, idbConf.version);
    request.onerror = function(event) {
      console.log("[onerror]", request.error);
      reject(request.error);
    };
    request.onsuccess = function(event) {
      console.log("[onsuccess]", request.result);
      const db = event.target.result; // === request.result
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      resolve(store);
      transaction.oncomplete = () => {
        db.close();
      };
    };
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const store = db.createObjectStore(storeName, { keyPath: "keyPath" });
      resolve(store);
    };
  });
}

async function getDataFromStore(storeName, key) {
  const store = await createOrGetDbStore(storeName);
  return new Promise((resolve, reject) => {
    const getRequest = store.get(key);
    getRequest.onsuccess = () => {
      resolve(getRequest.result && getRequest.result.data);
    };
    getRequest.onerror = err => {
      reject(err);
    };
  });
}

async function putDataIntoStore(storeName, key, data) {
  const store = await createOrGetDbStore(storeName);
  store.put({
    keyPath: key,
    data: data
  });
}

searchCityHandler = async ({ url, event }) => {
  console.log(url, event);
  const storeName = "searched-cities";

  try {
    await createOrGetDbStore(storeName);
    const searchKey = url.href;
    const data = await getDataFromStore(storeName, searchKey);
    if (!data) {
      throw Error;
    }
    const reponseOptions = {
      status: 200,
      headers: {
        "content-type": "aplication/json"
      }
    };
    return new Response(JSON.stringify(data), reponseOptions);
    // return Promise.resolve(data);
  } catch (err) {
    return fetch(event.request).then(response => {
      console.log("response> ", response);
      if (response.status === 200) {
        response
          .clone()
          .json()
          .then(data => {
            putDataIntoStore(storeName, response.url, data);
          });
      }
      return response;
    });
  }
};

workbox.routing.registerRoute(/.*searchCities.*/, searchCityHandler);
