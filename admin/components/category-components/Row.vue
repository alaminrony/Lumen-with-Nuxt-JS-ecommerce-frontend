<template>
  <tr>
    <td>{{ category.id }}</td>
    <td>{{ category.title }}</td>
    <td>{{ category.parent ? category.parent.title:"none" }}</td>
    <td>{{ category.featured == 1 ? 'Yes' : 'No' }}</td>
    <td>{{ category.created_at | dateFormat}}</td>
    <td>
      <nuxt-link :to="`/category/${category.id}`" class="btn btn-info btn-sm"><i class="fa fa-edit"></i></nuxt-link>
      <a href="#" class="btn btn-danger btn-sm" @click.prevent="removeCategory(category.id)"><i class="fa fa-remove"></i></a>
    </td>
  </tr>
</template>

<script>
    export default {
        name: "CategoryRow",
        props: ['category'],
        methods: {
          removeCategory(categoryId) {
            // alert(categoryId);return false;
            this.$emit('removeCategory', categoryId);
          }
        }
    }
</script>

<style scoped>

</style>