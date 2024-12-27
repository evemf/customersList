import { createRouter, createWebHistory } from 'vue-router'; 
import HomePage from '@/components/HomePage.vue';
import CustomersList from '@/components/CustomersList.vue';
import CustomerCard from '@/components/CustomerCard.vue';
import ProductCard from '@/components/ProductCard.vue';

// Routes config
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomersList
  },
  {
    path: '/customer/:id',
    name: 'customer-card',
    component: CustomerCard,
    props: true
  },
  {
    path: '/product/:id',
    name: 'product-card',
    component: ProductCard,
    props: true
  }
];

// Use router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
