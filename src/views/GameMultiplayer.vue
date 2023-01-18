<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <LoadingAnimation/>
    <div id="top_cards">
      <div class="row row-col-2">
        <div class="col-4 offset-4">
          <div class="row center-align">
            <div class="col-6 g-0">
              <img id="midCard" :src="createImageUrl(midCard)" alt="X" class="card_no_hover img-fluid">
            </div>
            <div class="col-6 g-0">
              <img v-if="clickable === true" src="/images/cards/uno_back.png" alt="X" @click="takeCardMult()"
                   class="card_stack img-fluid" id="take_card">
              <img v-else src="/images/cards/uno_back.png" alt="X" class="card_stack img-fluid" id="take_card"
                   @click="takeCardMultErr()">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <div class="row row-cols-3 g-0 center-align top-5">
          <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 center-align" v-for="(card, index) in cards">
            <img v-if="clickable === true" alt="X" @click='clickCardMult(index)' class="cards img-fluid"
                 :src="createImageUrl(card)">
            <img v-else alt="X" class="cards img-fluid" :src="createImageUrl(card)" @click='clickCardError()'>
          </div>
        </div>
      </div>
    </div>
    <div class="row center-align top-5">
      <div class="col">
        <div v-if="waiting === true" >
          <button id="next_player_button_mult" type="button" class="glow-on-hover" disabled>
            waiting for enemy.
          </button>
        </div>
        <div v-else>
          <div v-if="clickable===true">
            <button id="next_player_button_mult" type="button" @click="nextPlayerMult()" class="glow-on-hover">next
              player
            </button>
          </div>
          <div v-else>
            <button id="next_player_button_mult" type="button" @click="nextPlayerMultErr()" class="glow-on-hover">not
              your turn! {{ enemy_cards }}
            </button>
          </div>
        </div>
        <div v-if="waiting === true" style="font-size: 32px; color: white">Your game code is: {{ game_code }}</div>
      </div>
    </div>
    <notifications position="bottom right" />
    <ColorChoosev2 :open="isOpen" @close="isOpen = !isOpen">
      <table class="cnter">
        <tr>
          <td>
            <img id="red" src="/images/cards/red.png" alt="X" class="cards img-fluid" @click="chooseColor('Red'); $emit('close')">
          </td>
          <td>
            <img id="blue" src="/images/cards/blue.png" alt="X" class="cards img-fluid" @click="chooseColor('Blue'); $emit('close')">
          </td>
        </tr>
        <tr>
          <td>
            <img id="green" src="/images/cards/green.png" alt="X" class="cards img-fluid" @click="chooseColor('Green'); $emit('close')">
          </td>
          <td>
            <img id="yellow" src="/images/cards/yellow.png" alt="X" class="cards img-fluid" @click="chooseColor('Yellow'); $emit('close')">
          </td>
        </tr>
      </table>
    </ColorChoosev2>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import {post_it, BASE_URL} from "../main.js";
import {notify} from "@kyvg/vue3-notification";
import ColorChoosev2 from "../components/ColorChoosev2.vue";
import {ref} from "vue";


