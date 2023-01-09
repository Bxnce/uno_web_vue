<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <LoadingAnimation/>
  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="input-field">
          <input type="text" v-model="player2" required />
          <label for="player1">Name:</label>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="input-field">
          <input type="text" v-model="hash" required />
          <label for="player1">Game Code:</label>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <button type="button" class="glow-on-hover" id="join_multiplayer_game" @click='clicker()'>
          Join
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

import { post_it } from "../main.js";

export default {
  name: "MultiplayerJoin",
  data() {
    return{
      player2: "",
      hash: "",
    };
  },
  components: {Footer, LoadingAnimation, NavBar},
  methods: {
    async clicker() {
      if (this.player2 === "" || this.hash === "") {
        alert("Please enter name and hash");
      } else {
        this.setCookies("player2State", this.hash);
        this.res = await post_it("/game_mult/join/" + this.getCookie("game") + "/" + this.getCookie("name"))
        if (this.res.ok) {
          this.$router.push("/mpstart");
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
      document.cookie = "name=" + this.player2;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  },

}
</script>

<style lang="less" scoped>
@import "../../public/style/prestartState.less";
</style>