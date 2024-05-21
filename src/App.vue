<template>
    <NavigationBar v-if="true"></NavigationBar>
    <transition name="dlg-zoom" mode="in-out">
        <div
            class="global-dialog-container visible"
            @click.stop="intClickDlgContainer"
            :class="getDialogContainerClasses"
            v-if='dlgName != null'
            id="globdlgcontainer"
            role="dialog"
            ref="globdlgcontainer"
            aria-modal="true"
        >
            <!-- standard dialogs -->
            <div v-if="!getIsSimpleDialog"
                class="dlg-window bg-2"
                :class="[{ working: $store.ui.isDlgWorking }]"
                ref="dlgwindow"
            >
                <div class="dlg-bg" />
                <div class="dlg-inner">
                    <div class="dlg-title">
                        <span class="text">{{ getDialogTitle }}</span>
                        <span class="close" @click="intCancelDlg(false)">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <component :is='dlgName' :dlgdata='dlgData' :dlgoptions='dlgOptions' />
                </div>
            </div>
            <div v-else>
                <component :is='dlgName' :dlgdata='dlgData' :dlgoptions='dlgOptions' />
            </div>
        </div>
    </transition>

    <div class="top-container">
        <div class="sidebar-container">
            <AppSidebar />
        </div>
        <div class="main-container" ref="maincontainer" id="mc">
            <div class="corner"><div></div></div>
            <RouterView v-slot="{ Component }">
                <keep-alive include="ManageMTypes,SearchPage,ExplorePage,HomeView">
                    <component :is="Component" :key="$route.path"/>
                </keep-alive>
            </RouterView>
        </div>

    </div>
    <notifications classes="stdnotifications" group="std" />
    <AppMenu />
</template>

<style lang="scss"> // the main file that imports everything related with styles
@import "@/assets/sass/main.scss";
</style>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import AppMenu from '@/components/AppMenu.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import genemedeAPI from '@/services/gnmd-api.js';
import mtypes from '@/services/mtypes.js';

var dlgPromiseResolve;
var globalTickIntervalHandler;

function hsl2rgb(h,s,l)
{
  let a= s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}

let rgb2hex = (r,g,b) => "#" + [r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0) ).join('');

