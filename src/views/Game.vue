<template>
  <div id="top_cards">
    <div class="row row-col-2">
      <div class="col-4 offset-4">
        <div class="row center-align">
          <div class="col-6 g-0">
            <img id="midCard" :src="'/assets/images/'+ midCard" alt="X" class="card_no_hover img-fluid">
          </div>
          <div class="col-6 g-0">
            <img src="/assets/images/uno_back.png" alt="X" @click="takeCard()" class="card_stack img-fluid"
                 id="take_card">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6 offset-3" v-if="currentstate === 'player1State' || currentstate === 'player2State'">
      <div class="row row-cols-3 g-0 center-align top-5">
        <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 center-align" v-for="(card, index) in cards">
          <img alt="X" @click='clickCard(index)' class="cards img-fluid" :src="'/assets/images/'+ card">
        </div>
      </div>
    </div>
  </div>
  <div class="row center-align top-5">
    <div class="col">
      <button id="next_player_button" type="button" @click="nextPlayer()" class="glow-on-hover">next player</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  data() {
    return {
      req : '',
      res : '',
      currentstate : '',
      player_cards : [],
      cards: [],
      midCard : 'uno_back.png',
    }
  },
  methods: {
    async clickCard(ind) {
      this.req = `/game/place/` + ind;
      await this.getJSON(this.req);
    },
    async nextPlayer() {
      await this.getJSON('/game/next');
    },
    async takeCard() {
      await this.getJSON('/game/take');
    },
    async startGame() {
      await this.getJSON('/game/json');
    },
    async getJSON(url) {
      this.res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json */*',
          'Content-Type': 'application/json'
        },
        body: ""
      })
      if (this.res.ok) {
        await this.createCards(await this.res.json())
      } else {
        console.log("page failed loading");
      }
    },
    async createCards(json) {
      this.cards = []
      this.midCard = json["game"].midCard["png_ind"][0]["card_png"];
      this.currentstate = json["game"].currentstate;
      this.player_cards = []
      if (this.currentstate === "player1State") {
        if (json["game"].ERROR !== 0) {
          alert("This card cannot be placed");
        }
        this.player_cards = json["game"].player1["png_ind"];
      } else if (this.currentstate === "player2State") {
        if (json["game"].ERROR !== 0) {
          alert("This card cannot be placed");
        }
        this.player_cards = json["game"].player2["png_ind"];
      }

      this.player_cards.forEach(element => this.cards.push(element["card_png"]));
    },
  },
}
</script>

<style scoped>

</style>