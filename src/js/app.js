import Widget from "./Widget";

const root = document.querySelector(".root");
const url = "https://loading-server.onrender.com/news"

const widget = new Widget(root, url);

widget.init();

(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker register success");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
})();