export default {
    name: "App",
    components: {
        NavigationBar,
        AppMenu,
        AppSidebar,
        RouterView
    },
    data() {
        return {
            dlgName: null,
            dlgOptions: null,
            dlgData: null,
        }
    },
    methods:{
        onKeyDown(event) {
            //debug_log("EVENT", event.key, event.keyCode);
            if (event.keyCode === 27) {
                if (this.$store.ui.dialogShowing) {
                    this.intCancelDlg()
                }
                if (this.$store.ui.menuOpen) {
                    this.$store.ui.menuOpen = false
                }
            }
        },
        test() {
            //debug_log('--- app test ---')
        },
        intDlgShow(dlgName, dlgData, dlgOptions = null) {
            // creates and stores a promise and shows dialog
            this.$store.ui.dialogShowing = true;

            debug_log('DIALOG', dlgName, dlgData, dlgOptions);
            //this.dlgClasses = dlgclass;
            this.dlgData = dlgData;
            this.dlgOptions = dlgOptions;

            return new Promise((resolve, reject) => {
                dlgPromiseResolve = resolve;
                this.dlgName = dlgName;

                this.$nextTick(() => {
                    //console.log('dlg h', this.$refs['dlgwindow'].offsetHeight);
                    this.focusableList = this.$refs.globdlgcontainer.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (this.focusableList.length > 0)
                        this.focusableList[0].focus();
                    //debug_log('focusable', this.focusableList);
                });
            });
        },
        intClickDlgContainer(evt) {
            // cancels dialog when clicking outside
            if (evt.target.id == "globdlgcontainer") {
                this.intCancelDlg();
            }
        },
        intClickHlpContainer(evt) {
            if (evt.target.id == "globhlpcontainer") {
                this.$store.dispatch("acUIAction", "pop");
            }
        },
        intCancelDlg(value = false) {
            // hides dialog and resolves promise with value
            this.$store.ui.dialogShowing = false;
            this.dlgName = null;
            this.focusableList = [];
            if (dlgPromiseResolve != null) dlgPromiseResolve(value);
            dlgPromiseResolve = null;
        },
        intOkDlg(value = true) {
            // hides dialog and resolves promise with value
            debug_log('int dlg ok')
            this.$store.ui.dialogShowing = false;
            this.dlgName = null;
            this.focusableList = [];
            if (dlgPromiseResolve != null) {
                //debug_log('resolving dialog promise')
                dlgPromiseResolve(value);
            }
            dlgPromiseResolve = null;
        },
        dlgCancelEvent() {
            this.intCancelDlg();
        },
        setupMTypeColors() {
            var s, c, c1, c2 ,c3;
            var hue = 80;
            var h = '';
            var style = document.createElement('style');
            for (var m in this.$store.mtypesEx) {
                s = `hsl(${hue},${0.78},${0.85})`;
                c = w3color(s);
                hue += 40;
                if (hue> 360) { hue -= 360}

                var c1 = c.toHexString();
                var c2 = this.$helpers.shadeColor(c1, -10);
                var c3 = this.$helpers.shadeColor(c1, -15);
                var cdark = this.$helpers.shadeColor(c1, -55);

                h = h +

                `.cls-mt-${m} { background-color: ${c1}; border: 1px solid ${c2}; }
                .cls-color-mt-${m} { color: ${cdark}}
                .module.cls-mt-${m} .header {
                    background-color: ${c2};
                    border-bottom: 1px solid ${c3};
                }`
            }
            style.innerHTML = h;
            document.head.appendChild(style);
        }
    },
    computed: {
        getDialogTitle() {
            if (this.dlgOptions != null) return this.dlgOptions.title;
            return '';
        },
        getDialogContainerClasses() {
            if (this.dlgOptions != null) return this.dlgOptions.containerClasses;
            return '';
        },
        getIsSimpleDialog() {
            if (this.dlgOptions != null) return this.dlgOptions.simple;
            return false;
        }
    },
    created() {
        window.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    },
    async mounted() {
        await this.$store.connectToGat()
        this.$dlg.setApp(this);

        // prepare mtypes colors
        this.setupMTypeColors();
        /*
        var mt = [
            {   mtype: "lab",
                colors: ['#90F1EE']
            },
            {   mtype: "project",
                colors: ['#90F1BA']
            },
            {   mtype: "researcher",
                colors: ['#ACF190']
            },
            {   mtype: "subject",
                colors: ['#DCF190']
            },
            {   mtype: "protocol",
                colors: ['#caffbf']
            },
            {   mtype: "session",
                colors: ['#fdffb6']
            }
        ];

        var h = '';
        var style = document.createElement('style');
        mt.forEach(m => {
            var c1 = m.colors[0];
            var c2 = this.$helpers.shadeColor(c1, -10);
            var c3 = this.$helpers.shadeColor(c1, -15);
            m.colors[0];
            h = h + `.cls-mt-${m.mtype} { background-color: ${c1}; border: 1px solid ${c2}; }
            .module.cls-mt-${m.mtype} .header {
                    background-color: ${c2};
                    border-bottom: 1px solid ${c3};
                }`
        });
        style.innerHTML = h;
        document.head.appendChild(style);
        */

        /*

        ***** need to redo event system for vue3

        // global dialog cancel handler
        this.$on("dlgcancel", () => {
            //console.log('dialog cancel event');
            this.intCancelDlg();
        });

        this.$on("dlgok", (data) => {
            //console.log('dialog ok event', data);
            this.intOkDlg(data);
        });

        this.$on("dlgerror", (data) => {
            // catches dialog errors of various types
            var errMsg = this.$helpers.parseChainErrorMessages(data);
            console.log("dialog error event", JSON.stringify(data));
            this.$notify({
                type: "error",
                group: "std",
                duration: 6000,
                title: errMsg.title,
                text: errMsg.message,
            });
        });
        */
        debug_log("APP mounted")
    }
}

</script>