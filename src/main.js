import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: '1055044087612-t8de5erpn931si5b8qi90bnhcu4v7lmh.apps.googleusercontent.com'
})

app.mount('#app')
