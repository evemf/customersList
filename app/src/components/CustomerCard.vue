<template>
    <div class="customer-card">
      <button @click="goBack" class="customer-card__back-btn">
        ← Back
      </button>
      <h1 class="customer-card__title">Customer Profile</h1>
      <div v-if="customer">
        <p><strong>Name:</strong> {{ customer.name }}</p>
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Phone:</strong> {{ customer.tel }}</p>
        <h2>Products</h2>
        <ul>
          <li v-for="productId in customer.products" :key="productId">
            <router-link :to="'/product/' + productId" class="customer-card__link">
              {{ getProductById(productId) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomerCard",
    data() {
      return {
        customer: null,
        products: [],
      };
    },
    mounted() {
      const customerId = this.$route.params.id;
      this.fetchCustomer(customerId);
      this.fetchProducts(customerId);
    },
    methods: {
      fetchCustomer(customerId) {
        fetch(`http://localhost:5000/customers/${customerId}`)
          .then(response => response.json())
          .then(data => {
            this.customer = data;
          })
          .catch(error => console.error("Error fetching customer:", error));
      },
      fetchProducts(customerId) {
        fetch(`http://localhost:5000/customers/${customerId}`)
          .then(response => response.json())
          .then(customer => {
            const productIds = customer.products;
            this.products = productIds;
          })
          .catch(error => console.error("Error fetching products:", error));
      },
      getProductById(productId) {
        const product = this.products.find(prod => prod.id === productId);
        return product ? product.name : "Unknown Product";
      },
      goBack() {
        this.$router.go(-1); // Navega a la página anterior en el historial
      }
    },
  };
  </script>
  
  <style scoped>
  .customer-card {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .customer-card__back-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #007bff;
    cursor: pointer;
  }
  
  .customer-card__back-btn:hover {
    text-decoration: underline;
  }
  
  .customer-card__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .customer-card__link {
    color: #007bff;
    text-decoration: none;
  }
  
  .customer-card__link:hover {
    text-decoration: underline;
  }
  </style>
  