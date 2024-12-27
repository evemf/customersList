<template>
    <div class="customers-table">
      <h1 class="customers-table__title">Llistat de Clients</h1>
      <vue-good-table
        :columns="columns"
        :rows="customers"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
      >
        <template #table-row="{ column, row }">
          <template v-if="column.field === 'name'">
            <router-link :to="'/customer/' + row.id" class="customers-table__link">
              {{ row.name }}
            </router-link>
          </template>
          <template v-else-if="column.field === 'products'">
            <ul>
              <li v-for="productId in row.products" :key="productId">
                <router-link :to="'/product/' + productId" class="customers-table__link">
                  {{ getProductById(productId) }}
                </router-link>
              </li>
            </ul>
          </template>
          <template v-else>
            {{ row[column.field] }}
          </template>
        </template>
      </vue-good-table>
    </div>
  </template>
  
  <script>
  import { VueGoodTable } from "vue-good-table-next";
  import "vue-good-table-next/dist/vue-good-table-next.css";
  
  export default {
    name: "CustomersList",
    components: { VueGoodTable },
    data() {
      return {
        customers: [],
        products: [],
        columns: [
          { label: "Nom", field: "name", sortable: true },
          { label: "Email", field: "email", sortable: true },
          { label: "Telèfon", field: "tel", sortable: true },
          { label: "Productes", field: "products" },
        ],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        fetch("http://localhost:5000/customers")
          .then((response) => response.json())
          .then((data) => {
            this.customers = data;
          })
          .catch((error) => console.error("Error fetching customers:", error));
        fetch("http://localhost:5000/products")
          .then((response) => response.json())
          .then((data) => {
            this.products = data;
          })
          .catch((error) => console.error("Error fetching products:", error));
      },
      getProductById(productId) {
        const product = this.products.find((prod) => prod.id === productId);
        return product ? product.name : "Unknown Product";
      },
    },
  };
  </script>
  
  <style scoped>
  .customers-table {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .customers-table__title {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .customers-table__link {
    color: #007bff;
    text-decoration: none;
  }
  
  .customers-table__link:hover {
    text-decoration: underline;
  }
  
  .vue-good-table {
    font-size: 16px;
    color: #333;
  }
  </style>
  