<template>
  <div class="container-fluid full-layout" id="container_all">
    <NavBar/>
    <main class="about top-margin">
      <div class="div">
        <p>
          Uno is a highly popular card game played by millions around the globe. The game is for 2-10 players, ages 7
          and
          over.
        </p>
        <p>
        <h1>Setup</h1>
        Every player starts with seven cards, and they are dealt face down. The rest of the cards are placed in a Draw
        Pile face down. Next to the pile a space should be designated for a Discard Pile. The top card should be placed
        in
        the Discard Pile, and the game
        </p>
        <button type="button" class="glow-on-hover" @click='route()'>
          Start a Game!
        </button>
      </div>
      <div class="div">
        <h1>Game Rules</h1>
        <table>
          <tr>
            <td>
              1. The first player to play a card of the same color or number as the top card of the Discard Pile starts
              the game.
            </td>
          </tr>
          <tr>
            <td>
              2. The next player must play a card of the same color or number as the top card of the Discard Pile.
            </td>
          </tr>
          <tr>
            <td>
              3. If a player does not have a card that matches the color or number of the top card of the Discard Pile,
              they must draw a card from the Draw Pile. If the card drawn matches the color or number of the top card of
              the Discard Pile, the player may play it.
            </td>
          </tr>
          <tr>
            <td>
              4. If a player plays a Wild card, they may declare any color and play continues as normal.
            </td>
          </tr>
          <tr>
            <td>
              5. If a player plays a Wild Draw Four card, the next player must draw 4 cards and their turn is skipped.
              The
              player who played the Wild Draw Four card may then declare any color and play continues as normal.
            </td>
          </tr>
          <tr>
            <td>
              6. If a player plays a Draw Two card, the next player must draw 2 cards and their turn is skipped. Play
              then
              continues as normal.
            </td>
          </tr>
          <tr>
            <td>
              7. If a player plays a Skip card, the next player's turn is skipped. Play then continues as normal.
            </td>
          </tr>
          <tr>
            <td>
              8. If a player plays a Reverse card, the direction of play is reversed. Play then continues as normal.
            </td>
          </tr>
          <tr>
            <td>
              9. The game ends when one player has one card left. The player must shout "UNO!" If they forget and
              another
              player catches them, they must draw two cards. The player with one card left must match the color or
              number
              of the top card of the Discard Pile
            </td>
          </tr>
        </table>
      </div>
      <div class="div">
        <h3>UNO-Web is based on the project <a class="link" href="https://github.com/Bxnce/uno">"UNO"</a> of the
          Software
          Engineering lecture</h3>
        <p>
          Examples of the GUI of the SE game, and how it is used.
        </p>
        <details>
          <summary>Create a game!</summary>
          <p>
            <img
                src="https://camo.githubusercontent.com/d81d592955eac7e66be5e119c412a892133ab51bd5003e401f796b9842d754da/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f42756f6d564e53646f4e537a4f34493030652f67697068792e676966"
                alt>
          </p>
          <p>
            To create a game, you need to enter the names of two players and press the "create game" button.
          </p>
        </details>
        <details>
          <summary>Play the game!</summary>
          <p>
            <img
                src="https://camo.githubusercontent.com/6f9e307dc88ae9f1162ba2797d78286fabf73bc7deba3ef266964bc07f21713f/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f57484169456832474f534c3335535a41456f2f67697068792e676966"
                alt>
          </p>
          <p>
            After creating a game, you can press on the cards to place them or take a card with clicking on the card
            pile.
            If a card can't be placed, there will be a popup message. The first one with no cards left wins.
          </p>
        </details>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "About",
  components: {
    NavBar,
    Footer
  },
  methods: {
    route() {
      this.$router.push("/setup");
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../public/style/about.less";
</style>