<template>
  <div id="main container clearfix">
    <nav>
      <!--router-link to="about">Quienes somos</router-link-->
      <a v-on:click="logout()" v-if="authenticated" class="btn btn-light">Salir</a>
      <a v-on:click="principal()" class="btn btn-success">Questions</a>
      <a v-on:click="login()" v-if="!authenticated" class="btn btn-success">Iniciar sesion</a>
      <a v-on:click="register()" v-if="!authenticated" class="btn btn-success">Registrarse</a>
    </nav>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>
import Signin from "./Signin";

export default {
  name: "stheader",
  components: {
    signin: Signin
  },
  data() {
    return {
      authenticated: false,
      servidor: "http://10.20.9.25:3000/api/v1/"
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.authenticated = true;
    }
    console.log(this.authenticated);
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      this.$emit("authenticated", status);
    },
    login() {
      this.$router.replace({ name: "signin" });
    },
    principal() {
      this.$router.replace({ name: "principal" });
    },
    logout() {
      this.authenticated = false;
      this.$router.replace({ name: "signin" });
    },
    register() {
      this.$router.replace({ name: "signup" });
    }
  }
};
</script>

<style>
div.barra {
  padding: 10px;
  background-color: var(--azul);
}
.brand {
  margin: 0;
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

div.logo {
  float: left;
  padding-left: 10px;
}

div.logo a {
  color: var(--claro);
  font-size: 1.5em;
  text-decoration: none;
}

div.logo img {
  width: 30px;
}

/** Nav principal **/

nav.navegacion-principal {
  display: none;
  width: 100%;
}
nav.navegacion-menu-movil {
  display: block;
  width: 100%;
  text-align: center;
}

nav.navegacion-principal a,
nav.navegacion-menu-movil a {
  font-family: "Oswald", sans-serif;
  color: #ffffff;
  font-size: 0.8em;
  text-decoration: none;
  transition: all 0.6s ease;
  width: 100%;
  display: block;
  text-align: center;
  clear: both;
}

nav.navegacion-principal a:hover,
nav.navegacion-menu-movil a:hover {
  background-color: var(--piel);
}

@media only screen and (min-width: 768px) {
  nav.navegacion-principal {
    width: 67%;
    float: right;
    text-align: right;
    display: block;
  }
  nav.navegacion-principal a {
    padding: 10px 10px;
    display: inline-block;
    width: auto;
    text-align: center;
    margin: 0 10px 0 0;
  }
  nav.navegacion-menu-movil {
    display: none;
  }
}

div.menu-movil {
  width: 35px;
  display: block;
  float: right;
  text-align: center;
  padding: 3px;
}

div.menu-movil img {
  width: 18px;
}

div.menu-movil:hover {
  cursor: pointer;
  background-color: var(--piel);
}

@media only screen and (min-width: 768px) {
  div.menu-movil {
    display: none;
  }
}

div.menu-movil span {
  height: 8px;
  margin-bottom: 6px;
  background-color: white;
  display: block;
}
.esconder {
  display: none !important;
}

.topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
}
</style>

