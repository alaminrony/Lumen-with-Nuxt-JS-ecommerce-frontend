<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>
            <BrandFilter
              @Filtering="handleFiltering"
              @createBrand="createBrand"
            ></BrandFilter>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody v-if="brandList.data">
                  <BrandRow
                    v-for="brand of brandList.data"
                    :brand="brand"
                    :key="brand.id"
                    @removeBrand="removeBrand"
                    @editBrand="editBrand"
                  ></BrandRow>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="brandList"
              v-if="brandList.data"
              @handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
    <FormModal></FormModal>
  </div>
</template>
  
  <script>
import Loader from "../../components/helpers/loader";
import statusMessages from "../../components/helpers/statusMessages";
import BrandRow from "../../components/brand-components/BrandRow";
import Pagination from "../../components/helpers/Pagination";
import BrandFilter from "../../components/brand-components/BrandFilter";
import FormModal from "../../components/brand-components/FormModal";

export default {
  name: "index",
  middleware: "auth",
  head() {
    return {
      title: this.getHeadTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Brand page description",
        },
      ],
    };
  },
  components: {
    FormModal,
    BrandFilter,
    Pagination,
    BrandRow,
    Loader,
    statusMessages,
  },
  fetch() {
    this.$store.dispatch("brand/listBrands");
  },
  computed: {
    brandList() {
      // console.log(this.$store.state.brand.brandList);return false;
      return this.$store.state.brand.brandList;
    },
    getHeadTitle() {
      // console.log(this.$store.state.brand.getHeadTitle);return false;
      return this.$store.state.brand.getHeadTitle;
    },
  },
  methods: {
    handlePagination(page_number) {
      // alert(page_number);return false;
      this.$store.commit("brand/setPage", page_number);
      this.$store.dispatch("brand/listBrands", this.getPayload());
    },
    handleFiltering(field, value) {
      this.$store.commit("brand/setFilterData", { key: field, val: value });
      this.$store.commit("brand/setPage", 1);
      this.$store.dispatch("brand/listBrands", this.getPayload());
    },
    getPayload() {
      let payload = {};
      for (let field in this.$store.state.brand.filterData) {
        if (
          this.$store.state.brand.filterData.hasOwnProperty(field) &&
          this.$store.state.brand.filterData[field] !== ""
        )
          payload[field] = this.$store.state.brand.filterData[field];
      }
      payload.page = this.$store.state.brand.page;

      return payload;
    },
    removeBrand(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete. You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DC3545",
        cancelButtonColor: "#198754",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("brand/deleteBrand", id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
      // if (confirm("Are you sure?")) {
      //   this.$store.dispatch("brand/deleteBrand", id);
      // }
    },
    createBrand() {
      this.$store.commit("brand/resetBrand");
      // some jquery code
      $(".brand-form-modal").modal("show");
    },
    editBrand(id) {
      this.$store.dispatch("brand/showBrand", {
        id,
        onSuccess: () => $(".brand-form-modal").modal("show"),
      });
    },
  },
};
</script>
  
  <style scoped>
</style>