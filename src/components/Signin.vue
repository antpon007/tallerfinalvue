<template>
  <form class="col-3">
    <div class="form-group">
      <label>email:</label>
      <input type="text" class="form-control" rows="3" v-model="email">
    </div>
    <div class="form-group">
      <label>password:</label>
      <input type="password" class="form-control" rows="3" v-model="password">
    </div>
    <button type="button" class="btn btn-primary" @click="login()">Crear</button>
  </form>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {},
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      };
      fetch(process.env.VUE_APP_ROOT_API + "users/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.meta.token);
            localStorage.setItem("_userId", data.item._id);
            this.$emit("authenticated", true);
            this.$router.replace({ name: "principal" });
          } else {
            alert(data.message);
          }
        });
    }
  }
};
</script>
