import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

//theme and icons
import "primevue/resources/themes/soho-light/theme.css";
// import "primevue/resources/themes/mdc-light-indigo/theme.css";
// import "primevue/resources/themes/md-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

//components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import ToggleButton from "primevue/togglebutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Paginator from "primevue/paginator";
import Tooltip from "primevue/tooltip";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import ToastService from "primevue/toastservice";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Toolbar from "primevue/toolbar";
import Card from "primevue/card";
import FocusTrap from "primevue/focustrap";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");

//components
app.component("Button", Button);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("DataTable", DataTable);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("ToastService", ToastService);
app.component("Checkbox", Checkbox);
app.component("InputSwitch", InputSwitch);
app.component("Dropdown", Dropdown);
app.component("InputNumber", InputNumber);
app.component("Paginator", Paginator);
app.component("Row", Row);
app.component("MultiSelect", MultiSelect);
app.component("ToggleButton", ToggleButton);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Toolbar", Toolbar);
app.component("Card", Card);

//directives
app.directive("tooltip", Tooltip);
app.directive("focustrap", FocusTrap);
