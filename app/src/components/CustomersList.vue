<template>
    <div class="customers-table p-6 bg-gray-50">
      <el-input
        v-model="search"
        placeholder="Buscar"
        clearable
        class="mb-4"
      />
      
      <el-table
        :data="pagedCustomers"
        border
        stripe
        style="width: 100%"
        @row-click="goToCustomerPage"
        empty-text="No s'han trobat resultats"
      >
        <el-table-column label="Nom" prop="name" sortable></el-table-column>
        <el-table-column label="Email" prop="email" sortable></el-table-column>
        <el-table-column label="Telèfon" prop="tel" sortable></el-table-column>
        <el-table-column label="Productes">
          <template #default="{ row }">
            <ul>
              <li v-for="productId in row.products" :key="productId">
                {{ getProductById(productId) }}
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
  
      <el-pagination
        v-if="filteredCustomers.length > 0"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredCustomers.length"
        layout="total, prev, pager, next"
        @current-change="handlePageChange"
        class="mt-4 text-right"
      />
    </div>
  </template>
  
  <script>
  import { ElTable, ElTableColumn, ElInput, ElPagination } from "element-plus";
  
  export default {
    name: "CustomersList",
    components: {
      ElTable,
      ElTableColumn,
      ElInput,
      ElPagination,
    },
    data() {
      return {
        customers: [],
        products: [],
        search: "",
        currentPage: 1,
        pageSize: 3,
      };
    },
    computed: {
      filteredCustomers() {
        return this.customers.filter((customer) =>
          Object.values(customer).join(" ").toLowerCase().includes(this.search.toLowerCase())
        );
      },
      pagedCustomers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredCustomers.slice(startIndex, endIndex);
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        fetch(`${process.env.VUE_APP_BASE_URL}/customers`)
          .then((response) => response.json())
          .then((data) => {
            this.customers = data;
          })
          .catch((error) => console.error("Error fetching customers:", error));
  
        fetch(`${process.env.VUE_APP_BASE_URL}/products`)
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
      goToCustomerPage(row) {
        const customerId = row.id;
        if (customerId) {
          this.$router.push(`/customer/${customerId}`);
        }
      },
      handlePageChange(page) {
        this.currentPage = page;
      },
    },
  };
  </script>
  
  <style scoped>
  .customers-table {
    max-width: 100%;
    margin: 0 auto;
  }
  </style>
  