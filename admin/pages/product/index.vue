<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>

            <ProductFilter v-on:Filtering="handleFiltering"></ProductFilter>
          </div>
          <div class="col-md-12">
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Images</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th>Category</th>
                    <th>By</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody v-if="productList.data && productList.data.length > 0">
                  <ProductRow
                    v-for="product of productList.data"
                    v-bind:product="product"
                    v-bind:key="product.id"
                    v-on:removeProduct="removeProduct"
                  ></ProductRow>
                  <tr v-if="productList.data && productList.data.length === 0">
                    <td colspan="8" class="text-center">No results found</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="productList"
              v-if="productList.data"
              v-on:handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import ProductFilter from "../../components/product-components/ProductFilter";
import Loader from "../../components/helpers/loader";
import StatusMessages from "../../components/helpers/statusMessages";
import ProductRow from "../../components/product-components/ProductRow";
import Pagination from "../../components/helpers/Pagination";
export default {
  name: "index",
  components: {
    Pagination,
    ProductRow,
    StatusMessages,
    Loader,
    ProductFilter,
  },
  fetch() {
    this.$store.dispatch("product/listProducts");
    this.$store.dispatch("category/getCategoryHtmlTree");
    this.$store.dispatch("brand/getAllBrands");
  },
  computed: {
    productList() {
      return this.$store.state.product.product_list;
    },
  },
  methods: {
    handleFiltering(field, value) {
      this.$store.commit("product/setFilterData", { key: field, val: value });
      this.$store.commit("product/setPage", 1);

      this.$store.dispatch("product/listProducts", this.getPayload());
    },
    removeProduct(id) {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("product/delete", id);
      }
    },
    handlePagination(page_number) {
      this.$store.commit("product/setPage", page_number);

      this.$store.dispatch("product/listProducts", this.getPayload());
    },
    getPayload() {
      let payload = { ...this.$store.state.product.filterData };

      Object.keys(payload).forEach(
        (key) => payload[key] === "" && delete payload[key]
      );

      payload.page = this.$store.state.product.page;

      return payload;
    },
  },
  mounted() {
    // re-initialize tabs
    setTimeout(() => {
      if ($(".options-dropdown").length) {
        $(".options-dropdown").tab();
      }
    }, 300);
  },
};
</script>
  
  <style scoped>
</style>