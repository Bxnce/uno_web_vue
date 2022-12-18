<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <LoadingAnimation/>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <div class="input-field">
            <input type="text" v-model="player" required/>
            <label for="player" id="player1_label">Name:</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <button type="button" class="glow-on-hover" id="create_multiplayer_button" @click='clicker()'>
            Create a Game
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-center">
          <button type="button" class="glow-on-hover" id="join_multiplayer" @click='route("/game/multiplayer/prejoin")'>
            Join a Game
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
  name: "PrestartMultiplayer",
  data() {
    return {
      player: "",
    };
  },
  components: {LoadingAnimation, Footer, NavBar},
  methods: {
    route(ref) {
      this.$router.push(ref);
    },
    async clicker() {
      if (this.name !== "") {
        this.setCookies("player1State", "", "player1");
        document.getElementById("player1_label").innerHTML = "Game code: " + this.getCookie("game");
        this.route("/game_mult/cc/" + this.getCookie("game") + "/" + this.getCookie("name"));

        this.res = await fetch(SERVER_URL + "/game_mult/cc/" + this.getCookie("game") + "/" + this.getCookie("name"), {
          method: 'POST',
          headers: {
            'Accept': 'application/json */*',
            'Content-Type': 'application/json'
          },
          body: ""
        })
        if (this.res.ok) {
          this.route("/game/multiplayer/start");
        } else {
          console.log("page failed loading");
        }
      }


    },
    createHash() {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    setCookies(state, hash, player) {
      if (hash === "") {
        document.cookie = "game=" + this.createHash();
      } else {
        document.cookie = "game=" + hash;
      }
      document.cookie = "pn=" + player;
      document.cookie = "player=" + state;
      document.cookie = "name=" + this.player;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../public/style/prestartState.less";
</style>