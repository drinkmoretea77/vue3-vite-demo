import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import BaseButton from "./components/UI/BaseButton.vue";
import Maska from "maska";
import store from './store/index.js';

const app = createApp(App);
app.component("base-button", BaseButton);
app.use(store);
app.use(vuetify);
app.use(Maska);
app.mount("#app");

