<template>
  <ul :class="ulclass">
    <li :class="{ active: this.$route.path === '/' }">
      <nuxt-link to="/">
        <i class="fas fa-tachometer-alt"></i>Dashboard
      </nuxt-link>
    </li>
    <li :class="{ active: this.$route.path.indexOf('category') !== -1 }">
      <nuxt-link to="/category">
        <i class="fas fa-list"></i>Categories
      </nuxt-link>
    </li>
    <li :class="{ active: this.$route.path.indexOf('brand') !== -1 }">
      <nuxt-link to="/brand">
        <i class="fas fa-television"></i>Brands
      </nuxt-link>
    </li>

    <li :class="{ active: this.$route.path.indexOf('product') !== -1 }">
      <nuxt-link to="/product">
        <i class="fas fa-shopping-cart"></i>Products
      </nuxt-link>
    </li>
    <li>
      <a href="#"> <i class="fas fa-gears"></i>Orders</a>
    </li>
    <li>
      <a href="#"> <i class="fas fa-gears"></i>Pending Orders</a>
    </li>
    <li>
      <a href="#"> <i class="fas fa-users"></i>Users</a>
    </li>
    <li>
      <a href="#"> <i class="fas fa-sign-out-alt"></i>Logout</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "nav-menu",
  props: ["ulclass"],
  mounted() {},
};
</script>

<style scoped>
</style>