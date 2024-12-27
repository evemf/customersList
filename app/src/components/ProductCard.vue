<template>
    <div class="p-6 max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-lg">
        <BackButton />
      <div v-if="product" class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Fitxa de {{ product.name }}</h1>
        <div class="space-y-4">
          <div class="space-y-2">
            <p class="text-lg font-semibold text-gray-700"><strong>Nom:</strong> {{ product.name }}</p>
            <p class="text-lg font-semibold text-gray-700"><strong>Descripció:</strong> {{ product.descr }}</p>
          </div>
        </div>
      </div>
      <div v-else>
          <p>Carregant...</p>
        </div>
    </div>
  </template>
  
  <script>
  import BackButton from './BackButton.vue';

  export default {
    name: "ProductCard",
    components: { BackButton },
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
        fetch(`${process.env.VUE_APP_BASE_URL}/products/${productId}`)
          .then(response => response.json())
          .then(data => {
            this.product = data;
          })
          .catch(error => console.error("Error trobant producte:", error));
      },
      goBack() {
        this.$router.go(-1); 
      }
    },
  };
  </script>
  