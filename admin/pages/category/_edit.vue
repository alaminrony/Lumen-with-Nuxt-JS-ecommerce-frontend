<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        
        <loader></loader>
        <status-messages></status-messages>
        
         <form method="post" action="#" @submit.prevent="update()">
          <div class="row">

            <div class="col-lg-6">
              <div class="card">
                <div class="card-header">
                  <strong>Update Category #{{this.id}}</strong>
                </div>
                <div class="card-body card-block">
                  <div class="form-group">
                    <label for="title" class=" form-control-label">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter category title" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="parent_id" class=" form-control-label">Parent</label>
                    <select id="parent_id" name="parent_id" class="form-control">

                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <div class="card-body card-block">
                  <div class="form-group">
                    <label for="description" class=" form-control-label">Description</label>
                    <textarea id="description" name="description" class="form-control"></textarea>
                  </div>
                   <div class="form-group">
                      <label for="featured" class=" form-control-label">Is Featured</label>
                      <select id="featured" name="featured" class="form-control">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <strong>Features</strong>
                </div>
                <div class="card-body card-block">
                  <CategoryFeatures></CategoryFeatures>
                </div>
              </div>
            </div>

          </div>
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
    import statusMessages from "../../components/helpers/statusMessages";
    import Loader from "../../components/helpers/loader";
    import CategoryFeatures from "../../components/category-components/CategoryFeatures";

    export default {
        name: "edit",
        middleware: "auth",
        components: {
          CategoryFeatures,
          Loader,
          statusMessages
        },
        data() {
          return {
            id: ''
          }
        },
      computed: {
      },
      methods: {
        update() {
          
        }
      },
      mounted() {
          if(this.$route.params.edit) {
            this.id = this.$route.params.edit;
          }
      }
    }
</script>

<style scoped>

</style>