import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import BaseButton from "./components/UI/BaseButton.vue";
import Maska from "maska";
loadFonts();

const useImage = (url) => {
  return new URL(`/src/assets/${url}`, import.meta.url).href;
};

const app = createApp(App);
app.component("base-button", BaseButton);
app.use(vuetify);
app.use(Maska);
app.config.globalProperties.$image = useImage;
app.mount("#app");

