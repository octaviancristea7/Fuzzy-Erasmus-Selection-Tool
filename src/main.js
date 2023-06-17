import "./assets/main.css";
import PrimeVue from "primevue/config";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//theme and icons
//import 'primevue/resources/themes/soho-light/theme.css'
import "primevue/resources/themes/mdc-light-indigo/theme.css";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

//components

//directives

import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");

//components
app.component("ToastService", ToastService);
