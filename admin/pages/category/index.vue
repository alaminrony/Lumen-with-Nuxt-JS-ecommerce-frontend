<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>
            <CategoryFilter v-on:Filtering="handleFiltering"></CategoryFilter>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Parent</th>
                    <th>Featured</th>
                    <th>Created At</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <CategoryRow
                    v-if="categoryList.data"
                    v-for="category of categoryList.data"
                    :category="category"
                    :key="category.id"
                    @removeCategory="removeCategory"
                  ></CategoryRow>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="categoryList"
              v-if="categoryList.data"
              v-on:handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Loader from "../../components/helpers/loader";
import statusMessages from "../../components/helpers/statusMessages";
import CategoryRow from "../../components/category-components/Row";
import Pagination from "../../components/helpers/Pagination";
import CategoryFilter from "../../components/category-components/CategoryFilter";

export default {
  name: "index",
  middleware: "auth",
  components: {
    CategoryFilter,
    Pagination,
    CategoryRow,
    Loader,
    statusMessages,
  },
  fetch() {
    this.$store.dispatch("category/getCategoryHtmlTree");
    this.$store.dispatch("category/listCategories");
  },
  computed: {
    categoryList() {
      // console.log(this.$store.state.category.categoryList);return false;
      return this.$store.state.category.categoryList;
    },
  },
  methods: {
    handlePagination(page_number) {
      this.$store.commit("category/setPage", page_number);
      this.$store.dispatch("category/listCategories", this.getPayload());
    },
    handleFiltering(field, value) {
      this.$store.commit("category/setFilterData", { key: field, val: value });
      this.$store.commit("category/setPage", 1);

      this.$store.dispatch("category/listCategories", this.getPayload());
    },
    getPayload() {
      let payload = {};
      for (let field in this.$store.state.category.filterData) {
        if (
          this.$store.state.category.filterData.hasOwnProperty(field) &&
          this.$store.state.category.filterData[field] !== ""
        )
          payload["filter_by_" + field] =
            this.$store.state.category.filterData[field];
      }
      payload.page = this.$store.state.category.page;

      return payload;
    },
    removeCategory(id) {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("category/deleteCategory", id);
      }
    },
  },
};
</script>

<style scoped>
</style>