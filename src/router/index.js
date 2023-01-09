import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import PrestartState from "../views/PrestartState.vue"
import Game from "../views/Game.vue"
import PrestartMultiplayer from "../views/PrestartMultiplayer.vue"
import MultiplayerJoin from "../views/MultiplayerJoin.vue"
import GameMultiplayer from "../views/GameMultiplayer.vue"


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
            path: "/setup",
            name: "setup",
            component: PrestartState,
        },
        {
            path: "/start",
            name: "game",
            component: Game,
        },
        {
            path: "/mpsetup",
            name: "prestart_state_mult",
            component: PrestartMultiplayer,
        },
        {
            path: "/mpprejoin",
            name: "prejoin",
            component: MultiplayerJoin,
        },
        {
            path: "/mpstart",
            name: "multiplayer",
            component: GameMultiplayer,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/",
        },
    ],
})

export default router