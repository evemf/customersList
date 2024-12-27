<template>
  <div class="home">
    <h1 class="home__title">Sistema de clients</h1>
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

<style scoped>
.home {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.home__title {
  font-size: 32px;
  margin-bottom: 20px;
}

.home__link {
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
}

.home__link:hover {
  text-decoration: underline;
}
</style>
