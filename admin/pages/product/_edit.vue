<template>
    <div class="main-content">
      <div class="section__content section__content--p30">
        <div class="container-fluid">
          <loader></loader>
          <status-messages></status-messages>
          <form method="post" action="#" @submit.prevent="update()" enctype="multipart/form-data">
            <ProductForm></ProductForm>
  
            <div class="row">
              <button type="submit" class="btn btn-lg btn-info btn-block">
                <i class="fa fa-save fa-lg"></i> Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
      import Loader from "../../components/helpers/loader";
      import StatusMessages from "../../components/helpers/statusMessages";
      import ProductForm from "../../components/product-components/Form";
      export default {
          name: "EditProduct",
          data() {
            return {
              id: ""
            }
          },
          components: {
              ProductForm,
              StatusMessages,
              Loader
          },
          fetch() {
            this.$store.dispatch('category/getCategoryHtmlTree');
            this.$store.dispatch('brand/getAllBrands');
  
            // load product details
            setTimeout(() => {
              if(this.$route.params.edit) {
                this.id = this.$route.params.edit;
                this.$store.dispatch('product/show', this.$route.params.edit);
              }
            }, 200);
          },
          methods: {
            update() {
              this.$store.dispatch('product/update', {
                id: this.id,
                router: this.$router
              });
            }
          },
          mounted() {
  
          }
      }
  </script>
  
  <style scoped>
  
  </style>