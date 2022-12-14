import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import PrestartState from "../views/PrestartState.vue";
import Game from "../views/Game.vue";
import PrestartMultiplayer from "../views/PrestartMultiplayer.vue";
import MultiplayerJoin from "../views/MultiplayerJoin.vue";
import GameMultiplayer from "../views/GameMultiplayer.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/about",
            name: "about",
            component: About,
        },
        {
            path: "/game/setup",
            name: "prestart_state",
            component: PrestartState, // not implemented yet
        },
        {
            path: "/game/start",
            name: "game",
            component: Game,
        },
        {
            path: "/game/multiplayer/setup",
            name: "prestart_state_mult",
            component: PrestartMultiplayer,
        },
        {
            path: "/game/multiplayer/prejoin",
            name: "prejoin",
            component: MultiplayerJoin,
        },
        //{
        //    game: "/game/multiplayer/start",
        //    name: "multiplayer",
        //    component: GameMultiplayer,
        //},
        {
            path: "/:pathMatch(.*)*",
            redirect: "/",
        },
    ],
});

export default router;