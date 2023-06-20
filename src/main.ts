import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const app = createApp(App);
app.use(createPinia())
app.use(createVuetify());
app.mount('#app');
