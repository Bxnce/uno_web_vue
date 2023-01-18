<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <div class="top-margin"></div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <div class="input-field">
            <input type="text" v-model="player1" required/>
            <label for="player1">Player 1:</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <div class="input-field">
            <input type="text" v-model="player2" required/>
            <label for="player2">Player 2:</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <button type="button" class="glow-on-hover" id="create_game_bt" @click='clicker()'>
            Start the Game!
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <button type="button" class="glow-on-hover" id="get_to_mult" @click='route("/mpsetup")'>
            Multiplayer
          </button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import { post_it } from "../main.js";



export default {
  name: "PrestartState",
  data(){
    return {
      player1: "",
      player2: ""
    };
  },
  components: {
    Footer,
    NavBar,
  },
  methods: {
    async clicker() {
      if (this.player1 === "" || this.player2 === "") {
        alert("Please enter player names");
      } else {
        this.res = await post_it("/game/start/"+this.player1+"/"+this.player2);
        if (this.res.ok) {
          this.route("/start");
        } else {
          console.log("page failed loading");
        }
      }
    },
    route(ref) {
      this.$router.push(ref);
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../public/style/prestartState.less";
</style>