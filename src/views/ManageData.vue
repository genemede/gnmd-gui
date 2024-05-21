<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Data Management</h2>
            <h4>Creates, edits and deletes data.</h4>

            <HelpBox class='spacer-top alt' icon>
                <template v-slot:title>No data is stored here</template>
                <p>
                    This web application is only a frontend for the GAT api. All data is stored on your local GAT instance.
                    <br>
                    <a href="https://genemede.github.io/about/" target="_blank">Read more here</a>
                    <hr>
                    You can export all your data in a Genemede json file <GButton class="small" action="export" @click.prevent="btnClick">Here</GButton>
                </p>
            </HelpBox>
        </div>

        <!-- {{ mtinfo }} -->

        <div class="wrapper">
            <div class="module">
                <div class="header">
                    <span class="title">Available metadata types</span>
                </div>
                <div class="data-container std-grid">
                    <template v-for="(itm, idx) in this.$store.mtypesEx">
                        <div class="module" :class="`cls-mt-` + itm.mtype">
                            <div class="header spacer-bottom-half">
                                <div class="title">
                                    <i :class='itm.fa_icon'></i>
                                    <strong style="margin-left: 8px">{{ itm.mtype }}</strong>
                                </div>
                            </div>
                            <div class="data-container">
                                <div>{{ itm.description }}</div>
                                <div class="small"><strong>{{ itm.count }}</strong> <span>{{ describeFileCount(itm.count) }}</span></div>
                            </div>
                            <div class="footer">
                                <GButton class="small" :action="`select:${itm.mtype}`" @click.prevent="btnClick">Select</GButton>
                                <GButton class="small" :action="`create:${itm.mtype}`" @click.prevent="btnClick">Create</GButton>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <!-- <GButton class="" action="export" @click.prevent="btnClick">Export Data</GButton> -->
        </div>
        <!-- <RouterView v-slot="{ Component }"></RouterView> -->
    </div>
</template>

<script>
import router from '/src/router/router.js'

export default {
    setup() {
    },
    components: {
    },
    data() {
        return {
            mtinfo: {}
        }
    },
    methods: {
        btnClick(evt, btn) {
            if (btn) {
                var act = btn.action.split(':');
                switch (act[0]) {
                case "select":
                    router.push('/data/manage/' + act[1])
                    break;
                case "create":
                    router.push('/data/create/' + act[1])
                    break;
                case "export":
                    var url = this.$api.apiURL() + 'export';
                    window.open(url, 'Download');
                }
            }
        },
        describeFileCount(n) {
            var s = "file";
            if (n != 1) s += "s";
            return s;
        },
    },
    async mounted() {
        this.$store.getMTypeStats();
    },
    computed: {
    }
}
</script>
