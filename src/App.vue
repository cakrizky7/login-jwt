<template>
  <div>
    <div v-if="!isLoggedIn">
      <router-view></router-view>
    </div>
    <div v-if="isLoggedIn">
      <v-app id="keep">
        <v-app-bar app clipped-left color="amber">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
          <span class="title ml-3 mr-5">P.R.I.N.C.E. Tech&nbsp;</span>

          <v-spacer />
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
          <v-list dense class="grey lighten-4">
            <template v-for="(item, i) in items">
              <v-row v-if="item.heading" :key="i" align="center">
                <v-col cols="6">
                  <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                </v-col>
              </v-row>
              <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
              <v-list-item v-else-if="item.type=='logout'" :key="i" link @click="logout">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else :key="i" link :to="item.href">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-navigation-drawer>

        <v-content class="grey lighten-4 fill-height">
          <v-container fluid>
            <v-row justify="start" align="start">
              <v-col cols="12">
                <router-view></router-view>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    isLoggedIn: "",
    username: "",
    drawer: null,
    items: [
      { heading: "Data Master" },
      { icon: "fa fa-box", text: "Barang", href: "home" },
      // { icon: "fa fa-list-alt", text: "Alat", href: "alat" },
      // { icon: "fa fa-box-open", text: "Paket", href: "paket" },
      { divider: true },
      { heading: "Billing" },
      { icon: "fa fa-cash-register", text: "Transaksi" },
      // { icon: 'delete', text: 'Trash' },
      { divider: true },
      { heading: "Laporan" },
      { icon: "fa fa-file", text: "Laporan Transaksi Per-Bulan" },
      { divider: true },
      {
        type: "logout",
        icon: "fa fa-sign-out",
        text: "Log Out",
        href: "logout"
      }
    ]
  }),
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.go("/login");
    }
  },
  created() {
    var self = this;
    this.$http.defaults.headers.common["Content-Type"] = "application/json";
    this.$http.defaults.headers.common[
      "Authorization"
    ] = this.$store.state.token;
    if (this.$store.state.token != "") {
      this.$http
        .post(this.$store.state.host + "/checkauth", {})
        .then(response => {
          self.$store.commit("throw", response);
          self.isLoggedIn = self.$store.state.token;
          self.username = self.$store.state.username;
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 401) {
              self.$store.commit("logout");
              self.$router.push("/login");
            }
          } else {
            self.$store.commit("throw", error);
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

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>