<template>
  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="input-field">
          <input type="text" id="player" required />
          <label for="player1">Name:</label>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="input-field">
          <input type="text" id="game_hash" required />
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
</template>

<script>
export default {
  name: "MultiplayerJoin",
  methods: {
    clicker() {
      let player2 = $("#player").val();
      let hash = $("#game_hash").val();
      if (player2 == "" || hash == "") {
        alert("Please enter name and hash");
      } else {
        this.setCookies("player2State", document.getElementById("game_hash").value);
        window.location.href = "/game_mult/join/" + this.getCookie("game") + "/" + this.getCookie("name");
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
      document.cookie = "name=" + document.getElementById("player").value;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  },

}
</script>

<style scoped>

</style>