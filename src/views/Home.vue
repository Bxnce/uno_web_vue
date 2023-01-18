<template>
  <div class="container-fluid full-layout " id="container_all">
    <NavBar/>
    <div class="row center-align top-margin">
      <div class="col">
        <div class="main_header">
          The ultimative
        </div>
      </div>
    </div>
    <div class="row center-align">
      <div class="col">
        <div class="main_header">
          UNO experience!
        </div>
      </div>
    </div>
    <div class="row center-align">
      <div class="col">
        <RouterLink type="button" class="glow-on-hover" to='/setup'>
          Start a Game!
        </RouterLink>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
    NavBar,
  },
  methods: {
    route() {
      this.$router.push("/setup");
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../public/style/home.less";
</style>