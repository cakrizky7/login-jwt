<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form | Simple Login with JWT</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    login(e) {
      e.preventDefault();
      var self = this;
      this.$http
        .post(this.$store.state.host + "/login", {
          Username: this.username,
          Password: this.password
        })
        .then(response => {
          this.$store.commit("login_username", response.data.username);
          this.$store.commit("login_token", response.data.token);
          self.$swal({
            title: "Success!",
            text: "Mohon tunggu, Anda akan diarahkan ke halaman utama ",
            icon: "success",
            confirmButtonText: "Ok"
          });
          self.$router.go('/home');
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 401) {
              self.$swal({
                title: "Error!",
                text: "Incorrect Username / Password ",
                icon: "error",
                confirmButtonText: "Ok"
              });
            }
          } else {
            console.log(error);
            self.$swal({
              title: "Error!",
              text: "Internal Server Error ",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        });
    }
  }
};
</script>