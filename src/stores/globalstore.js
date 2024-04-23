import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalstore', {
    state: () => ({
        user: {
            loggedIn: true,
            displayName: "",
            avatarURL: '/images/user.svg',
            isAdmin: false
        },
        server: {
            online: 0,
            version: ""
        },
        ui: {
            menuOpen: false,
            dialogShowing: false,
            isDlgWorking: false
        },
        count: 0
    }),
    getters: {
        doubleCount: (state) => state.count * 2
    },
    actions: {
        setMenu(v) {
            if (typeof v === 'undefined') {
                this.ui.menuOpen = !this.ui.menuOpen;
            } else {
                this.ui.menuOpen = v;
            }
        },
        increment() {
            this.count++
        },
        setConfig(data) {
            if (data) {
                this.user.displayName = data.user.screen_name;
                this.server.version = data.version_string;
                this.server.online = 1;
            }
            else {
                this.user.displayName = "";
                this.server.version = "";
                this.server.online = 0;
            }
        }
    }
})