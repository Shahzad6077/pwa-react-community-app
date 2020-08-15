// THIS FILE IS USED TO REGISTER OVER SERVICE WORKER OF PUBLIC FOLDER SW.JS INTO CACHE

const swDev = () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`; // As here we get the path of sw.js file

  navigator.serviceWorker.register(swUrl).then(response => {
    // console.log("SW file is registered", response);
  });
};
export default swDev;
