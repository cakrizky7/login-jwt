<template>
  <div>
    <v-alert type="info">Selamat Datang, silahkan pilih menu di sebelah kiri layar</v-alert>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  
  data: () => ({
    transaksis: [],
  }),
  methods: {
    initialize() {
      var self = this;
      this.$http
        .get(this.$store.state.host + "/api/transaksi", {})
        .then(response => {
          this.transaksis = response.data;
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 401) {
              self.$store.commit("logout");
              self.$router.push("/login");
            }
          } else {
            self.$store.commit('throw',error);
          }
        });
    }
  },
  created() {
    this.$http.defaults.headers.common["Content-Type"] = "application/json";
    this.$http.defaults.headers.common["Authorization"] = this.$store.state.token;
    this.initialize();
  }
};
</script>