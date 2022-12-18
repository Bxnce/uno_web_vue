<template>
  <footer id="footer-play" class="fixed-bottom">
    <p>Created by: <a class="link" href="https://github.com/haasentimo">Timo Haas</a>
      and <a class="link" href="https://github.com/Bxnce">Bence Stuhlmann</a>
      - <a class="link" href=@routes.HomeController.about()>about</a></p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="less" scoped>
@import "../../public/style/main.less";
</style>