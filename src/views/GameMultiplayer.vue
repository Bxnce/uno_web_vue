<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <div class="top-margin"></div>
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
          <div class="centerr marg-waves">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        </div>
        <div v-else>
          <div v-if="clickable===true">
            <button id="next_player_button_mult" type="button" @click="nextPlayerMult()" class="glow-on-hover">next
              player
            </button>
          </div>
          <div v-else>
              <p class="marg-txt txt">
                Not your turn! {{ this.enemy_cards }}
              </p>
              <div class="centerr">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
              </div>
          </div>
        </div>
        <div v-if="waiting === true" class="marg-txt txt">Waiting for opponent! Your game code is: {{ game_code }}</div>
      </div>
    </div>
    <notifications position="bottom right" />
    <ColorChoose :open="isOpen" @close="isOpen = !isOpen">
      <p class="glow">Choose your Color!</p>
      <table class="cnter">
        <tr>
          <td>
            <img id="red" src="/images/cards/red.png" alt="X" class="cards img-fluid" @click="setColor('Red')">
          </td>
          <td>
            <img id="blue" src="/images/cards/blue.png" alt="X" class="cards img-fluid" @click="setColor('Blue')">
          </td>
        </tr>
        <tr>
          <td>
            <img id="green" src="/images/cards/green.png" alt="X" class="cards img-fluid" @click="setColor('Green')">
          </td>
          <td>
            <img id="yellow" src="/images/cards/yellow.png" alt="X" class="cards img-fluid" @click="setColor('Yellow')">
          </td>
        </tr>
      </table>
    </ColorChoose>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import {post_it, BASE_URL} from "../main.js";
import {notify} from "@kyvg/vue3-notification";
import ColorChoose from "../components/ColorChoose.vue";
import {ref} from "vue";


export default {
  name: "GameMultiplayer",
  components: { NavBar, ColorChoose,},
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
      chosenColor: '',
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
            _this.createCardsMultiplayer(JSON.parse(event.data));
          }
        } else {
          _this.socket.send("refresh");
        }
      }
      this.socket.onerror = () => console.log("that was a problem")

      setInterval(() => this.socket.send("Keep alive"), 20000); // ping every 20 seconds
    },
    async chooseColor() {
      this.url = "/game_mult/color/" + this.getCookie("game") + "/" + this.chosenColor;
      await this.gameChanges(this.url)
      console.log(this.chosenColor)
    },
    setColor(color) {
      this.chosenColor = color
      this.isOpen = !this.isOpen
    },
    getCookie(name) {
      this.value = `; ${document.cookie}`;
      this.parts = this.value.split(`; ${name}=`);
      if (this.parts.length === 2) return this.parts.pop().split(';').shift();
    },
    async clickCardMult(ind) {
      const checkWC = this.currentJson["game"][this.getCookie("pn")]["karten"][ind]["cardv"]
      console.log("checkWC:::" + checkWC)
      if(checkWC === "WC" || checkWC === "+4"){
        this.isOpen = !this.isOpen
        while(this.isOpen === true){
          await new Promise(r => setTimeout(r, 1));
        }
      }
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

.glow {
  font-size: 16px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 8px #e60073, 0 0 10px #e60073, 0 0 12px #e60073, 0 0 14px #e60073;
  }
  to {
    text-shadow: 0 0 4px #fff, 0 0 6px #ff4da6, 0 0 8px #ff4da6, 0 0 10px #ff4da6, 0 0 12px #ff4da6, 0 0 14px #ff4da6, 0 0 16px #ff4da6;
  }
}

.glowBig {
  margin-top: 45px;
  font-size: 32px;
  color: #fff;
  text-align: center;
  -webkit-animation: glowBig 2s ease-in-out infinite alternate;
  -moz-animation: glowBig 2s ease-in-out infinite alternate;
  animation: glowBig 2s ease-in-out infinite alternate;
}

@-webkit-keyframes glowBig {
  from {
    text-shadow: 0 0 4px #fff, 0 0 8px grey, 0 0 12px green, 0 0 16px blue, 0 0 20px blueviolet, 0 0 24px pink, 0 0 28px red;
  }
  to {
    text-shadow: 0 0 8px #fff, 0 0 12px grey, 0 0 16px green, 0 0 20px blue, 0 0 24px blueviolet, 0 0 28px pink, 0 0 32px red;
  }
}

bodY {
  margin: auto;
  box-sizing: border-box;
}
.marg-waves{
  margin-top: 80px;
}
.marg-txt{
  margin-top: 40px;
}
.txt{
  font-size: 28px;
  color: white;
}
.centerr {
  display: flex;
  justify-content: center;
  align-items: center;
  background: @background;
}
.wave {
  width: 1px;
  height: 50px;
  background: linear-gradient(45deg, cyan, #fff);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 10px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

</style>