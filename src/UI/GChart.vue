<template>
    <div class='gchart'>
        <canvas ref="chartref" width="400" height="400"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    props: {
    },
    data () {
        return {
            canvas: null,
        }
    },
    name: 'GChart',
    mounted() {
        this.canvas = this.$refs.chartref;
    },
    methods: {
    },
    computed: {
    }
}
</script>
