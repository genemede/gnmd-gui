<template>
    <div class="navigation-bar">
        <div class="elements">
            <div class="logos" v-if="false">
                <RouterLink to="/">
                    <img class="gnmd" src="/images/gnmd_white_tp.png" @click="logoClick()">
                </RouterLink>
            </div>
            <div class="navigation">
                <RouterLink class="navlink" :to="{name: 'home'}">
                    <!-- <img class="gnmd" src="/images/gnmd_white_tp.png" @click="logoClick()"> -->
                    <span>Home</span>
                </RouterLink>
                <!-- <RouterLink class="navlink" :to="{name: 'data'}">Data</RouterLink> -->
                <RouterLink class="navlink" to="/data">Data</RouterLink>
                <!-- <RouterLink class="navlink" :to="{ name: 'mtypes' }">MTypes</RouterLink> -->
                <RouterLink class="navlink" :to="{name: 'search'}">Search</RouterLink>
                <RouterLink class="navlink" :to="{name: 'explore'}">Explore</RouterLink>
                <RouterLink class="navlink devlink" :to="{name: 'devpage'}">Dev</RouterLink>
            </div>

            <div class="user">
                <div class="user-info" v-if="this.$store.user.loggedIn">
                    <div class="username">
                        <div class="name">{{this.$store.user.displayName}}</div>
                    </div>
                    <div class="user-avatar">
                        <div class="avatar-frame">
                            <img class="avatar-img" :src="this.$store.user.avatarURL">
                        </div>
                        <span class="admin-logo" v-if="this.$store.user.isAdmin"><i class="fas fa-crown"></i></span>
                        <span class="server-icon online" v-if='this.$store.server.online === 1'>
                            <i class="fas fa-check"></i>
                        </span>
                        <span class="server-icon" v-if='this.$store.server.online === 0'>
                            <i class="fas fa-ban"></i>
                        </span>
                        <span class="notifications" :class="{visible: dbgNot}">3</span>
                    </div>
                </div>
            </div>

            <div class="system"  @click="menuOpen">
                <i class="fas fa-bars"></i>
            </div>
        </div>
        <div class="sys-indicator" v-if="showSysIndicator"></div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'NavigationBar',
    data() {
        return {
            thSwitchHI: false,
            thSwitchEls: false,
            headerImg: '',
            dbgNot: false
        };
    },
    methods: {
        logoClick() {
            /*
            this.$notify({duration: -1, type: 'success', group: 'std', title: 'Important message', text: 'Hello user! This is a notification!'});
            this.$notify({duration: -1, type: 'warn', group: 'std', title: 'Important message', text: 'Hello user! This is a notification!'});
            this.$notify({duration: -1, type: 'error', group: 'std', title: 'Important message', text: 'Hello user! This is a notification!'});
            */
        },
        menuOpen() {
            console.log('menu')

            this.$store.setMenu();
        },
        toggleTheme() {
            //this.$store.state.appref.toggleTheme();
        },
        clickAvatar() {
        },
        switchHeaderImg() {
        }
    },
    computed: {
        showSysIndicator() {
            var b = false;
            return b;
        },
        logoRoute() {
            return 0;
            //return (this.$store.state.debugMode ? '/devpage' : '/');
        },
    },
    created() {
        //this.headerImg = this.$store.state.ui.theme.headerImg;
    },
    destroyed() {
    },
    mounted() {
        //this.init();
    },
    props: {},
    components: { RouterLink }
}
</script>
