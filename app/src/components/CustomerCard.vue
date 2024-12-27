<template>
    <div class="max-w-4xl mx-auto p-6 bg-gray-50">
        <BackButton class="mb-4" />
      <h2 class="text-3xl font-semibold text-center mb-6">
        Fitxa de client de {{ customer?.name }}
      </h2>
  
      <div v-if="customer" class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center mb-6">
          <img
            :src="customer.profileImage"
            alt="Foto de perfil"
            class="w-32 h-32 rounded-full object-cover mr-6"
          />
          <div>
            <h3 class="text-2xl font-semibold text-gray-800">{{ customer.name }}</h3>
            <p class="text-gray-600">{{ customer.email }}</p>
            <p class="text-gray-600">{{ customer.tel }}</p>
          </div>
        </div>
  
        <div class="mt-6">
          <h4 class="text-xl font-semibold text-gray-800">Productes:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li v-for="productId in customer.products" :key="productId" class="text-gray-700">
              <router-link :to="'/product/' + productId" class="text-blue-600 hover:text-blue-800">
                {{ getProductById(productId) }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BackButton from './BackButton.vue';
  export default {
    props: ['id'],
    components: { BackButton },
    data() {
      return {
        customerId: this.id,
        customer: null,
        products: []
      };
    },
    mounted() {
      this.fetchCustomerDetails();
      this.fetchProducts();
    },
    methods: {
      fetchCustomerDetails() {
        fetch(`http://localhost:5000/customers/${this.customerId}`)
          .then((response) => response.json())
          .then((data) => {
            this.customer = data;
          })
          .catch((error) => console.error('Error fetching customer details:', error));
      },
      fetchProducts() {
        fetch('http://localhost:5000/products')
          .then((response) => response.json())
          .then((data) => {
            this.products = data;
          })
          .catch((error) => console.error('Error fetching products:', error));
      },
      getProductById(productId) {
        const product = this.products.find((prod) => prod.id === productId);
        return product ? product.name : 'Producte desconegut';
      }
    }
  };
  </script>
  
  <style scoped>
  .max-w-4xl {
    max-width: 80%;
    margin: 0 auto;
  }
  </style>
  