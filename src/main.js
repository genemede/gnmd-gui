//import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()

import router from './router/router.js'
import genemedeAPI from '@/services/gnmd-api.js';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
import GButton from './UI/GButton.vue'
import RelField from './UI/RelField.vue'
import RelFieldEx from './UI/RelFieldEx.vue'
import InputField from './UI/InputField.vue'
import TextField from './UI/TextField.vue'
import SelectField from './UI/SelectField.vue'
import DateField from './UI/DateField.vue'
import DateFieldEx from './UI/DateFieldEx.vue'

import GToggle from './UI/GToggle.vue'
import GSwitch from './UI/GSwitch.vue'
import HelpBox from './UI/HelpBox.vue'

import ConfirmDialog from '@/components/dlg/ConfirmDialog.vue'
import InformDialog from '@/components/dlg/InformDialog.vue'

import DataGrid from '@/components/DataGrid.vue'
import GForm from '@/components/GForm.vue'
import GModule from '@/components/GModule.vue'
import DevPanel from '@/components/DevPanel.vue'

import helpers from './services/helpers';
import storage from './services/storage';
import dialogs from './services/dialogs';
import GlobalMTypes from './services/mtypes';

import { useGlobalStore } from '@/stores/globalstore'

app.component('GButton', GButton);
app.component('InputField', InputField);
app.component('RelField', RelField);
app.component('RelFieldEx', RelFieldEx);
app.component('TextField', TextField);
app.component('SelectField', SelectField);
app.component('DateField', DateField);
app.component('DateFieldEx', DateFieldEx);
app.component('GToggle', GToggle);
app.component('GSwitch', GSwitch);
app.component('HelpBox', HelpBox);

// dialogs
app.component('ConfirmDialog', ConfirmDialog);
app.component('InformDialog', InformDialog);

// misc
app.component('DataGrid', DataGrid);
app.component('GForm', GForm);
app.component('GModule', GModule);
app.component('DevPanel', DevPanel);

app.use(pinia);
app.use(router);
app.use(Notifications);

app.config.globalProperties.$base_url = import.meta.env.BASE_URL
app.config.globalProperties.$store = useGlobalStore();
app.config.globalProperties.$store.$app = app;
app.config.globalProperties.$helpers = helpers;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$mtypes = GlobalMTypes;
app.config.globalProperties.$dlg = dialogs;
app.config.globalProperties.$router = router;
app.config.globalProperties.$api = genemedeAPI;

app.mount('#app');

window.router = router