import axios from "axios";

export default function setup() {
  axios.interceptors.request.use(
    // eslint-disable-next-line no-unused-vars
    function(config) {
      //   const token = store.getters.token;
      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }
      //   return config;
    },
    function(err) {
      // run toaster from here
      console.log(err);
      return Promise.resolve(err);
    }
  );
}
