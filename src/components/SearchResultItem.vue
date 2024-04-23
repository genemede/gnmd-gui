<template>
    <div class="sri">
        <span class="mtype">{{item.mtype}}</span>
        <br />
        <span class="name">{{item.title}}</span>
    </div>
</template>

<script>
export default {
    name: 'SearchResultItem',
    props: {
        item: Object
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
        console.log('SRI Mounted');
    }
}
</script>
