//import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router.js'
const pinia = createPinia()
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
import GButton from './UI/GButton.vue'
import RelField from './UI/RelField.vue'
import InputField from './UI/InputField.vue'
import TextField from './UI/TextField.vue'
import GToggle from './UI/GToggle.vue'
import HelpBox from './UI/HelpBox.vue'

import ConfirmDialog from '@/components/dlg/ConfirmDialog.vue'
import InformDialog from '@/components/dlg/InformDialog.vue'

import helpers from './services/helpers';
import storage from './services/storage';
import dialogs from './services/dialogs';
import GlobalMTypes from './services/mtypes';

import { useGlobalStore } from '@/stores/globalstore'

app.component('GButton', GButton);
app.component('InputField', InputField);
app.component('RelField', RelField);
app.component('TextField', TextField);
app.component('GToggle', GToggle);
app.component('HelpBox', HelpBox);
// dialogs
app.component('ConfirmDialog', ConfirmDialog);
app.component('InformDialog', InformDialog);

app.use(pinia);
app.use(router);
app.use(Notifications);


app.config.globalProperties.$store = useGlobalStore();
app.config.globalProperties.$helpers = helpers;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$mtypes = GlobalMTypes;
app.config.globalProperties.$dlg = dialogs;

app.mount('#app');
