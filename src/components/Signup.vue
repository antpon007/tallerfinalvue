<template>
  <form>
    <div class="form-group">
      <label>firstname:</label>
      <input type="text" class="form-control" rows="3" v-model="firstname">
    </div>
    <div class="form-group">
      <label>lastname:</label>
      <input type="text" class="form-control" rows="3" v-model="lastname">
    </div>
    <div class="form-group">
      <label>email:</label>
      <input type="text" class="form-control" rows="3" v-model="email">
    </div>
    <div class="form-group">
      <label>password:</label>
      <input type="password" class="form-control" rows="3" v-model="password">
    </div>
    <button type="button" class="btn btn-primary" @click="save">Crear</button>
  </form>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  created() {},
  methods: {
    save() {
      const user = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      };
      fetch("http://10.20.9.25:3000/api/v1/" + "users/signup", {
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
            alert("successfully created user");
            this.$router.replace({ name: "signin" });
          } else {
            alert(data.message);
          }
        });
    }
  }
};
</script>
