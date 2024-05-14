<template>
    <template v-if="item">
        <h3>Module: {{ item.name }}</h3>
        <template v-for="(itm, idx) in values">
            <GForm :config="item.config" :values="values[idx]"/>
        </template>
        <hr>
    </template>
</template>


<script>

export default {
    name: 'GModule',
    setup() {
    },
    props: {
        item: Object,
        values: Object
    },
    methods: {
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
    },
}
</script>
