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
            sbMtypes: [],
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
        prepSidebar() {
            for (var i in mtypes.data) {
                this.sbMtypes.push(mtypes.data[i].mtype)
            }
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
    mounted() {
        genemedeAPI.apiGet("config").then((res) => {
            //debug_log('v', res.data.data)
            this.$store.setConfig(res.data.data);
            genemedeAPI.apiGet("mtypes").then((res) => {
                mtypes.setData(res.data.data)
                debug_log('v', res.data.data)

                this.$store.setMTypes(res.data.data);
                this.prepSidebar();
                this.$notify({
                    type: "success",
                    group: "std",
                    title: "Connected",
                    text: "Connected to local GAT server."
                });


            });
        })
        .catch(err => {
            this.$store.setConfig(null);
            this.$notify({
                type: "error",
                group: "std",
                title: "Error",
                text: "Local GAT server is not responding.",
            });
        });


        this.$dlg.setApp(this);
        // prepare mtypes colors

        var mt = [
            {   mtype: "lab",
                colors: ['#ffc6ff']
            },
            {   mtype: "project",
                colors: ['#bdb2ff']
            },
            {   mtype: "researcher",
                colors: ['#a0c4ff']
            },
            {   mtype: "subject",
                colors: ['#9bf6ff']
            },
            {   mtype: "protocol",
                colors: ['#caffbf']
            },
            {   mtype: "session",
                colors: ['#fdffb6']
            }
        ];
        /*
        #caffbf
        #fdffb6
        #ffd6a5
        #ffadad
        */

        var h = '';
        var style = document.createElement('style');
        mt.forEach(m => {
            var c1 = m.colors[0];
            var c2 = this.$helpers.shadeColor(c1, -10);
            var c3 = this.$helpers.shadeColor(c1, -15);
            m.colors[0];
            h = h + `.cls-mt-${m.mtype} {
                background-color: ${c1};
                border: 1px solid ${c2};
                .tdtitle {
                    background-color: ${c2};
                    border-bottom: 1px solid ${c3};
                }
            }`
        });
        style.innerHTML = h;
        document.head.appendChild(style);

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