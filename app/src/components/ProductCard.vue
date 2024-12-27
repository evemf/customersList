<template>
    <div class="product-card">
      <button @click="goBack" class="product-card__back-btn">
        ← Back
      </button>
      <h1 class="product-card__title">Product Profile</h1>
      <div v-if="product">
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Description:</strong> {{ product.descr }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductCard",
    data() {
      return {
        product: null,
      };
    },
    mounted() {
      const productId = this.$route.params.id;
      this.fetchProduct(productId);
    },
    methods: {
      fetchProduct(productId) {
        fetch(`http://localhost:5000/products/${productId}`)
          .then(response => response.json())
          .then(data => {
            this.product = data;
          })
          .catch(error => console.error("Error fetching product:", error));
      },
      goBack() {
        this.$router.go(-1); // Navega a la página anterior en el historial
      }
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .product-card__back-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #007bff;
    cursor: pointer;
  }
  
  .product-card__back-btn:hover {
    text-decoration: underline;
  }
  
  .product-card__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  </style>
  