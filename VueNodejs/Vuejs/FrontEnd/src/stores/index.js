import { createStore } from "vuex";
import { auth } from "/src/stores/auth.module.js";

// Tạo store với Vuex 4
const store = createStore({
  modules: {
    auth,
  },
});

export default store;
