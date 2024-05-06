import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalstore', {
    state: () => ({
        user: {
            loggedIn: true,
            displayName: "",
            avatarURL: import.meta.env.BASE_URL + 'images/user.svg',
            isAdmin: false
        },
        server: {
            status: 0, // 0 - unknown; 1 - offline; 2 - online
            version: ""
        },
        ui: {
            menuOpen: false,
            dialogShowing: false,
            isDlgWorking: false
        },
        devMode: import.meta.env.VITE_APP_ENV == "development",
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
                this.server.status = 2;
            }
            else {
                this.user.displayName = "";
                this.server.version = "";
                this.server.status = 1;
            }
        }
    }
})