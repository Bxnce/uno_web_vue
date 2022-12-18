<template>
  <nav class="navbar navbar-expand-lg navbar-dark set-colors">
    <div class="container-fluid">
      <RouterLink class="navbar-brand router-link" to="/">UNO</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link router-link" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link router-link" to="/game/setup">StartGame</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link router-link" to="/about">About</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods : {
    route(ref){
      window.location.href = ref;
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../public/style/main.less";
</style>