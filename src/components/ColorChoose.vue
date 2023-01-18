<template>
    <div class="px-6 pb-6 text-center zax">
        <h3 class="text-xl mb-2 font-semibold">Choose The Color</h3>

    </div>
</template>

<script>
import {post_it} from "../main";

export default {
  name: "ColorChoose",
  methods: {
    hide() {
      console.log('click registered');
      this.$emit('close')
    },
    getCookie(name) {
      this.value = `; ${document.cookie}`;
      this.parts = this.value.split(`; ${name}=`);
      if (this.parts.length === 2) return this.parts.pop().split(';').shift();
    },
    async chooseColor(color) {
      this.url = "/game_mult/color/" + this.getCookie("game") + "/" + color;
      //await this.gameChanges(this.url)
      console.log(color)
      this.hide()
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

<style lang="less" scoped>
@import "../../public/style/playState.less";
.bounce-enter-active {
  animation: bounce-in .5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse ease-in both;
}
.cnter{
  margin-left: auto;
  margin-right: auto;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
}
</style>