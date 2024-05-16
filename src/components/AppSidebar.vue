<template>
    <div class="sidebar">
        <template v-if="context == 'data'">
            <h2>Types</h2>
            <div class="wrapper">
                <!-- <RouterLink class="navlink" to="/data/manage">Data</RouterLink> -->
                <template v-for="mt in $store.mtypes">
                    <!-- <div class="sbitem" :action="mt.mtype" @click.stop="btnClick">{{ mt.mtype }}</div> -->
                    <RouterLink class="sblink" :to="'/data/manage/' + mt.mtype">{{ mt.mtype }}</RouterLink>

                </template>
            </div>
            <!-- <div v-if="this.$router.currentRoute.value.name == 'data'">DATA</div> -->
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
            var res = '';
            if (r) {
                if (r.startsWith('/data')) { res = 'data'}
            }
            return res;
        },
        getMTList() {
            //debug_log('route', this.$route.path)
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
