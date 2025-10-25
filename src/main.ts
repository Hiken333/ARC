import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import router from './router/router'

import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import './assets/css/main.css'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {
    Notify,
  },
})

app.mount('#app')
