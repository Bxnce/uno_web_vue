<template>
  <div class="vue-modal" v-show="open">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import {post_it} from "../main";

export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
  },
  data () {
    return {
      color: '',
    }
  },
  methods: {
    getCookie(name) {
      this.value = `; ${document.cookie}`;
      this.parts = this.value.split(`; ${name}=`);
      if (this.parts.length === 2) return this.parts.pop().split(';').shift();
    },
    async chooseColor(color) {
      this.url = "/game_mult/color/" + this.getCookie("game") + "/" + color;
      this.color = color;
      //await this.gameChanges(this.url)
      console.log(color)
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
  }
}
</script>

<style lang="less">
@import "../../public/style/main.less";
*,
::before,
::after {
  margin: 0;
  padding:0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0,0,0,0.8);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}
.cnter{
  margin-left: auto;
  margin-right: auto;
}
.vue-modal-content {
  color: white;
  top: 20%;
  left: 43%;
  position: fixed;
  background-color: #fff;
  border: 2px solid rgba(0,0,0,0);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
  background-color: rgba(7,7,7,0);
}
</style>