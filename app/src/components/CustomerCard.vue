<template>
    <div class="customer-card">
      <h1 class="customer-card__title">Fitxa del client</h1>
      <div v-if="customer">
        <p class="customer-card__label"><strong>Nom:</strong> {{ customer.name }}</p>
        <p class="customer-card__label"><strong>Email:</strong> {{ customer.email }}</p>
        <p class="customer-card__label"><strong>Telèfon:</strong> {{ customer.tel }}</p>
        <h2 class="customer-card__subtitle">Productes contractats</h2>
        <ul class="customer-card__products-list">
          <li v-for="product in products" :key="product.id" class="customer-card__product-item">
            {{ product.name }}: {{ product.descr }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="customer-card__loading">Carregant...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomerCard",
    data() {
      return {
        customer: null,
        products: []
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
            const productsIds = customer.products;
            const promises = productsIds.map(id =>
              fetch(`http://localhost:5000/products/${id}`).then(res => res.json())
            );
            Promise.all(promises)
              .then(products => {
                this.products = products;
              })
              .catch(error => console.error("Error fetching products:", error));
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .customer-card {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .customer-card__title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .customer-card__label {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .customer-card__subtitle {
    font-size: 20px;
    margin-top: 20px;
  }
  
  .customer-card__products-list {
    list-style-type: none;
    padding-left: 0;
  }
  
  .customer-card__product-item {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .customer-card__loading {
    font-size: 16px;
    color: grey;
  }
  </style>
  