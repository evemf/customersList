<template>
    <div class="customer-card">
      <button @click="goBack" class="customer-card__back-btn">
        ← Enrere
      </button>
      <div class="customer-card__content">
        <h1 class="customer-card__title">Perfil de Client</h1>
        <div v-if="customer" class="customer-card__info">
          <div class="customer-card__details">
            <p><strong>Nom:</strong> {{ customer.name }}</p>
            <p><strong>Email:</strong> {{ customer.email }}</p>
            <p><strong>Telèfon:</strong> {{ customer.tel }}</p>
          </div>
          <div class="customer-card__products">
            <h2 class="customer-card__subtitle">Productes Contractats</h2>
            <ul>
              <li v-for="productId in customer.products" :key="productId" class="customer-card__product-item">
                <router-link :to="'/product/' + productId" class="customer-card__link">
                  {{ getProductById(productId) }}
                </router-link>
              </li>
            </ul>
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
      this.fetchProducts();
    },
    methods: {
      fetchCustomer(customerId) {
        fetch(`http://localhost:5000/customers/${customerId}`)
          .then(response => response.json())
          .then(data => {
            this.customer = data;
          })
          .catch(error => console.error("Error llistant client:", error));
      },
      fetchProducts() {
        fetch("http://localhost:5000/products")
          .then(response => response.json())
          .then(data => {
            this.products = data;
          })
          .catch(error => console.error("Error llistant productes:", error));
      },
      getProductById(productId) {
        const product = this.products.find((prod) => prod.id === productId);
        return product ? product.name : "Producte deconegut";
      },
      goBack() {
        this.$router.go(-1); 
      }
    },
  };
  </script>
  
  <style scoped>
  .customer-card {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .customer-card__back-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #007bff;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .customer-card__back-btn:hover {
    text-decoration: underline;
  }
  
  .customer-card__content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .customer-card__title {
    font-size: 28px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .customer-card__subtitle {
    font-size: 20px;
    margin-top: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .customer-card__info {
    margin-bottom: 30px;
  }
  
  .customer-card__details p {
    font-size: 18px;
    margin: 8px 0;
    color: #555;
  }
  
  .customer-card__products ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .customer-card__product-item {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .customer-card__link {
    color: #007bff;
    text-decoration: none;
  }
  
  .customer-card__link:hover {
    text-decoration: underline;
  }
  
  .customer-card__link:active {
    color: #0056b3;
  }
  </style>
  