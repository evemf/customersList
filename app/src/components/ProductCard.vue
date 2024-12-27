<template>
    <div class="product-card">
      <button @click="goBack" class="product-card__back-btn">
        ← Enrere
      </button>
      <div class="product-card__content">
        <h1 class="product-card__title">Fitxa de Producte</h1>
        <div v-if="product" class="product-card__info">
          <div class="product-card__details">
            <p><strong>Nom:</strong> {{ product.name }}</p>
            <p><strong>Descripció:</strong> {{ product.descr }}</p>
          </div>
        </div>
        <div v-else>
          <p>Carregant...</p>
        </div>
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
    background-color: #f0f8ff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .product-card__back-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #007bff;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .product-card__back-btn:hover {
    text-decoration: underline;
  }
  
  .product-card__content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .product-card__title {
    font-size: 28px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .product-card__info {
    margin-bottom: 30px;
  }
  
  .product-card__details p {
    font-size: 18px;
    margin: 8px 0;
    color: #555;
  }
  </style>
  