export default {
  name: "GameMultiplayer",
  components: { LoadingAnimation, NavBar, ColorChoosev2,},
  setup() {
    const isOpen = ref(false)
    return {isOpen}
  },
  data() {
    return {
      socket: undefined,
      value: '',
      parts: '',
      url: '',
      clickable: false,
      waiting: true,
      enemy_cards: '',
      game_code: '',
      req: '',
      res: '',
      outer_all: '',
      row: '',
      currentstate: '',
      player_cards: [],
      wrapperd_cards: '',
      card: '',
      cards: [],
      currentJson: '',
      midCard: 'uno_back.png',
      baseUrl : BASE_URL,
      tookCard : false,
    }
  },
  created() {
    this.webSocketInit()
    this.setGameCode()
  },
  methods: {
    webSocketInit() {
      let _this = this;
      this.socket = new WebSocket("ws://uno-web.herokuapp.com/ws/" + this.getCookie("game"))
      this.socket.onopen = () => this.heartBeat();
      this.socket.onclose = () => console.log("Connection closed")
      this.socket.onmessage = function (event) {
        if (event.data !== "") {
          if (event.data === "Keep alive") {
            console.log("ping")
          } else {
            console.log("json reloaded");
            console.log(JSON.parse(event.data));
            _this.createCardsMultiplayer(JSON.parse(event.data));
          }
        } else {
          _this.socket.send("refresh");
        }
      }
      this.socket.onerror = () => console.log("that was a problem")

      setInterval(() => this.socket.send("Keep alive"), 20000); // ping every 20 seconds
    },
    async chooseColor(color) {
      this.url = "/game_mult/color/" + this.getCookie("game") + "/" + color;
      await this.gameChanges(this.url)
      console.log(color)
      this.hide()
      this.socket.send("refresh");
    },
    getCookie(name) {
      this.value = `; ${document.cookie}`;
      this.parts = this.value.split(`; ${name}=`);
      if (this.parts.length === 2) return this.parts.pop().split(';').shift();
    },
    async clickCardMult(ind) {
      this.url = "/game_mult/place/" + ind + "/" + this.getCookie("game");
      await this.gameChanges(this.url)
      console.log(this.midCard)
      },
    clickCardError() {
      notify({
        title: "Error",
        text: "You can't place a card now! Wait for your turn!",
        type: "error",
        duration: 3000,
      });
    },
    createImageUrl(image){
      return  new URL(this.baseUrl+ 'images/' + image, import.meta.url).href
    },
    async nextPlayerMult() {
      if(this.tookCard === true){
        this.url = "/game_mult/next/" + this.getCookie("game");
        await this.gameChanges(this.url)
        this.tookCard = false
      }else{
        notify({
          title: "Error",
          text: "You have to take a card first!",
          type: "error",
          duration: 3000,
        });
      }
    },
    nextPlayerMultErr(){
      notify({
        title: "Error",
        text: "You can't skip your turn now! Wait for your turn!",
        type: "error",
        duration: 3000,
      });
    },
    async takeCardMult() {
      this.url = "/game_mult/take/" + this.getCookie("game");
      await this.gameChanges(this.url)
      this.tookCard = true;
    },
    takeCardMultErr(){
      notify({
        title: "Error",
        text: "You can't take a card now! Wait for your turn!",
        type: "error",
        duration: 3000,
      });
    },
    setGameCode() {
      this.game_code = this.getCookie("game");
    },
    async createCardsMultiplayer(json) {
      this.waiting = false;
      this.midCard = json["game"].midCard["png_ind"][0]["card_png"];
      //-----------------------------------------
      this.currentstate = json["game"].currentstate;
      this.player_cards = [];
      this.clickable = false;
      if (this.currentstate === this.getCookie("player")) {
        if (json["game"].ERROR !== 0) {
          notify({
            title: "Error",
            text: "You can't place this card",
            type: "error",
            duration: 3000,
          });
        }
        this.clickable = true;
        if (this.getCookie("pn") === "player1") {
          this.player_cards = json["game"].player1["png_ind"];
        } else {
          this.player_cards = json["game"].player2["png_ind"];
        }
      } else if (this.currentstate === "winState") {

      } else {
        if (this.getCookie("pn") === "player1") {
          this.player_cards = json["game"].player1["png_ind"];
          this.enemy_cards = json["game"].player2["name"] + " has " + json["game"].player2["kartenzahl"] + " cards left";
        } else {
          this.player_cards = json["game"].player2["png_ind"];
          this.enemy_cards = json["game"].player1["name"] + " has " + json["game"].player1["kartenzahl"] + " cards left";
        }
      }
      this.cards = [];
      this.player_cards.forEach(element => this.cards.push(element["card_png"]));
    },
    heartBeat() {
      this.socket.send("heartBeat");
    },
    async gameChanges(url) {
      this.res = await post_it(url);
      if (this.res.ok) {
        await this.res.text();
        this.socket.send("refresh");
      } else {
        console.log("page failed loading");
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../public/style/playState.less";
</style>