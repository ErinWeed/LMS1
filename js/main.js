import AppController from "./controller/app_controller.js";

(async function() {
  let app = new AppController();

})();

// every application we do is going to have a main.js. It's the launching point
// for our application. We've included it as a module. Webpack will magically do
// it for us.