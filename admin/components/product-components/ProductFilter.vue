<template>
  <form method="get" action="#" style="margin-bottom: 10px">
    <h4>Filter</h4>
    <div class="row">
      <div class="col-1">
        <input
          type="text"
          class="form-control"
          placeholder="Id"
          name="id"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.id"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.title"
        />
      </div>
      <div class="col-3">
        <select
          class="form-control"
          v-html="this.$store.state.category.categoryHtmlTree"
          name="category_id"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.category_id"
        >
          <option value="">select category</option>
        </select>
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="From price"
          name="from_price"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.from_price"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="To price"
          name="to_price"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.to_price"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="Product code"
          name="product_code"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.product_code"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="Inventory"
          name="amount"
          @change="handleFiltering($event)"
          :value="this.$store.state.product.filterData.amount"
        />
      </div>
      <div class="col-3">
        <select
          name="brand_id"
          id="brand_id"
          class="form-control"
          :value="this.$store.state.product.filterData.brand_id"
          @change="handleFiltering($event)"
        >
          <option value="">Brand</option>
          <option
            v-for="brand in this.$store.state.brand.allBrands"
            :key="brand.id"
            :value="brand.id"
          >
            {{ brand.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <nuxt-link to="/product/create" class="btn btn-success pull-right"
          ><i class="fa fa-plus-square"></i> Create</nuxt-link
        >
      </div>
    </div>
  </form>
</template>
  
  <script>
export default {
  name: "ProductFilter",
  methods: {
    handleFiltering(event) {
      this.$emit("Filtering", event.target.name, event.target.value);
    },
  },
};
</script>
  
  <style scoped>
.col-3,
.col-2,
.col-1 {
  padding: 2px !important;
}
</style>