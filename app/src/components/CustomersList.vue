<template>
    <div class="customers-list">
      <h1 class="customers-list__title">Llistat de clients</h1>
      <ul class="customers-list__list">
        <li v-for="customer in customers" :key="customer.id" class="customers-list__item">
          <router-link :to="'/customer/' + customer.id" class="customers-list__link">
            {{ customer.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomersList",
    data() {
      return {
        customers: []
      };
    },
    mounted() {
      this.fetchCustomers();
    },
    methods: {
      fetchCustomers() {
        fetch("http://localhost:5000/customers")
          .then(response => response.json())
          .then(data => {
            this.customers = data;
          })
          .catch(error => console.error("Error fetching customers:", error));
      }
    }
  };
  </script>
  
  <style scoped>
  .customers-list {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .customers-list__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .customers-list__list {
    list-style-type: none;
    padding: 0;
  }
  
  .customers-list__item {
    margin: 10px 0;
  }
  
  .customers-list__link {
    font-size: 18px;
    text-decoration: none;
    color: #333;
  }
  
  .customers-list__link:hover {
    color: #007bff;
  }
  </style>
  