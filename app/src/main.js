import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

const customPagination = {
  el: {
    pagination: {
      goto: 'Anar a',
      page: 'pàgina',
      perPage: '/ pàgina',
      prev: 'Anterior',
      next: 'Següent',
      total: 'Total'
    },
  },
};

app.use(router)
   .use(ElementPlus, {
     locale: customPagination,
   })
   .mount('#app');
