<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <div class="top-margin"></div>
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
          <button type="button" class="glow-on-hover" id="join_multiplayer" @click='route("/mpprejoin")'>
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
import Footer from "../components/Footer.vue";
import { post_it } from "../main.js";

export default {
  name: "PrestartMultiplayer",
  data() {
    return {
      player: "",
    };
  },
  components: {Footer, NavBar},
  methods: {
    route(ref) {
      this.$router.push(ref);
    },
    async clicker() {
      if (this.name !== "") {
        this.setCookies("player1State", "", "player1");
        document.getElementById("player1_label").innerHTML = "Game code: " + this.getCookie("game");
        this.res = await post_it("/game_mult/cc/" + this.getCookie("game") + "/" + this.getCookie("name"))
        if (this.res.ok) {
          this.route("/mpstart");
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
    deleteAllCookies() {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
    setCookies(state, hash, player) {
      this.deleteAllCookies()
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