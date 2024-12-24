<template>
  <div class="home">
    <h1 class="home__title">Benvinguts al sistema de clients</h1>
    <router-link to="/customers" class="home__link">Anar al llistat de clients</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage"
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
