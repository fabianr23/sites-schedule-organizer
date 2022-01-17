import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import FontAwesomeIcon from "@/helpers/fontAwesomeIcon";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
