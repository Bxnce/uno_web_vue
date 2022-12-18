<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <LoadingAnimation/>
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
          <button type="button" class="glow-on-hover" id="get_to_mult" @click='route("/game/multiplayer/setup")'>
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
import LoadingAnimation from "../components/LoadingAnimation.vue";
import Footer from "../components/Footer.vue";
const SERVER_URL = "http://localhost:9000"


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
    LoadingAnimation
  },
  methods: {
    async clicker() {
      if (this.player1 === "" || this.player2 === "") {
        alert("Please enter player names");
      } else {
        this.res = await fetch(SERVER_URL+"/game/start/"+this.player1+"/"+this.player2, {
          method: 'POST',
          headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'},
          body: ""
        })
        if (this.res.ok) {
          this.route("/game/start");
          console.log(this.res.json());
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