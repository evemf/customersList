<template>
    <div class="product-card">
      <h1 class="product-card__title">Fitxa de producte</h1>
      <div v-if="product">
        <p class="product-card__label"><strong>Nom:</strong> {{ product.name }}</p>
        <p class="product-card__label"><strong>Descripció:</strong> {{ product.descr }}</p>
      </div>
      <div v-else>
        <p class="product-card__loading">Carregant...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductCard",
    data() {
      return {
        product: null
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
          .catch(error => console.error("Error fetching producto:", error));
      }
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .product-card__title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .product-card__label {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .product-card__loading {
    font-size: 16px;
    color: grey;
  }
  </style>  