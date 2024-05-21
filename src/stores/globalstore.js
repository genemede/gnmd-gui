import { defineStore } from 'pinia'
import genemedeAPI from '@/services/gnmd-api.js';
import mtypes from '@/services/mtypes.js';
import { notify } from "@kyvg/vue3-notification";
import helpers from '@/services/helpers';

const defaultAvatar = window.location.origin + import.meta.env.BASE_URL + 'images/user.svg';

export const useGlobalStore = defineStore('globalstore', {
    state: () => ({
        user: {
            loggedIn: true,
            displayName: "",
            email: "",
            workspace: "default",
            avatarURL: defaultAvatar,
            gravatarHash: null,
            isAdmin: false
        },
        server: {
            status: 0, // 0 - unknown; 1 - connecting; 2 - offline; 3 - online
            version: ""
        },
        ui: {
            menuOpen: false,
            dialogShowing: false,
            isDlgWorking: false
        },
        // if app is compiled in development
        devMode: import.meta.env.VITE_APP_ENV == "development",
        // if dev info is enabled on gat
        devInfo: false,
        feedbackForm: null,
        mtypes: [],
        mtypesEx: {},
        count: 0
    }),
    getters: {
        doubleCount: (state) => state.count * 2
    },
    actions: {
        async connectToGat() {
            return new Promise((resolve, reject) => {
                this.server.status = 1;
                genemedeAPI.apiGet("config")
                .then((res) => {
                    this.setConfig(res.data.data);
                    genemedeAPI.apiGet("mtypes")
                    .then((res) => {
                        mtypes.setData(res.data.data)
                        this.setMTypes(res.data.data);
                        this.server.status = 3;
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
                        this.server.status = 2;
                        resolve(false);
                    });
                })
                .catch(err => {
                    this.setConfig(null);
                    this.server.status = 2;
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

            //=====
            this.mtypesEx = {}
            for (var key in this.mtypes) {
                this.mtypesEx[this.mtypes[key].mtype] = this.mtypes[key];
                this.mtypesEx[this.mtypes[key].mtype].count = 0;
            }
            //console.log('mtex', this.mtypesEx)
        },
        async getMTypeStats() {
            // gets current mtype stats and updates mtypes list
            return new Promise((resolve, reject) => {
                genemedeAPI.apiGet("stats")
                .then((res) => {
                    var data = res.data.data;
                    for (var mt in this.mtypesEx) {
                        if (mt in data.mtypes) {
                            this.mtypesEx[mt].count = data.mtypes[mt]
                        }
                        else {
                            this.mtypesEx[mt].count = 0
                        }

                    }
                    resolve(true);
                })
                .catch((error) => {
                    this.$notify({type: "error", group: "std", title: "Error", text: "Error obtaining mtype stats" });
                    resolve(false);
                });
            });
        },
        async setConfig(data) {
            if (data) {
                this.user.displayName = data.user.screen_name;
                this.user.email = data.user.email;
                this.user.workspace = data.user.workspace;
                this.server.version = data.version_string;
                this.devInfo = data.dev_info;
                this.user.gravatarHash = null;
                this.user.avatarURL = defaultAvatar;
                this.feedbackForm = data.feedback_form;
                if (this.user.email != "example@example.com" && this.user.email != "") {
                    var hash = await helpers.sha256(this.user.email);
                    this.user.gravatarHash = hash;
                    this.user.avatarURL = "https://www.gravatar.com/avatar/" + this.user.gravatarHash + "?d=robohash";
                }
            }
            else {
                this.user.displayName = "";
                this.user.email = "";
                this.user.avatarURL = defaultAvatar;
                this.user.gravatarHash = null;
                this.user.workspace = "";
                this.server.version = "";
                this.server.status = 2;
                this.devInfo = false;
                this.feedbackForm = null;
            }
        },
        getMtype(mt) {
            if (mt in this.mtypesEx) return this.mtypesEx[mt];
            return null;
        },
        buildFormEx(mtype, obj) {

            function doProp(key, prop) {
                //debug_log("PROP", prop)
                var formprop = {
                    'name': key,
                    'datatype': prop.datatype,
                    'label': prop.label,
                    'help': prop.help,
                    'sources': 'sources' in prop ? prop.sources : null,
                    'repeatable': 'repeatable' in prop ? prop.repeatable : false,
                }

                if ('properties' in prop) {
                    // has sub properties, for link fields
                    formprop.config = { fields: [] }

                    for (var subkey in prop.properties) {
                        var subprop = doProp(subkey, prop.properties[subkey])
                        formprop.config.fields.push(subprop)
                    }
                }
                return formprop
            }

            var mt = this.getMtype(mtype);
            if (mt == null) return null;
            var res = {
                config: {
                    fields: [],
                    values: {}
                }
            }
            var fv
            for (var key in mt.properties) {
                //console.log("bld", key, mt.properties[key])
                fv = obj.properties[key]
                if (fv === undefined) {
                    if (mt.properties[key].datatype == "link") fv = []
                }
                res.config.values[key] = fv
                var formprop = doProp(key, mt.properties[key])
                res.config.fields.push(formprop)
            }

            // treat modules like fields, with datatype = module
            //debug_log("OBJ", obj.properties)
            for (var modkey in mt.modules) {
                //debug_log("MOD", modkey, mt.modules[modkey])
                var formprop = doProp(modkey, mt.modules[modkey])
                formprop.valuekey = "module." + modkey
                fv = obj.properties[formprop.valuekey]

                // enforce array types for values
                if (fv === undefined) {
                    fv = []
                } else
                if (typeof fv == 'object') {
                    if (!Array.isArray(fv)) {
                        fv = [fv]
                    }
                }
                res.config.values[formprop.valuekey] = fv
                res.config.fields.push(formprop)
            }

            return res;
        },
    }
})