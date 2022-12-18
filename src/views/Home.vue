<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar />
    <LoadingAnimation />
    <div class="row center-align">
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
        <RouterLink type="button" class="glow-on-hover" to='/game/setup'>
          Start a Game!
        </RouterLink>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
    NavBar,
    LoadingAnimation
  },
  methods: {
    route() {
      this.$router.push("/game/setup");
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../public/style/home.less";
</style>