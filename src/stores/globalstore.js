import { defineStore } from 'pinia'
import genemedeAPI from '@/services/gnmd-api.js';
import mtypes from '@/services/mtypes.js';
import { notify } from "@kyvg/vue3-notification";

export const useGlobalStore = defineStore('globalstore', {
    state: () => ({
        user: {
            loggedIn: true,
            displayName: "",
            workspace: "default",
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
        mtypes: [],
        count: 0
    }),
    getters: {
        doubleCount: (state) => state.count * 2
    },
    actions: {
        async connectToGat() {
            return new Promise((resolve, reject) => {
                genemedeAPI.apiGet("config")
                .then((res) => {
                    this.setConfig(res.data.data);
                    genemedeAPI.apiGet("mtypes")
                    .then((res) => {
                        mtypes.setData(res.data.data)
                        this.setMTypes(res.data.data);
                        notify({
                            type: "success",
                            group: "std",
                            title: "Connected",
                            text: "Connected to local GAT server."
                        });
                        resolve(true);
                    })
                    .catch(err => {
                        notify({
                            type: "error",
                            group: "std",
                            title: "Error",
                            text: "Local GAT server is not responding.",
                        });
                        resolve(false);
                    });
                })
                .catch(err => {
                    this.setConfig(null);
                    notify({
                        type: "error",
                        group: "std",
                        title: "Error",
                        text: "Local GAT server is not responding.",
                    });
                    resolve(false);
                });
            });
        },
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
        setMTypes(data) {
            // sets handy list of available mtypes
            this.mtypes = data;
        },
        setConfig(data) {
            if (data) {
                this.user.displayName = data.user.screen_name;
                this.user.workspace = data.user.workspace;
                this.server.version = data.version_string;
                this.server.status = 2;
            }
            else {
                this.user.displayName = "";
                this.user.workspace = "";
                this.server.version = "";
                this.server.status = 1;
            }
        }
    }
})