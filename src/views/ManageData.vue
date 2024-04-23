<template>
    <div class="middle">
        <div class="wrapper">
            <h2>Data Management</h2>
            <span>Creates, edits and deletes data.</span>
        </div>
        <div class="wrapper wireframe">
            <p>MType specific stats and information</p>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
var mt

export default {
    setup() {
        const route = useRoute()
        //slug = route.params.slug
        mt = route.params.mtype
        debug_log('x', mt)
    },
    props: {
        mode: String //{ type: String, default: 0}
    },
    components: {

    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
