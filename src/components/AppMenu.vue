<template>
    <div class="global-menu-container" :class="{ visible: this.$store.ui.menuOpen }" @click.self="menuClick(1)">
        <div class="menu">
            <!-- <div class="separator"></div> -->
            <div class="item" @click.prevent="menuClick(1)">
                <router-link :to="{ name: 'home' }">
                    <div>
                        <span>Home</span>
                        <span></span>
                    </div>
                </router-link>
            </div>

            <div class="separator"></div>

            <div class="item" @click.prevent="menuClick(2)">
                <div>
                    <span>Theme</span>
                    <span>{{themeName}}</span>
                </div>
            </div>

            <div class="separator"></div>


            <div class="item" @click.prevent="menuClick(1)">
                <router-link :to="{ name: 'about' }">
                    <div>
                        <span>About</span>
                        <span></span>
                    </div>
                </router-link>
            </div>

            <div class="separator"></div>

            <div>
                <span>V. <strong>{{ version }}</strong></span>
            </div>
            <div>
                <span v-if="$store.server.version != ''">GAT <strong>V. {{ $store.server.version }}</strong></span>
            </div>
            <div><span class="small">{{appenv}}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppMenu',
    props: {},
    data() {
        return {
            version: ''
        };
    },
    methods: {
        menuClick(arg) {
            console.log('menu click', arg);
            switch (arg) {
                case 0:
                    this.$store.setMenu();
                    break;
                case 1:
                    this.$store.setMenu(false);
                    break;
                case 2:
                    this.$store.setMenu(false);
                    if (this.$store.ui.theme.name == "") {
                        this.$store.setTheme("theme-gnmd");
                    }
                    else {
                        this.$store.setTheme("");
                    }
                    break;
                default:
                this.$store.setMenu(false);

            }
        }
    },
    created() {},
    destroyed() {},
    mounted() {
        this.version = import.meta.env.VITE_APP_VERSION;
    },
    computed: {
        themeName() {
            if (this.$store.ui.theme.name == "") return "default dev";
            return "GNMD";
        },
        appenv() {
            return import.meta.env.VITE_APP_ENV;
        },
        userLoggedIn() {
            return this.$store.user.loggedIn;
        }
    }
};
</script>
