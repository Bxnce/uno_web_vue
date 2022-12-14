<template>
  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="input-field">
          <input type="text" id="player" required/>
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
        <button type="button" class="glow-on-hover" id="join_multiplayer" @click='route("/game_mult/prejoin")'>
          Join a Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrestartMultiplayer",
  methods: {
    route(ref) {
      window.location.href = ref;
    },
    clicker() {
      this.setCookies("player1State", "", "player1");
      document.getElementById("player1_label").innerHTML = "Game code: " + this.getCookie("game");
      this.route("/game_mult/cc/" + this.getCookie("game") + "/" + this.getCookie("name"));
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
      document.cookie = "name=" + document.getElementById("player").value;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  }
}
</script>

<style scoped>

</style>