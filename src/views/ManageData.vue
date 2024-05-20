<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Data Management</h2>
            <h4>Creates, edits and deletes data.</h4>

            <HelpBox class='spacer-top' icon>
                <template v-slot:title>No data is stored here</template>
                <p>
                    This web application is only a frontend for the GAT api. All data is stored on your local GAT instance.
                    <br>
                    <a href="https://genemede.github.io/about/" target="_blank">Read more here</a>
                </p>
            </HelpBox>
        </div>

        {{ mtinfo }}

        <div class="wrapper">
            <div class="module">
                <div class="header">
                    <span class="title">Available metadata types</span>
                </div>
                <div class="data-container std-grid">
                    <template v-for="(itm, idx) in systemMtypes">
                        <div class="module" :class="`cls-mt-` + itm.mtype">
                            <div class="header spacer-bottom-half">
                                <div class="title">
                                    <i :class='itm.fa_icon'></i>
                                    <strong style="margin-left: 8px">{{ itm.mtype }}</strong>
                                </div>
                            </div>
                            <div class="data-container">
                                <div>{{ itm.description }}</div>
                                <div class="small"><strong>0</strong> <span>files</span></div>
                            </div>
                            <div class="footer">
                                <GButton class="small" :action="`setmt:${itm.mtype}`" @click.prevent="btnClick">Select</GButton>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="wrapper">

        </div>
        <!-- <RouterView v-slot="{ Component }"></RouterView> -->
        <hr>
    </div>
</template>

<script>
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
                if (act[0] == 'setmt') {
                    console.log('action', act)
                }
            }
        },
        describeFileCount(mt) {
            var s = "file"
            if (mt in this.mtinfo) {
                if (mt.count > 1) s += "s"
                return [mt.count, s];
            }
            else {
                return ["0", "files"];
            }
        },
    },
    async mounted() {
        //
    },
    computed: {

        systemMtypes() {
            const res = []
            for (var m in this.$store.mtypes) {
                //if (this.$store.mtypes[m].namespace == "")
                res.push(this.$store.mtypes[m])
            }
            return res;
        }
    }
}
</script>
