import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Import bộ icon MDI

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
