<template>
  <div class="main-content">
      <div class="section__content section__content--p30">
        <div class="container-fluid">
          <loader></loader>
          <status-messages></status-messages>
          <form method="post" action="#" @submit.prevent="save()">
            <div class="row">

              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <strong>Create New Category</strong>
                  </div>
                  <div class="card-body card-block">
                    <div class="form-group">
                      <label for="title" class=" form-control-label">Title</label>
                      <input type="text" id="title" name="title" placeholder="Enter category title" class="form-control" v-model="title">
                    </div>
                    <div class="form-group">
                      <label for="parent_id" class=" form-control-label">Parent</label>
                      <select id="parent_id" name="parent_id" class="form-control" v-model="parent_id" v-html="categoryTree">

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
                      <textarea id="description" name="description" class="form-control" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="featured" class=" form-control-label">Is Featured</label>
                      <select id="featured" name="featured" class="form-control" v-model="featured">
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
                  <i class="fa fa-save fa-lg"></i> Save
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
        name: "create",
        middleware: "auth",
        components: {
          CategoryFeatures,
          Loader,
          statusMessages
        },
        fetch() {
          this.$store.dispatch('category/getCategoryHtmlTree');
        },
        computed: {
          title: {
            set(title) {
              this.$store.commit('category/setTitle', title);
            },
            get() {
              return this.$store.state.category.category.title;
            }
          },
          parent_id: {
            set(parent_id) {
              this.$store.commit('category/setParentId', parent_id);
            },
            get() {
              return this.$store.state.category.category.parent_id;
            }
          },
          description: {
            set(description) {
              this.$store.commit('category/setDescription', description);
            },
            get() {
              return this.$store.state.category.category.description;
            }
          },
          featured: {
            set(featured) {
              this.$store.commit('category/setFeatured', featured);
            },
            get() {
              return this.$store.state.category.category.featured;
            }
          },
          categoryTree() {
            return this.$store.state.category.categoryHtmlTree;
          }
        },
      methods: {
          save() {
            this.$store.dispatch('category/create', {data: this.$store.state.category.category,
              features: this.$store.state.category.features,
              router: this.$router
            });
          }
      },
       mounted() {
          this.$store.commit('category/resetCategory');
       }
    }
</script>

<style scoped>

</style>