<template>
    <div class="sidebar">
        <template v-if="context == 'data'">
            <h2>Types</h2>
            <div class="wrapper">
                <template v-for="(itm, idx) in getMTList">
                    <div class="sbitem" :action="itm" @click.stop="btnClick">{{ itm }}</div>
                </template>
            </div>
        </template>
        <div class="wrapper wireframe">
            <p>context specific sidebar functions</p>
        </div>
    </div>
</template>

<script>
import router from '/src/router/router.js'

export default {
    name: 'AppSidebar',
    props: {},
    data() {
        return {};
    },
    methods: {
        btnClick(evt) {
            var act = evt.target.attributes.action.value;
            if (act) {
                //debug_log(act)
                router.push('/data/manage/' + act)
            }
        }
    },
    created() {},
    destroyed() {},
    mounted() {
    },
    computed: {
        context() {
            var r = this.$route.path;
            //console.log('type', typeof r, r)
            var res = '';
            if (r) {
                if (r.startsWith('/data')) { res = 'data'}
            }
            return res;
        },
        getMTList() {
            console.log('route', this.$route.path)
            var res = []

            if (this.$mtypes.data != null) {
                for (var i in this.$mtypes.data) {
                    //console.log('---', this.$mtypes.data[i])
                    res.push(this.$mtypes.data[i].mtype)
                }
                //res.push(this.$mtypes.data[i].mtype)
            }

            return res;
        },
    }
};
</script>
