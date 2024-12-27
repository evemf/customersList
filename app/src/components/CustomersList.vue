<template>
    <div class="customers-table">
      <vue-good-table
        :columns="columns"
        :rows="customers"
        :search-options="{ enabled: true, placeholder: 'Buscar' }"
        :pagination-options="paginationOptions"
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
  
        <template #emptystate>
          <p>No s'han trobat resultats</p>
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
        paginationOptions: {
          enabled: true,
          mode: 'records',
          perPage: 5,
          position: 'bottom',
          perPageDropdown: [1, 2, 5, 10, 50],
          dropdownAllowAll: false,
          setCurrentPage: 2,
          nextLabel: 'Següent',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Clients per pàgina',
          ofLabel: 'de',
          pageLabel: 'pàgina',
          allLabel: 'Tots'
        },
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
        return product ? product.name : "Producte desconegut";
      },
    },
  };
  </script>
  
  <style scoped>
  .customers-table {
    font-family: Arial, sans-serif;
    margin: 20px;
    overflow-x: auto;
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
  
  @media (max-width: 768px) {
    .vue-good-table .vgt-table {
      display: block;
      width: 100%;
      overflow-x: auto;
    }
  
    .vue-good-table .vgt-th, .vue-good-table .vgt-td {
      display: block;
      text-align: right;
      padding: 5px;
      border: 1px solid #ddd;
      white-space: nowrap;
      overflow: hidden;
    }
  
    .vue-good-table .vgt-table tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
  
    .vue-good-table .vgt-table td::before {
      content: attr(data-label);
      font-weight: bold;
      display: block;
      text-align: left;
      margin-bottom: 5px;
    }
  }
  </style>
  