<template>
  <nav v-if="showPaginator()">
    <ul class="pagination">
      <li :class="'page-item' + (data.current_page == 1?' active':'')">
        <a class="page-link" href="#" @click.prevent="displayPage(1)">First</a>
      </li>

      <li class="page-item" v-if="data.current_page > 1">
        <a class="page-link" href="#" @click.prevent="displayPage(data.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li :class="'page-item' + (data.current_page == page?' active':'')" v-for="page in numPages()" :key="page">
        <a class="page-link" href="#" @click.prevent="displayPage(page)">{{ page }}</a>
      </li>

      <li class="page-item" v-if="data.current_page < data.last_page">
        <a class="page-link" href="#" @click.prevent="displayPage(data.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

      <li :class="'page-item' + (data.current_page == data.last_page?' active':'')">
        <a class="page-link" href="#" @click.prevent="displayPage(data.last_page)">Last</a>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: ["data"],
        methods: {
          numPages() {
            return Math.ceil(this.data.total / this.data.per_page);
          },
          showPaginator() {
            if(this.numPages() > 1) {
              return true;
            }
            return false;
          },
          displayPage(page_number) {
              this.$emit("handlePagination", page_number);
          }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>