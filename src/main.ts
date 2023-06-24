import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { mdi } from 'vuetify/iconsets/mdi-svg'

const app = createApp(App);
app.use(createPinia())
app.use(createVuetify({
  icons: {
    defaultSet: "mdi",
    sets: { mdi },
  }
}));
app.mount('#app');
