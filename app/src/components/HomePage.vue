<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Sistema de Clients</h1>
    <CustomersList />
  </div>
</template>

<script>
import CustomersList from './CustomersList.vue';

export default {
  name: "HomePage",
  components: {
    CustomersList
  }
};
</script>
