<template>
  <div class="login-form">
    <div class="alert alert-danger" v-if="this.error_message">
      {{ this.error_message }}
    </div>
    <div class="alert alert-danger" v-for="item in this.validation_errors" :key="item"
    >
      {{ item }}
    </div>
    <form action="#" method="post" @submit.prevent="login()">
      <div class="form-group">
        <label>Email Address</label>
        <input
          class="au-input au-input--full"
          type="email"
          name="email"
          placeholder="Email"
          v-model="login_data.email"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          class="au-input au-input--full"
          type="password"
          name="password"
          placeholder="Password"
          v-model="login_data.password"
        />
      </div>
      <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit">
        sign in
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_data: {
        email: "",
        password: "",
      },
      error_message: "",
      validation_errors: [],
    };
  },
  name: "login",
  layout: "login",
  methods: {
    login() {
      this.validation_errors = [];
      this.error_message = "";

      this.clearStorage();

      this.$axios
        .$post("api/login", this.login_data)
        .then((response) => {
         
          this.saveIntoStorage(response);

          this.$router.push("/");
        })
        .catch((error) => {
          this.error_message = error.response.data.message;

          if (error.response.data.errors) {
            for (let key in error.response.data.errors) {
              this.validation_errors.push(error.response.data.errors[key][0]);
            }
          }
        });
    },
    clearStorage() {
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    },
    saveIntoStorage(response) {
      localStorage.setItem("is_authenticated", 1);
      localStorage.setItem("auth_token", response.access_token);
      localStorage.setItem("user_data", JSON.stringify(response.user));
    },
  },
};
</script>

<style scoped>
</style>