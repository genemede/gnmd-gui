<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Data Management</h2>
            <span>Creates, edits and deletes data.</span>
        </div>
        <div class="wrapper wireframe">
            <p>MType specific stats and information</p>
        </div>
        <div class="wrapper">
            <template v-if="mtype">
                <span>MT: {{ mtype }}</span>
                <DataGrid :mtype="mtype" :navdata="navdata" actionLabel="edit" @dataCellClick="ondataCellClick" />
            </template>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import genemedeAPI from '@/services/gnmd-api.js';
import router from '/src/router/router.js';

export default {
    setup() {
        const route = useRoute()
        const mtype = route.params.mtype
        return { mtype}
    },
    components: {

    },
    data() {
        return {
            navdata: []
        }
    },
    methods: {
        ondataCellClick(event, action) {
            router.push('/data/edit/' + action)
        }
    },
    mounted() {
        if (this.mtype) {
            genemedeAPI.apiGet("data/" + this.mtype).then((res) => {
                debug_log('result', res.data)
                this.navdata = res.data.data
            });
        }
    }
}
</script>
